export const QUERY_PARAM_LIST_SEPARATOR = ',';
export const QUERY_PARAM_KEYS = {
  dialog: 'dialog',
  translationKey: 'translation_key',
  editorSelectedKey: 'selected_key',
  editorSelectedLanguages: 'selected_languages',
} as const;
export const QUERY_PARAM_VALUES = {
  dialog: {
    profile: 'profile',
    createProject: 'create-project',
    deleteProject: 'delete-project',
    createPhrase: 'create-phrase',
    deletePhrase: 'delete-phrase',
    previewTranslations: 'preview-translations',
  },
} as const;
