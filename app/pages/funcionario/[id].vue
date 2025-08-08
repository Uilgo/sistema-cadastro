<template>
  <div class="space-y-6">
    <!-- Header da página -->
    <div
      class="bg-background-surface rounded-xl shadow-xl border border-border-subtle p-6"
    >
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-text-base mb-2">
            Editar Funcionário
          </h1>
          <p class="text-text-muted">Altere os dados do funcionário</p>
        </div>

        <!-- Botão Voltar -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2 px-4 py-2 bg-background-elevated hover:bg-background-surface text-text-base rounded-lg font-medium transition-all duration-200 border border-border-subtle"
        >
          <ArrowLeftIcon class="w-4 h-4" />
          Voltar
        </NuxtLink>
      </div>
    </div>

    <!-- Formulário -->
    <FormFuncionario
      :isNovo="false"
      :funcionario="funcionario"
      :readonly="!isEditing"
    />

    <!-- Mensagem se funcionário não encontrado -->
    <div
      v-if="!funcionario && !loading"
      class="bg-semantic-error/10 border border-semantic-error text-semantic-error px-6 py-4 rounded-xl text-center"
    >
      <div class="flex items-center justify-center gap-2 mb-2">
        <ExclamationCircleIcon class="w-6 h-6" />
        <span class="font-semibold">Funcionário não encontrado</span>
      </div>
      <p class="text-sm">
        O funcionário com ID {{ route.params.id }} não foi encontrado na lista.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="bg-background-surface rounded-xl shadow-xl border border-border-subtle p-8 text-center"
    >
      <div class="inline-flex items-center gap-2 text-text-muted">
        <ArrowPathIcon class="animate-spin w-5 h-5" />
        Carregando dados do funcionário...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";

// Composables
const route = useRoute();
const { funcionarios, loading, fetchFuncionarios } = useFuncionarios();

// Página sempre em modo edição
const isEditing = ref(true);

// Buscar funcionário pelo ID
const funcionarioId = computed(() => parseInt(route.params.id as string));

const funcionario = computed(() => {
  return funcionarios.value.find((f) => f.id === funcionarioId.value) || null;
});

// Se não há funcionários carregados, buscar
onMounted(async () => {
  if (funcionarios.value.length === 0) {
    await fetchFuncionarios();
  }
});

// Configurações da página
useHead({
  title: `Funcionário ${funcionarioId.value} - Sistema de Cadastro`,
  meta: [{ name: "description", content: "Visualizar dados do funcionário" }],
});
</script>
