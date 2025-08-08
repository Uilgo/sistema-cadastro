import { ref, readonly } from "vue";
import type { Funcionario, FuncionariosResponse } from "../types/funcionarios";

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

  return {
    // Estado
    funcionarios: readonly(funcionarios),
    loading: readonly(loading),
    error: readonly(error),

    // Métodos
    fetchFuncionarios,
  };
};
