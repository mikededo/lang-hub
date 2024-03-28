
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."check_translation_insert"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM phrases
    JOIN user_projects ON phrases.project = user_projects.project_id
    WHERE phrases.id = NEW.phrase_key
    AND user_projects.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'User does not have permission to insert this translation';
  END IF;
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."check_translation_insert"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" integer NOT NULL,
    "name" character varying(255) NOT NULL,
    "website_url" character varying(255),
    "last_updated" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."projects" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."create_project"("name" "text", "website" "text", "language_ids" integer[], "default_language_id" integer) RETURNS "public"."projects"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    project projects;
    language INTEGER;
BEGIN
    INSERT INTO projects(name, website_url) VALUES (name, website) RETURNING * INTO project;

    -- Insert into user_projects table
    INSERT INTO user_projects(user_id, project_id) VALUES (auth.uid(), project.id);

    -- Insert into project_languages table
    FOREACH language IN ARRAY language_ids
    LOOP
        INSERT INTO project_languages(project_id, language_id, is_default)
        VALUES (project.id, language, language = default_language_id);
    END LOOP;

    RETURN project;
END;
$$;

ALTER FUNCTION "public"."create_project"("name" "text", "website" "text", "language_ids" integer[], "default_language_id" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_project_language_translations"("p_id" integer, "l_id" integer) RETURNS "json"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  result json;
BEGIN
  SELECT json_object_agg(key, translated_text) INTO result
  FROM (
    SELECT p.key, t.translated_text
    FROM phrases AS p
    JOIN translations t ON t.phrase_key = p.id
    JOIN languages l ON t.language_id = l.id
    WHERE p.project = p_id AND l.id = l_id
  ) sub;
  RETURN result;
END;
$$;

ALTER FUNCTION "public"."get_project_language_translations"("p_id" integer, "l_id" integer) OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."languages" (
    "id" integer NOT NULL,
    "code" character varying(10) NOT NULL,
    "name" character varying(50) NOT NULL
);

ALTER TABLE "public"."languages" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."languages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."languages_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."languages_id_seq" OWNED BY "public"."languages"."id";

CREATE TABLE IF NOT EXISTS "public"."phrases" (
    "id" integer NOT NULL,
    "project" integer NOT NULL,
    "key" character varying(255) NOT NULL
);

ALTER TABLE "public"."phrases" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."phrases_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."phrases_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."phrases_id_seq" OWNED BY "public"."phrases"."id";

CREATE TABLE IF NOT EXISTS "public"."project_languages" (
    "project_id" integer NOT NULL,
    "language_id" integer NOT NULL,
    "is_default" boolean DEFAULT false
);

ALTER TABLE "public"."project_languages" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."projects_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."projects_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."projects_id_seq" OWNED BY "public"."projects"."id";

CREATE TABLE IF NOT EXISTS "public"."translations" (
    "id" integer NOT NULL,
    "language_id" integer NOT NULL,
    "phrase_key" integer NOT NULL,
    "translated_text" "text" NOT NULL,
    "last_updated" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."translations" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."translations_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."translations_id_seq" OWNED BY "public"."translations"."id";

ALTER TABLE "public"."translations" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."translations_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."user_projects" (
    "user_id" "uuid" NOT NULL,
    "project_id" integer NOT NULL
);

ALTER TABLE "public"."user_projects" OWNER TO "postgres";

COMMENT ON TABLE "public"."user_projects" IS 'Projects that are linked to a user';

CREATE OR REPLACE VIEW "public"."v_phrase_languages" AS
SELECT
    NULL::integer AS "phrase_id",
    NULL::integer AS "project_id",
    NULL::character varying(255) AS "key",
    NULL::bigint AS "translated_count";

ALTER TABLE "public"."v_phrase_languages" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."v_phrase_translations" AS
 SELECT "t"."id",
    "t"."translated_text",
    "t"."last_updated",
    "p"."id" AS "phrase_id",
    "p"."key" AS "phrase_key",
    "l"."id" AS "language_id",
    "l"."code" AS "language_code",
    "l"."name" AS "language_name"
   FROM (((("public"."languages" "l"
     JOIN "public"."project_languages" "pl" ON (("l"."id" = "pl"."language_id")))
     JOIN "public"."projects" "pr" ON (("pl"."project_id" = "pr"."id")))
     LEFT JOIN "public"."phrases" "p" ON (("pr"."id" = "p"."project")))
     LEFT JOIN "public"."translations" "t" ON ((("l"."id" = "t"."language_id") AND ("p"."id" = "t"."phrase_key"))));

ALTER TABLE "public"."v_phrase_translations" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."v_project_languages" AS
 SELECT "languages"."id" AS "language_id",
    "languages"."code",
    "languages"."name",
    "pl"."is_default",
    "pl"."project_id"
   FROM ("public"."project_languages" "pl"
     JOIN "public"."languages" ON (("pl"."language_id" = "languages"."id")))
  ORDER BY "pl"."is_default";

ALTER TABLE "public"."v_project_languages" OWNER TO "postgres";

ALTER TABLE ONLY "public"."languages" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."languages_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."phrases" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."phrases_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."projects" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."projects_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."languages"
    ADD CONSTRAINT "languages_code_name_key" UNIQUE ("code", "name");

ALTER TABLE ONLY "public"."languages"
    ADD CONSTRAINT "languages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."phrases"
    ADD CONSTRAINT "phrases_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."phrases"
    ADD CONSTRAINT "phrases_project_key_key" UNIQUE ("project", "key");

ALTER TABLE ONLY "public"."project_languages"
    ADD CONSTRAINT "project_languages_pkey" PRIMARY KEY ("project_id", "language_id");

ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."translations"
    ADD CONSTRAINT "translations_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."translations"
    ADD CONSTRAINT "translations_language_phrase_key" UNIQUE ("language_id", "phrase_key");

ALTER TABLE ONLY "public"."translations"
    ADD CONSTRAINT "translations_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE VIEW "public"."v_phrase_languages" AS
 SELECT "phrases"."id" AS "phrase_id",
    "phrases"."project" AS "project_id",
    "phrases"."key",
    "count"("translations"."id") AS "translated_count"
   FROM ("public"."phrases"
     LEFT JOIN "public"."translations" ON (("phrases"."id" = "translations"."phrase_key")))
  WHERE ("phrases"."project" IN ( SELECT "user_projects"."project_id"
           FROM "public"."user_projects"
          WHERE ("user_projects"."user_id" = "auth"."uid"())))
  GROUP BY "phrases"."id", "phrases"."project";

CREATE OR REPLACE TRIGGER "check_translation_insert_trigger" BEFORE INSERT ON "public"."translations" FOR EACH ROW EXECUTE FUNCTION "public"."check_translation_insert"();

ALTER TABLE ONLY "public"."phrases"
    ADD CONSTRAINT "phrases_project_fkey" FOREIGN KEY ("project") REFERENCES "public"."projects"("id");

ALTER TABLE ONLY "public"."project_languages"
    ADD CONSTRAINT "project_languages_language_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id");

ALTER TABLE ONLY "public"."project_languages"
    ADD CONSTRAINT "project_languages_project_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id");

ALTER TABLE ONLY "public"."user_projects"
    ADD CONSTRAINT "public_user_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_projects"
    ADD CONSTRAINT "public_user_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."translations"
    ADD CONSTRAINT "translations_language_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id");

ALTER TABLE ONLY "public"."translations"
    ADD CONSTRAINT "translations_phrase_fkey" FOREIGN KEY ("phrase_key") REFERENCES "public"."phrases"("id");

CREATE POLICY "Allow read all for authenticated users" ON "public"."user_projects" FOR SELECT USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."projects" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Full access to project_languages user has access to" ON "public"."project_languages" USING (("project_id" IN ( SELECT "user_projects"."project_id"
   FROM "public"."user_projects"
  WHERE ("user_projects"."user_id" = "auth"."uid"()))));

CREATE POLICY "Read access for all authenticated users" ON "public"."languages" FOR SELECT USING (("auth"."uid"() IS NOT NULL));

CREATE POLICY "Users can CUD phrases from a project they own" ON "public"."phrases" USING (("project" IN ( SELECT "user_projects"."project_id"
   FROM "public"."user_projects"
  WHERE ("user_projects"."user_id" = "auth"."uid"()))));

CREATE POLICY "Users can read all their projects" ON "public"."projects" USING (("id" IN ( SELECT "user_projects"."project_id"
   FROM "public"."user_projects"
  WHERE ("user_projects"."user_id" = "auth"."uid"()))));

ALTER TABLE "public"."languages" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."phrases" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."project_languages" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."translations" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "translations_user_delete_policy" ON "public"."translations" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM ("public"."phrases"
     JOIN "public"."user_projects" ON (("phrases"."project" = "user_projects"."project_id")))
  WHERE (("translations"."phrase_key" = "phrases"."id") AND ("user_projects"."user_id" = "auth"."uid"())))));

CREATE POLICY "translations_user_insert_policy" ON "public"."translations" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "translations_user_select_policy" ON "public"."translations" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM ("public"."phrases"
     JOIN "public"."user_projects" ON (("phrases"."project" = "user_projects"."project_id")))
  WHERE (("translations"."phrase_key" = "phrases"."id") AND ("user_projects"."user_id" = "auth"."uid"())))));

CREATE POLICY "translations_user_update_policy" ON "public"."translations" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM ("public"."phrases"
     JOIN "public"."user_projects" ON (("phrases"."project" = "user_projects"."project_id")))
  WHERE (("translations"."phrase_key" = "phrases"."id") AND ("user_projects"."user_id" = "auth"."uid"())))));

ALTER TABLE "public"."user_projects" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."check_translation_insert"() TO "anon";
GRANT ALL ON FUNCTION "public"."check_translation_insert"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_translation_insert"() TO "service_role";

GRANT ALL ON TABLE "public"."projects" TO "anon";
GRANT ALL ON TABLE "public"."projects" TO "authenticated";
GRANT ALL ON TABLE "public"."projects" TO "service_role";

GRANT ALL ON FUNCTION "public"."create_project"("name" "text", "website" "text", "language_ids" integer[], "default_language_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."create_project"("name" "text", "website" "text", "language_ids" integer[], "default_language_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_project"("name" "text", "website" "text", "language_ids" integer[], "default_language_id" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_project_language_translations"("p_id" integer, "l_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_project_language_translations"("p_id" integer, "l_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_project_language_translations"("p_id" integer, "l_id" integer) TO "service_role";

GRANT ALL ON TABLE "public"."languages" TO "anon";
GRANT ALL ON TABLE "public"."languages" TO "authenticated";
GRANT ALL ON TABLE "public"."languages" TO "service_role";

GRANT ALL ON SEQUENCE "public"."languages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."languages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."languages_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."phrases" TO "anon";
GRANT ALL ON TABLE "public"."phrases" TO "authenticated";
GRANT ALL ON TABLE "public"."phrases" TO "service_role";

GRANT ALL ON SEQUENCE "public"."phrases_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."phrases_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."phrases_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."project_languages" TO "anon";
GRANT ALL ON TABLE "public"."project_languages" TO "authenticated";
GRANT ALL ON TABLE "public"."project_languages" TO "service_role";

GRANT ALL ON SEQUENCE "public"."projects_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."projects_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."projects_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."translations" TO "anon";
GRANT ALL ON TABLE "public"."translations" TO "authenticated";
GRANT ALL ON TABLE "public"."translations" TO "service_role";

GRANT ALL ON SEQUENCE "public"."translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."translations_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."translations_id_seq1" TO "anon";
GRANT ALL ON SEQUENCE "public"."translations_id_seq1" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."translations_id_seq1" TO "service_role";

GRANT ALL ON TABLE "public"."user_projects" TO "anon";
GRANT ALL ON TABLE "public"."user_projects" TO "authenticated";
GRANT ALL ON TABLE "public"."user_projects" TO "service_role";

GRANT ALL ON TABLE "public"."v_phrase_languages" TO "anon";
GRANT ALL ON TABLE "public"."v_phrase_languages" TO "authenticated";
GRANT ALL ON TABLE "public"."v_phrase_languages" TO "service_role";

GRANT ALL ON TABLE "public"."v_phrase_translations" TO "anon";
GRANT ALL ON TABLE "public"."v_phrase_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."v_phrase_translations" TO "service_role";

GRANT ALL ON TABLE "public"."v_project_languages" TO "anon";
GRANT ALL ON TABLE "public"."v_project_languages" TO "authenticated";
GRANT ALL ON TABLE "public"."v_project_languages" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
