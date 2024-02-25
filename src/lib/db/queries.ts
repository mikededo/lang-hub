import type { QueryData } from '@supabase/supabase-js';

import { supabaseClient } from './client';

import type { Tables } from '$lib/types';

export const getProjectsQuery = supabaseClient
  .from('projects')
  .select('*, languages:v_project_languages!project_languages(*)');
export const getProjects = async () => (await getProjectsQuery.throwOnError()).data;
export type ProjectsWithLanguages = QueryData<typeof getProjectsQuery>;
export type ProjectWithLanguages = ProjectsWithLanguages[number];

export const getProject = async (id: Tables<'projects'>['id']) =>
  (await getProjectWithPhrases(id).throwOnError()).data;

export const getProjectWithPhrases = (id: number) =>
  supabaseClient
    .from('projects')
    .select('*, languages:v_project_languages!project_languages(*), phrases:v_phrase_languages(*)')
    .eq('id', id)
    .single()
    .throwOnError();
export type ProjectWithPhrases = QueryData<ReturnType<typeof getProjectWithPhrases>>;

export const getProjectPhrasesAndTranslationsQuery = (id: number) =>
  supabaseClient
    .from('phrase_translations')
    .select('*, translations(id, translated_text, languages(id, code))')
    .eq('project_id', id)
    .throwOnError();
export const getProjectPhrasesAndTranslations = async (id: number) =>
  (await getProjectPhrasesAndTranslationsQuery(id)).data;
export type PhrasesWithTranslations = QueryData<
  ReturnType<typeof getProjectPhrasesAndTranslationsQuery>
>;

export const getPhraseTranslationsQuery = (key: string) =>
  supabaseClient.from('v_phrase_translations').select('*').eq('phrase_key', key).throwOnError();
export const getPhraseTranslations = async (key: string) =>
  (await getPhraseTranslationsQuery(key)).data;
export type PhraseTranslations = QueryData<ReturnType<typeof getPhraseTranslationsQuery>>;

export const createProjectPhrase = async (
  project: Tables<'projects'>['id'],
  key: Tables<'phrases'>['key'],
) => (await supabaseClient.from('phrases').insert([{ project, key }]).select().throwOnError()).data;

export const deleteProjectTranslation = async (key: Tables<'phrases'>['key']) =>
  (await supabaseClient.from('phrases').delete().eq('key', key).throwOnError()).data;
