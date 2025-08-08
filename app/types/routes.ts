// Tipos para roteamento e middleware
export interface RouteConfig {
  path: string;
  requiresAuth: boolean;
  redirectTo?: string;
}

export type PublicRoute = "/login";

export const PUBLIC_ROUTES: PublicRoute[] = ["/login"];

export const isPublicRoute = (path: string): boolean => {
  return PUBLIC_ROUTES.includes(path as PublicRoute);
};
