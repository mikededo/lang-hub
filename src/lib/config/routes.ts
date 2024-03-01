type Route = {
  // Public
  home: undefined;
  auth: undefined;
  signIn: undefined;
  signUp: undefined;

  // Private
  app: undefined;
  project: { project: string };
  editor: { project: string };
};

type Routes = keyof Route;
type RouteWithParams = {
  [R in Routes]: Route[R] extends undefined ? never : R;
}[keyof Route];
type RouteWithoutParams = {
  [R in Routes]: Route[R] extends undefined ? R : never;
}[keyof Route];

const Paths: Record<Routes, string> = {
  home: '/',
  auth: '/auth',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',

  app: '/app',
  project: '/app/project/:project',
  editor: '/app/project/:project/editor',
};

export function pathTo<T extends RouteWithoutParams>(route: T): string;
export function pathTo<T extends RouteWithParams>(route: T, params: Route[T]): string;
export function pathTo<T extends Routes>(route: T, params?: Route[T]): string {
  if (params !== undefined) {
    return Object.keys(params).reduce(
      (path, key) => path.replace(`:${key}`, (params as Record<string, string>)[key]),
      Paths[route],
    );
  } else {
    return Paths[route];
  }
}

// Helpers
export const isAuthPath = (path: string | undefined) => path === Paths.auth;
export const isAuthRelated = (path: string | undefined) => path?.startsWith(Paths.auth);
