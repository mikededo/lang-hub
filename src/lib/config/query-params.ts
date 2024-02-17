export const QUERY_PARAM_KEYS = {
  dialog: 'dialog',
  translationKey: 'translation_key',
  editorSelectedKey: 'selected_key',
} as const;
export const QUERY_PARAM_VALUES = {
  dialog: { create: 'create-translation', delete: 'delete-translation' },
} as const;
