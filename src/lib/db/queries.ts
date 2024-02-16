import type { QueryData } from '@supabase/supabase-js';

import { supabaseClient } from './client';

import type { Tables } from '$lib/types';

export const getProjectsQuery = supabaseClient
  .from('projects')
  .select('*, locales:project_locales(*)');
export const getProjects = async () => (await getProjectsQuery.throwOnError()).data;
export type ProjectsWithLocales = QueryData<typeof getProjectsQuery>;
export type ProjectWithLocales = ProjectsWithLocales[0];

export const getProject = async (id: Tables<'projects'>['id']) =>
  (await getProjectTranslations(id).throwOnError()).data;

export const getProjectTranslations = (id: number) =>
  supabaseClient
    .from('projects')
    .select(
      '*, locales:project_locales(is_default, locale:locales(*)), translations:v_translations_translated(*)',
    )
    .eq('id', id)
    .single();
export type ProjectWithTranslations = QueryData<ReturnType<typeof getProjectTranslations>>;

export const createProjectTranslation = (
  project: Tables<'projects'>['id'],
  locales: Tables<'locales'>[],
  key: Tables<'translations'>['value'],
) => {
  const translations = locales.map(({ code }) => ({
    project_id: project,
    translation_key: key,
    locale_code: code,
    value: '',
  }));

  return supabaseClient.from('translations').insert(translations).select();
};
