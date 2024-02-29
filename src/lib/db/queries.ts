import { isBrowser } from '@supabase/ssr';
import type { PostgrestSingleResponse, QueryData, SupabaseClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

import { goto } from '$app/navigation';
import type { Database, Tables } from '$lib/types';

export type Client = SupabaseClient<Database>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result<T extends (...args: any) => any> = QueryData<ReturnType<T>>;

// Error handlers
const withUnauthorizedRedirect = async <T>(
  client: Client,
  response: PostgrestSingleResponse<T>,
) => {
  if (response.error && response.status >= 400 && response.status < 500) {
    // await client.auth.signOut();
    if (isBrowser()) {
      goto('/auth');
    } else {
      redirect(307, '/auth');
    }
  }
  return response;
};

// AUTH
export const signInUser = async (client: Client, email: string, password: string) =>
  await client.auth.signInWithPassword({ email, password });

// PROJECTS
export const getProjectsQuery = (client: Client) =>
  client.from('projects').select('*, languages:v_project_languages!project_languages(*)');
export const getProjects = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getProjectsQuery(client))).data;
export type ProjectsWithLanguages = Result<typeof getProjectsQuery>;
export type ProjectWithLanguages = ProjectsWithLanguages[number];

export const getProjectWithPhrases = (client: Client, id: number) =>
  client
    .from('projects')
    .select('*, languages:v_project_languages!project_languages(*), phrases:v_phrase_languages(*)')
    .eq('id', id)
    .single();
export const getProject = async (client: Client, id: Tables<'projects'>['id']) =>
  (await withUnauthorizedRedirect(client, await getProjectWithPhrases(client, id))).data;
export type ProjectWithPhrases = Result<typeof getProjectWithPhrases>;

export const getPhraseTranslationsQuery = (client: Client, key: string) =>
  client.from('v_phrase_translations').select('*').eq('phrase_key', key);
export const getPhraseTranslations = async (client: Client, key: string) =>
  (await withUnauthorizedRedirect(client, await getPhraseTranslationsQuery(client, key))).data;
export type PhraseTranslations = Result<typeof getPhraseTranslationsQuery>;

export const createProjectPhrase = async (
  client: Client,
  project: Tables<'projects'>['id'],
  key: Tables<'phrases'>['key'],
) => (await client.from('phrases').insert([{ project, key }]).select().throwOnError()).data;

export const deleteProjectTranslation = async (client: Client, key: Tables<'phrases'>['key']) =>
  (await client.from('phrases').delete().eq('key', key).throwOnError()).data;
