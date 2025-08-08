<template>
  <DashboardLayout>
    <DashboardHeader
      :user="user"
      :loading="authLoading"
      @logout="handleLogout"
    />

    <DashboardGrid :user="user" :session="session" />

    <FuncionariosTable
      :funcionarios="funcionarios"
      :loading="funcionariosLoading"
      :error="funcionariosError"
      @refresh="handleRefreshFuncionarios"
    />

    <ErrorAlert :error="logoutError" />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Composables
const { user, session, logout, loading: authLoading } = useAuth();
const {
  funcionarios,
  loading: funcionariosLoading,
  error: funcionariosError,
  fetchFuncionarios,
} = useFuncionarios();

// Estado local
const logoutError = ref<string | null>(null);

// Função para fazer logout
const handleLogout = async () => {
  try {
    logoutError.value = null;
    const result = await logout();

    if (result.success) {
      await navigateTo("/login");
    } else {
      logoutError.value = result.error ?? "Erro ao fazer logout";
    }
  } catch (err) {
    logoutError.value = err instanceof Error ? err.message : "Erro inesperado";
  }
};

// Função para atualizar funcionários
const handleRefreshFuncionarios = async () => {
  await fetchFuncionarios();
};

// Buscar funcionários quando a página for montada
onMounted(async () => {
  await fetchFuncionarios();
});

// Configurações da página
useHead({
  title: "Dashboard - Minha App",
  meta: [{ name: "description", content: "Dashboard do usuário logado" }],
});
</script>
