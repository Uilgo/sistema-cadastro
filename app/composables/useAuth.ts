import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient, User, Session } from "@supabase/supabase-js";
import type { AuthResponse } from "~/types";

// Estado reativo global
const user = ref<User | null>(null);
const session = ref<Session | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

// Cliente Supabase (lazy initialization)
let supabase: SupabaseClient | null = null;

const getSupabaseClient = () => {
  if (!supabase) {
    const config = useRuntimeConfig();
    supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey
    );
  }
  return supabase;
};

export const useAuth = () => {
  // Login com email e senha
  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      loading.value = true;
      error.value = null;

      const client = getSupabaseClient();
      const { data, error: authError } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      user.value = data.user;
      session.value = data.session;

      return { success: true, user: data.user, session: data.session };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer login";
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  // Registro de nova conta
  const register = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      loading.value = true;
      error.value = null;

      const client = getSupabaseClient();
      const { data, error: authError } = await client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) {
        throw authError;
      }

      // Se o usuário foi criado mas precisa confirmar email
      if (data.user && !data.session) {
        return {
          success: true,
          user: data.user,
          error:
            "Verifique seu email para confirmar a conta antes de fazer login.",
        };
      }

      // Se o usuário foi criado e já está logado
      if (data.user && data.session) {
        user.value = data.user;
        session.value = data.session;
        return { success: true, user: data.user, session: data.session };
      }

      return { success: false, error: "Erro inesperado ao criar conta" };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar conta";
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      loading.value = true;
      error.value = null;

      const client = getSupabaseClient();
      const { error: authError } = await client.auth.signOut();

      if (authError) {
        throw authError;
      }

      user.value = null;
      session.value = null;

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer logout";
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  // Verificar se o usuário está logado
  const checkAuth = async () => {
    try {
      const client = getSupabaseClient();
      const {
        data: { session: currentSession },
      } = await client.auth.getSession();

      if (currentSession) {
        user.value = currentSession.user;
        session.value = currentSession;
      }

      return currentSession;
    } catch (err) {
      console.error(
        "Erro ao verificar autenticação:",
        err instanceof Error ? err.message : err
      );
      return null;
    }
  };

  // Listener para mudanças de autenticação
  const initAuthListener = () => {
    const client = getSupabaseClient();
    client.auth.onAuthStateChange((_event, currentSession) => {
      if (currentSession) {
        user.value = currentSession.user;
        session.value = currentSession;
      } else {
        user.value = null;
        session.value = null;
      }
    });
  };

  // Computed para verificar se está autenticado
  const isAuthenticated = computed(() => !!user.value);

  return {
    // Estado
    user: readonly(user),
    session: readonly(session),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,

    // Métodos
    login,
    register,
    logout,
    checkAuth,
    initAuthListener,

    // Cliente Supabase (caso precise de acesso direto)
    getSupabaseClient,
  };
};
