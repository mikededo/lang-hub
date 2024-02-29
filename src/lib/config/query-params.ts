export const QUERY_PARAM_KEYS = {
  dialog: 'dialog',
  translationKey: 'translation_key',
  editorSelectedKey: 'selected_key',
} as const;
export const QUERY_PARAM_VALUES = {
  dialog: {
    createProject: 'create-project',
    deleteProject: 'delete-project',
    createPhrase: 'create-phrase',
    deletePhrase: 'delete-phrase',
  },
} as const;
