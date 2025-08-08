import { isPublicRoute } from "~/types";

export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, checkAuth } = useAuth();

  // Verificar se a rota atual é pública
  const isPublic = isPublicRoute(to.path);

  try {
    // Se estiver no servidor, sempre verificar a autenticação
    if (import.meta.server) {
      await checkAuth();
    }

    // Se não está autenticado e está tentando acessar rota protegida
    if (!isAuthenticated.value && !isPublic) {
      console.log(
        `Redirecionando para login: rota ${to.path} requer autenticação`
      );
      return navigateTo("/login");
    }

    // Se está autenticado e está tentando acessar a página de login
    if (isAuthenticated.value && to.path === "/login") {
      console.log("Usuário já autenticado, redirecionando para dashboard");
      return navigateTo("/");
    }
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);

    // Em caso de erro, se não for rota pública, redirecionar para login
    if (!isPublic) {
      return navigateTo("/login");
    }
  }
});
