type Options = { queryParams?: Record<string, string> };

// TODO: Update to decorateOptions
const appendParams = (path: string, params?: Record<string, string>) =>
  !params ? path : `${path}?${new URLSearchParams(params).toString()}`;

// TBD
export const home = (_?: Options) => '/';
export const project = (id: string | number, options?: Options) =>
  appendParams(`/project/${id}`, options?.queryParams);
export const editor = (projectId: string | number, options?: Options) =>
  appendParams(`${project(projectId)}/editor`, options?.queryParams);
