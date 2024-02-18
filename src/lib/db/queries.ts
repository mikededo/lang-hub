import type { QueryData } from '@supabase/supabase-js';

import { supabaseClient } from './client';

import type { Tables } from '$lib/types';

export const getProjectsQuery = supabaseClient
  .from('projects')
  .select('*, languages:v_project_languages(*)');
export const getProjects = async () => (await getProjectsQuery.throwOnError()).data;
export type ProjectsWithLanguages = QueryData<typeof getProjectsQuery>;
export type ProjectWithLanguages = ProjectsWithLanguages[number];

export const getProject = async (id: Tables<'projects'>['id']) =>
  (await getProjectWithPhrases(id).throwOnError()).data;

export const getProjectWithPhrases = (id: number) =>
  supabaseClient
    .from('projects')
    .select('*, languages(*), phrases:v_phrase_translations(*)')
    .eq('id', id)
    .single()
    .throwOnError();
export type ProjectWithPhrases = QueryData<ReturnType<typeof getProjectWithPhrases>>;

export const getProjectPhrasesAndTranslations = (id: number) =>
  supabaseClient
    .from('phrase_translations')
    .select('*, translations(id, translated_text, languages(id, code))')
    .eq('project_id', id)
    .throwOnError();
export type PhrasesWithTranslations = QueryData<
  ReturnType<typeof getProjectPhrasesAndTranslations>
>;

export const createProjectPhrase = (
  project: Tables<'projects'>['id'],
  key: Tables<'phrases'>['key'],
) => supabaseClient.from('phrases').insert([{ project, key }]).select().throwOnError();

export const deleteProjectTranslation = (key: Tables<'phrases'>['key']) =>
  supabaseClient.from('phrases').delete().eq('key', key).throwOnError();
