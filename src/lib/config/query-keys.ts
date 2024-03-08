export const LANGUAGES = ['languages'];
export const PROJECTS = ['projects', 'list'];
export const PROJECT = (id: string) => ['project', id];
export const PROJECT_PHRASES = (id: string) => ['project', id, 'phrases'];
export const PROJECT_PHRASE = (project: string, phrase: string) => [
  'project',
  project,
  'phrases',
  phrase,
];
export const PHRASES = ['phrases'];
