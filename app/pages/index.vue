<template>
  <DashboardLayout>
    <!-- Header simples -->
    <div
      class="bg-background-surface rounded-xl shadow-xl px-6 py-5 border border-border-subtle mb-6"
    >
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-text-base mb-1">Dashboard</h1>
          <p class="text-text-muted text-sm" v-if="user">
            Bem-vindo,
            <span class="text-brand-primary font-semibold">{{
              user.email
            }}</span>
          </p>
        </div>
        <BaseButton
          variant="outline"
          @click="handleLogout"
          :disabled="authLoading"
          size="sm"
        >
          <span v-if="authLoading">Saindo...</span>
          <span v-else>Logout</span>
        </BaseButton>
      </div>
    </div>

    <!-- Tabela de funcionários -->
    <FuncionariosTable
      :funcionarios="funcionarios"
      :loading="funcionariosLoading"
      :error="funcionariosError"
      @refresh="handleRefreshFuncionarios"
    />

    <!-- Mensagem de erro do logout -->
    <div
      v-if="logoutError"
      class="mt-6 bg-semantic-error/10 border border-semantic-error text-semantic-error px-4 py-3 rounded-lg"
    >
      {{ logoutError }}
    </div>
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
