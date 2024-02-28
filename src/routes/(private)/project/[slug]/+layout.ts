import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => ({ slug: params.slug });
