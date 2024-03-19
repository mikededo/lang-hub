import { derived, get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { QUERY_PARAM_KEYS, QUERY_PARAM_LIST_SEPARATOR } from '$lib/config';

export const params = derived(page, (page) => page.url.searchParams);
export const selectedLanguages = derived(
  params,
  (params) =>
    params.get(QUERY_PARAM_KEYS.editorSelectedLanguages)?.split(QUERY_PARAM_LIST_SEPARATOR) ?? [],
);

export const onToggleLanguage = (id: number | null) => () => {
  if (!id) {
    return;
  }

  let updatedLanguages = [...get(selectedLanguages)];
  if (updatedLanguages.includes(`${id}`)) {
    updatedLanguages = updatedLanguages.filter((lang) => lang !== `${id}`);
  } else {
    updatedLanguages = [...updatedLanguages, `${id}`];
  }

  const newParams = new URLSearchParams(get(params).toString());
  if (updatedLanguages.length > 0) {
    newParams.set(QUERY_PARAM_KEYS.editorSelectedLanguages, updatedLanguages.join(','));
  } else {
    newParams.delete(QUERY_PARAM_KEYS.editorSelectedLanguages);
  }

  const { pathname } = get(page).url;
  goto(`${pathname}?${newParams.toString()}`);
};
