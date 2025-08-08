<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header da página -->
      <div
        class="bg-background-surface rounded-xl shadow-xl border border-border-subtle p-6"
      >
        <h1 class="text-2xl font-bold text-text-base mb-2">Novo Cadastro</h1>
        <p class="text-text-muted">
          Preencha os dados para cadastrar um novo funcionário
        </p>
      </div>

      <!-- Formulário -->
      <FormFuncionario :isNovo="true" />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
// Configurações da página
useHead({
  title: "Novo Cadastro - Sistema de Cadastro",
  meta: [{ name: "description", content: "Cadastrar novo funcionário" }],
});
</script>
