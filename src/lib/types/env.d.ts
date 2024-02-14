/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly LANG_HUB_SUPABASE_URL: string;
  readonly LANG_HUB_SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
