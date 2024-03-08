import type { Database } from './schema.generated';

type Functions = keyof Database['public']['Functions'];
export type FunctionArgs<F extends Functions> = Database['public']['Functions'][F]['Args'];

export type * from './schema.generated';
