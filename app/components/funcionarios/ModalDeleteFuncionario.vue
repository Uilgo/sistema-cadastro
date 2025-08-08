<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    @click.self="$emit('close')"
  >
    <div
      class="bg-background-surface rounded-xl shadow-2xl border border-border-subtle p-6 max-w-md w-full mx-4"
    >
      <!-- Header do Modal -->
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2 bg-semantic-error/10 rounded-lg">
          <ExclamationTriangleIcon class="w-6 h-6 text-semantic-error" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-text-base">
            Confirmar Exclusão
          </h3>
          <p class="text-sm text-text-muted">Esta ação não pode ser desfeita</p>
        </div>
      </div>

      <!-- Informações do Funcionário -->
      <div class="bg-background-elevated rounded-lg p-4 mb-6">
        <h4 class="text-sm font-medium text-text-base mb-3">
          Dados do funcionário a ser excluído:
        </h4>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-text-muted">Nome:</span>
            <span class="text-sm font-medium text-text-base">{{
              funcionario.nome
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-text-muted">Cargo:</span>
            <span class="text-sm font-medium text-text-base">{{
              funcionario.cargo || "-"
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-text-muted">Email:</span>
            <span class="text-sm font-medium text-text-base">{{
              funcionario.email || "-"
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-text-muted">Salário:</span>
            <span class="text-sm font-medium text-text-base">
              {{
                funcionario.salario
                  ? `R$ ${funcionario.salario.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`
                  : "-"
              }}
            </span>
          </div>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="flex items-center gap-3 justify-end">
        <BaseButton
          @click="$emit('close')"
          variant="outline"
          :disabled="loading"
        >
          Cancelar
        </BaseButton>
        <BaseButton
          @click="handleDelete"
          :disabled="loading"
          class="bg-semantic-error hover:bg-semantic-error/90 text-white"
        >
          <span v-if="loading">Deletando...</span>
          <span v-else>Deletar</span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import type { Funcionario } from "~/types";

// Props
interface Props {
  isOpen: boolean;
  funcionario: Funcionario;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

// Emits
interface Emits {
  close: [];
  delete: [id: number];
}

const emit = defineEmits<Emits>();

// Função para lidar com a exclusão
const handleDelete = () => {
  emit("delete", props.funcionario.id);
};
</script>
