export default defineNuxtPlugin(async () => {
  const { checkAuth, initAuthListener } = useAuth();

  try {
    // Verificar se há uma sessão ativa ao carregar a aplicação
    await checkAuth();

    // Inicializar o listener para mudanças de autenticação
    initAuthListener();
  } catch (error) {
    console.error("Erro ao inicializar autenticação:", error);
  }
});
