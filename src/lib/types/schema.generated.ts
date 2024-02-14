export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      locales: {
        Row: {
          code: string;
          name: string;
        };
        Insert: {
          code: string;
          name: string;
        };
        Update: {
          code?: string;
          name?: string;
        };
        Relationships: [];
      };
      project_locales: {
        Row: {
          is_default: boolean | null;
          locale_code: string;
          project_id: number;
        };
        Insert: {
          is_default?: boolean | null;
          locale_code: string;
          project_id: number;
        };
        Update: {
          is_default?: boolean | null;
          locale_code?: string;
          project_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'project_locales_locale_code_fkey';
            columns: ['locale_code'];
            isOneToOne: false;
            referencedRelation: 'locales';
            referencedColumns: ['code'];
          },
          {
            foreignKeyName: 'project_locales_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'project_locales_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'v_project_details';
            referencedColumns: ['id'];
          },
        ];
      };
      projects: {
        Row: {
          id: number;
          last_updated: string | null;
          name: string;
          website_url: string | null;
        };
        Insert: {
          id?: number;
          last_updated?: string | null;
          name: string;
          website_url?: string | null;
        };
        Update: {
          id?: number;
          last_updated?: string | null;
          name?: string;
          website_url?: string | null;
        };
        Relationships: [];
      };
      translations: {
        Row: {
          id: number;
          last_updated: string | null;
          locale_code: string;
          project_id: number;
          translation_key: string;
          value: string;
        };
        Insert: {
          id?: number;
          last_updated?: string | null;
          locale_code: string;
          project_id: number;
          translation_key: string;
          value: string;
        };
        Update: {
          id?: number;
          last_updated?: string | null;
          locale_code?: string;
          project_id?: number;
          translation_key?: string;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'translations_locale_code_fkey';
            columns: ['locale_code'];
            isOneToOne: false;
            referencedRelation: 'locales';
            referencedColumns: ['code'];
          },
          {
            foreignKeyName: 'translations_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'translations_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'v_project_details';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      v_project_details: {
        Row: {
          id: number | null;
          last_updated: string | null;
          locales: Json | null;
          name: string | null;
          website_url: string | null;
        };
        Insert: {
          id?: number | null;
          last_updated?: string | null;
          locales?: never;
          name?: string | null;
          website_url?: string | null;
        };
        Update: {
          id?: number | null;
          last_updated?: string | null;
          locales?: never;
          name?: string | null;
          website_url?: string | null;
        };
        Relationships: [];
      };
      v_translations_translated: {
        Row: {
          project_id: number | null;
          total_translated: number | null;
          translation_key: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'translations_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'translations_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'v_project_details';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
