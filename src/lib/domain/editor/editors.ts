import type { Tables } from '$lib/types';

type UpdatedOptions = { isNew: boolean };
export type PhraseUpdater = (translation: Tables<'translations'>, opts: UpdatedOptions) => void;
