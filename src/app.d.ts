import type { createServerClient } from '@supabase/ssr';
import type { Session } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
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
