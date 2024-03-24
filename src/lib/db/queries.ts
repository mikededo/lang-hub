import { isBrowser } from '@supabase/ssr';
import type { PostgrestSingleResponse, QueryData, SupabaseClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

import { goto } from '$app/navigation';
import { pathTo } from '$lib/config';
import type { Database, FunctionArgs, Tables } from '$lib/types';

export type Client = SupabaseClient<Database>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result<T extends (...args: any) => any> = QueryData<ReturnType<T>>;

// TODO: Improve handlers to handle other errors
// Error handlers
const withUnauthorizedRedirect = async <T>(
  client: Client,
  response: PostgrestSingleResponse<T>,
) => {
  if (response.error && response.status >= 400 && response.status < 500) {
    await client.auth.signOut();

    if (isBrowser()) {
      goto(pathTo('signIn'));
    } else {
      redirect(302, pathTo('signIn'));
    }
  }
  return response;
};

// AUTH
export type SignInData = { email: string; password: string };
export type SignUpData = { firstName: string; lastName: string } & SignInData;
export const signInUser = async (client: Client, email: string, password: string) =>
  await client.auth.signInWithPassword({ email, password });
export const signUpUser = async (client: Client, { email, password, ...rest }: SignUpData) =>
  await client.auth.signUp({ email, password, options: { data: rest } });

// PROJECTS
export const getProjectsQuery = (client: Client) =>
  client
    .from('projects')
    .select('*, languages:v_project_languages!project_languages_project_fkey(*)');
export const getProjects = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getProjectsQuery(client))).data;
export type ProjectsWithLanguages = Result<typeof getProjectsQuery>;
export type ProjectWithLanguages = ProjectsWithLanguages[number];

export const getProjectWithPhrases = (client: Client, id: number) =>
  client
    .from('projects')
    .select(
      '*, languages:v_project_languages!project_languages_project_fkey(*), phrases:v_phrase_languages(*)',
    )
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

export const getAvailableLanguagesQuery = (client: Client) =>
  client.from('languages').select('*').order('name', { ascending: true });
export const getAvailableLanguages = async (client: Client) =>
  (await withUnauthorizedRedirect(client, await getAvailableLanguagesQuery(client))).data;

/* MUTATIONS */

// USER
export type UserData = { firstName: string; lastName: string; email: string; password?: string };
export const updateUser = async (client: Client, { firstName, lastName, ...data }: UserData) =>
  await client.auth.updateUser({ ...data, data: { firstName, lastName } });

// PROJECTS
export const createProject = async (client: Client, data: FunctionArgs<'create_project'>) =>
  (await client.rpc('create_project', data).throwOnError()).data;

// PHRASES
export const createProjectPhrase = async (
  client: Client,
  project: Tables<'projects'>['id'],
  key: Tables<'phrases'>['key'],
) => (await client.from('phrases').insert([{ project, key }]).select().throwOnError()).data;

export const deleteProjectTranslation = async (client: Client, key: Tables<'phrases'>['key']) =>
  (await client.from('phrases').delete().eq('key', key).throwOnError()).data;

type UpdatedTranslation = Omit<Tables<'translations'>, 'last_updated'>;
export type UpsertTranslationData =
  | Omit<UpdatedTranslation, 'id'> // Create
  | (UpdatedTranslation & Required<Pick<Tables<'translations'>, 'id'>>); // Update
export const upsertTranslation = async (client: Client, translation: UpsertTranslationData) =>
  (await client.from('translations').upsert([translation]).select().throwOnError()).data;
