export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, checkAuth } = useAuth();

  // Se estiver no servidor, verificar autenticação
  if (import.meta.server) {
    const session = await checkAuth();
    if (session) {
      return navigateTo("/");
    }
    return;
  }

  // No cliente, verificar se está autenticado
  if (isAuthenticated.value) {
    return navigateTo("/");
  }
});
