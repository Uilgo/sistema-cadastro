<template>
  <div class="bg-gray-800 rounded-xl shadow-xl border border-gray-700">
    <!-- Header da tabela -->
    <div class="px-6 py-4 border-b border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-white flex items-center gap-2">
            <UsersIcon class="w-5 h-5 text-orange-500" />
            Lista de Funcionários
          </h3>
          <p class="text-gray-400 text-sm mt-1">
            {{ funcionarios.length }} funcionário(s) encontrado(s)
          </p>
        </div>

        <BaseButton
          @click="$emit('refresh')"
          :disabled="loading"
          variant="outline"
          size="sm"
          class="flex items-center gap-2"
        >
          <ArrowPathIcon class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Atualizar
        </BaseButton>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="p-8 text-center">
      <div class="inline-flex items-center gap-2 text-gray-400">
        <ArrowPathIcon class="animate-spin w-5 h-5" />
        Carregando funcionários...
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-6">
      <div
        class="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
      >
        <div class="flex items-center gap-2">
          <ExclamationCircleIcon class="w-5 h-5 text-red-400" />
          <span>{{ error }}</span>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="funcionarios.length === 0" class="p-6 text-center">
      <div class="text-gray-400 mb-2">
        <UsersIcon class="w-12 h-12 mx-auto mb-4 text-gray-600" />
        <p class="text-lg font-medium text-gray-300 mb-2">
          Nenhum funcionário encontrado
        </p>
        <p class="text-sm text-gray-500">
          Não há funcionários cadastrados no sistema ainda.
        </p>
      </div>
    </div>

    <!-- Tabela com dados -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-700">
        <thead class="bg-gray-700/50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Cargo
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr
            v-for="funcionario in funcionarios"
            :key="funcionario.id"
            class="hover:bg-gray-700/50 transition-colors"
          >
            <td class="px-6 py-3 whitespace-nowrap">
              <div class="text-sm font-medium text-white">
                {{ funcionario.nome }}
              </div>
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-300">
                {{ funcionario.cargo || "-" }}
              </div>
            </td>
            <td class="px-6 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-300">
                {{ funcionario.email || "-" }}
              </div>
            </td>
            <td class="px-6 py-3 whitespace-nowrap text-center">
              <div class="flex items-center justify-center gap-2">
                <NuxtLink
                  :to="`/funcionario/${funcionario.id}?edit=true`"
                  class="inline-flex items-center gap-1 px-3 py-1 bg-brand-primary hover:bg-brand-primaryHover text-text-onAccent rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <PencilIcon class="w-4 h-4" />
                  Editar
                </NuxtLink>
                <button
                  @click="openDeleteModal(funcionario)"
                  class="inline-flex items-center gap-1 px-3 py-1 bg-semantic-error hover:bg-semantic-error/90 text-white rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <TrashIcon class="w-4 h-4" />
                  Deletar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <ModalDeleteFuncionario
      :isOpen="isDeleteModalOpen"
      :funcionario="funcionarioToDelete!"
      :loading="deleteLoading"
      @close="closeDeleteModal"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import {
  UsersIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import type { Funcionario } from "~/types";

// Props
interface Props {
  funcionarios: readonly Funcionario[];
  loading: boolean;
  error: string | null;
}

const props = defineProps<Props>();

// Emits
interface Emits {
  refresh: [];
}

const emit = defineEmits<Emits>();

// Composables
const { deleteFuncionario } = useFuncionarios();
const toast = useToast();

// Estado do modal de exclusão
const isDeleteModalOpen = ref(false);
const funcionarioToDelete = ref<Funcionario | null>(null);
const deleteLoading = ref(false);

// Função para abrir o modal de exclusão
const openDeleteModal = (funcionario: Funcionario) => {
  funcionarioToDelete.value = funcionario;
  isDeleteModalOpen.value = true;
};

// Função para fechar o modal de exclusão
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  funcionarioToDelete.value = null;
};

// Função para lidar com a exclusão
const handleDelete = async (id: number) => {
  try {
    deleteLoading.value = true;

    const result = await deleteFuncionario(id);

    if (result.success) {
      toast.success("Funcionário deletado com sucesso!");
      closeDeleteModal();
      emit("refresh"); // Atualizar a lista
    } else {
      throw new Error(result.error || "Erro ao deletar funcionário");
    }
  } catch (error) {
    console.error("Erro ao deletar funcionário:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro inesperado ao deletar funcionário";
    toast.error(errorMessage);
  } finally {
    deleteLoading.value = false;
  }
};
</script>
