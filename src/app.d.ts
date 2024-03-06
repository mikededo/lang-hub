import type { createServerClient } from '@supabase/ssr';
import type { Session } from '@supabase/supabase-js';

export type ColorScheme = 'light' | 'dark';

declare global {
  namespace App {
    interface Locals {
      colorScheme: ColorScheme;

      supabase: ReturnType<typeof createServerClient<Database>>;
      getUserSession: () => Promise<Session | null>;
    }

    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
