import { ref, readonly } from "vue";
import type {
  Funcionario,
  FuncionariosResponse,
  FuncionarioInsert,
} from "../types/funcionarios";

// Estado reativo global
const funcionarios = ref<Funcionario[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export const useFuncionarios = () => {
  // Buscar todos os funcionários
  const fetchFuncionarios = async (): Promise<FuncionariosResponse> => {
    try {
      loading.value = true;
      error.value = null;

      const { $supabase } = useNuxtApp();

      const { data, error: supabaseError } = await $supabase
        .from("funcionarios")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      funcionarios.value = data || [];

      return {
        success: true,
        data: data || [],
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      error.value = errorMessage;

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      loading.value = false;
    }
  };

  // Inserir novo funcionário
  const insertFuncionario = async (
    funcionarioData: FuncionarioInsert
  ): Promise<FuncionariosResponse> => {
    try {
      loading.value = true;
      error.value = null;

      const { $supabase } = useNuxtApp();

      const { data, error: supabaseError } = await $supabase
        .from("funcionarios")
        .insert([funcionarioData])
        .select()
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      // Adicionar o novo funcionário à lista local
      if (data) {
        funcionarios.value.unshift(data);
      }

      return {
        success: true,
        data: data ? [data] : [],
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao cadastrar funcionário";
      error.value = errorMessage;

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      loading.value = false;
    }
  };

  // Atualizar funcionário existente
  const updateFuncionario = async (
    id: number,
    funcionarioData: FuncionarioInsert
  ): Promise<FuncionariosResponse> => {
    try {
      loading.value = true;
      error.value = null;

      const { $supabase } = useNuxtApp();

      const { data, error: supabaseError } = await $supabase
        .from("funcionarios")
        .update(funcionarioData)
        .eq("id", id)
        .select()
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      // Atualizar o funcionário na lista local
      if (data) {
        const index = funcionarios.value.findIndex((f) => f.id === id);
        if (index !== -1) {
          funcionarios.value[index] = data;
        }
      }

      return {
        success: true,
        data: data ? [data] : [],
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar funcionário";
      error.value = errorMessage;

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      loading.value = false;
    }
  };

  // Deletar funcionário
  const deleteFuncionario = async (
    id: number
  ): Promise<FuncionariosResponse> => {
    try {
      loading.value = true;
      error.value = null;

      const { $supabase } = useNuxtApp();

      const { error: supabaseError } = await $supabase
        .from("funcionarios")
        .delete()
        .eq("id", id);

      if (supabaseError) {
        throw supabaseError;
      }

      // Remover o funcionário da lista local
      funcionarios.value = funcionarios.value.filter((f) => f.id !== id);

      return {
        success: true,
        data: [],
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao deletar funcionário";
      error.value = errorMessage;

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      loading.value = false;
    }
  };

  return {
    // Estado
    funcionarios: readonly(funcionarios),
    loading: readonly(loading),
    error: readonly(error),

    // Métodos
    fetchFuncionarios,
    insertFuncionario,
    updateFuncionario,
    deleteFuncionario,
  };
};
