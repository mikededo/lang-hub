export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      languages: {
        Row: {
          code: string
          id: number
          name: string
        }
        Insert: {
          code: string
          id?: number
          name: string
        }
        Update: {
          code?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      phrases: {
        Row: {
          id: number
          key: string
          project: number
        }
        Insert: {
          id?: number
          key: string
          project: number
        }
        Update: {
          id?: number
          key?: string
          project?: number
        }
        Relationships: [
          {
            foreignKeyName: "phrases_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_languages: {
        Row: {
          is_default: boolean | null
          language_id: number
          project_id: number
        }
        Insert: {
          is_default?: boolean | null
          language_id: number
          project_id: number
        }
        Update: {
          is_default?: boolean | null
          language_id?: number
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_languages_language_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_languages_language_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "v_project_languages"
            referencedColumns: ["language_id"]
          },
          {
            foreignKeyName: "project_languages_project_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          id: number
          last_updated: string | null
          name: string
          website_url: string | null
        }
        Insert: {
          id?: number
          last_updated?: string | null
          name: string
          website_url?: string | null
        }
        Update: {
          id?: number
          last_updated?: string | null
          name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      translations: {
        Row: {
          id: number
          language_id: number
          last_updated: string | null
          phrase_key: number
          translated_text: string
        }
        Insert: {
          id?: number
          language_id: number
          last_updated?: string | null
          phrase_key: number
          translated_text: string
        }
        Update: {
          id?: number
          language_id?: number
          last_updated?: string | null
          phrase_key?: number
          translated_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "translations_language_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translations_language_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "v_project_languages"
            referencedColumns: ["language_id"]
          },
          {
            foreignKeyName: "translations_phrase_fkey"
            columns: ["phrase_key"]
            isOneToOne: false
            referencedRelation: "phrases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translations_phrase_fkey"
            columns: ["phrase_key"]
            isOneToOne: false
            referencedRelation: "v_phrase_languages"
            referencedColumns: ["phrase_id"]
          },
          {
            foreignKeyName: "translations_phrase_fkey"
            columns: ["phrase_key"]
            isOneToOne: false
            referencedRelation: "v_phrase_translations"
            referencedColumns: ["phrase_id"]
          },
        ]
      }
      user_projects: {
        Row: {
          project_id: number
          user_id: string
        }
        Insert: {
          project_id: number
          user_id: string
        }
        Update: {
          project_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_phrase_languages: {
        Row: {
          key: string | null
          phrase_id: number | null
          project_id: number | null
          translated_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "phrases_project_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      v_phrase_translations: {
        Row: {
          id: number | null
          language_code: string | null
          language_id: number | null
          language_name: string | null
          last_updated: string | null
          phrase_id: number | null
          phrase_key: number | null
          translated_text: string | null
        }
        Relationships: [
          {
            foreignKeyName: "translations_language_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translations_language_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "v_project_languages"
            referencedColumns: ["language_id"]
          },
          {
            foreignKeyName: "translations_phrase_fkey"
            columns: ["phrase_key"]
            isOneToOne: false
            referencedRelation: "phrases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translations_phrase_fkey"
            columns: ["phrase_key"]
            isOneToOne: false
            referencedRelation: "v_phrase_languages"
            referencedColumns: ["phrase_id"]
          },
          {
            foreignKeyName: "translations_phrase_fkey"
            columns: ["phrase_key"]
            isOneToOne: false
            referencedRelation: "v_phrase_translations"
            referencedColumns: ["phrase_id"]
          },
        ]
      }
      v_project_languages: {
        Row: {
          code: string | null
          is_default: boolean | null
          language_id: number | null
          name: string | null
          project_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_languages_project_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_project: {
        Args: {
          name: string
          website: string
          language_ids: number[]
          default_language_id: number
        }
        Returns: {
          id: number
          last_updated: string | null
          name: string
          website_url: string | null
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
