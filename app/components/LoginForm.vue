<template>
  <div
    class="w-full max-w-md mx-auto bg-background-surface rounded-xl shadow-2xl p-8 border border-border-subtle"
  >
    <!-- Tabs -->
    <div class="flex mb-8 border-b border-border-subtle">
      <button
        @click="activeTab = 'login'"
        :class="[
          'flex-1 py-3 px-4 text-center font-semibold transition-all duration-200 relative cursor-pointer',
          activeTab === 'login'
            ? 'text-brand-primary'
            : 'text-text-muted hover:text-text-base',
        ]"
      >
        Entrar
        <div
          v-if="activeTab === 'login'"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
        />
      </button>
      <button
        @click="activeTab = 'register'"
        :class="[
          'flex-1 py-3 px-4 text-center font-semibold transition-all duration-200 relative cursor-pointer',
          activeTab === 'register'
            ? 'text-brand-primary'
            : 'text-text-muted hover:text-text-base',
        ]"
      >
        Cadastrar
        <div
          v-if="activeTab === 'register'"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
        />
      </button>
    </div>

    <!-- Login Form -->
    <form v-if="activeTab === 'login'" @submit="handleLogin" class="space-y-6">
      <!-- Mensagem de erro -->
      <div
        v-if="loginError"
        class="bg-semantic-error/10 border border-semantic-error text-semantic-error px-4 py-3 rounded-lg text-sm"
      >
        {{ loginError }}
      </div>

      <!-- Mensagem de sucesso -->
      <div
        v-if="loginSuccess"
        class="bg-semantic-success/10 border border-semantic-success text-semantic-success px-4 py-3 rounded-lg text-sm"
      >
        Login realizado com sucesso! Redirecionando...
      </div>

      <div>
        <BaseInput
          v-model="loginForm.email"
          id="login-email"
          type="email"
          label="Email"
          placeholder="Digite seu email"
          :class="{
            'border-semantic-error': hasFieldError('email', loginValidation),
          }"
        />
        <!-- Erros específicos do campo email -->
        <div
          v-if="hasFieldError('email', loginValidation)"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors('email', loginValidation)"
            :key="error"
            class="flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ error }}
          </div>
        </div>
      </div>

      <div>
        <BaseInput
          v-model="loginForm.password"
          id="login-password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          :class="{
            'border-semantic-error': hasFieldError('password', loginValidation),
          }"
        />
        <!-- Erros específicos do campo senha -->
        <div
          v-if="hasFieldError('password', loginValidation)"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors('password', loginValidation)"
            :key="error"
            class="flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ error }}
          </div>
        </div>
      </div>

      <BaseButton
        type="submit"
        class="w-full mt-8"
        size="lg"
        :disabled="loading"
      >
        <span v-if="loading">Entrando...</span>
        <span v-else>Entrar</span>
      </BaseButton>
    </form>

    <!-- Register Form -->
    <form
      v-if="activeTab === 'register'"
      @submit="handleRegister"
      class="space-y-6"
    >
      <!-- Mensagem de erro do registro -->
      <div
        v-if="registerError"
        class="bg-semantic-error/10 border border-semantic-error text-semantic-error px-4 py-3 rounded-lg text-sm"
      >
        {{ registerError }}
      </div>

      <!-- Mensagem de sucesso do registro -->
      <div
        v-if="registerSuccess"
        class="bg-semantic-success/10 border border-semantic-success text-semantic-success px-4 py-3 rounded-lg text-sm"
      >
        Conta criada com sucesso! Redirecionando...
      </div>

      <div>
        <BaseInput
          v-model="registerForm.email"
          id="register-email"
          type="email"
          label="Email"
          placeholder="Digite seu email"
          :class="{
            'border-semantic-error': hasFieldError('email', registerValidation),
          }"
        />
        <!-- Erros específicos do campo email -->
        <div
          v-if="hasFieldError('email', registerValidation)"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors('email', registerValidation)"
            :key="error"
            class="flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ error }}
          </div>
        </div>
      </div>

      <div>
        <BaseInput
          v-model="registerForm.password"
          id="register-password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          :class="{
            'border-semantic-error': hasFieldError(
              'password',
              registerValidation
            ),
          }"
        />
        <!-- Erros específicos do campo senha -->
        <div
          v-if="hasFieldError('password', registerValidation)"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors('password', registerValidation)"
            :key="error"
            class="flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ error }}
          </div>
        </div>
      </div>

      <div>
        <BaseInput
          v-model="registerForm.confirmPassword"
          id="register-confirm-password"
          type="password"
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          :class="{
            'border-semantic-error': hasFieldError(
              'confirmPassword',
              registerValidation
            ),
          }"
        />
        <!-- Erros específicos do campo confirmação de senha -->
        <div
          v-if="hasFieldError('confirmPassword', registerValidation)"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors(
              'confirmPassword',
              registerValidation
            )"
            :key="error"
            class="flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ error }}
          </div>
        </div>
      </div>

      <BaseButton
        type="submit"
        class="w-full mt-8"
        size="lg"
        :disabled="loading || isValidating"
      >
        <span v-if="loading || isValidating">Criando conta...</span>
        <span v-else>Cadastrar</span>
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type {
  TabType,
  LoginForm,
  RegisterForm,
  FormSubmitEvent,
  FormValidation,
} from "~/types";

// Composables
const { login, register, loading } = useAuth();
const { validateLoginForm, validateRegisterForm } = useValidation();

// Estado das abas
const activeTab = ref<TabType>("login");

// Formulário de login
const loginForm = ref<LoginForm>({
  email: "",
  password: "",
});

// Formulário de cadastro
const registerForm = ref<RegisterForm>({
  email: "",
  password: "",
  confirmPassword: "",
});

// Estado de validação
const loginValidation = ref<FormValidation | null>(null);
const registerValidation = ref<FormValidation | null>(null);

// Estado local para mensagens
const loginError = ref<string | null>(null);
const loginSuccess = ref(false);
const registerError = ref<string | null>(null);
const registerSuccess = ref(false);
const isValidating = ref(false);

// Função para fazer login
const handleLogin = async (event: FormSubmitEvent) => {
  event.preventDefault();

  // Limpar mensagens anteriores
  loginError.value = null;
  loginSuccess.value = false;
  isValidating.value = true;

  try {
    // Validar formulário
    const validation = await validateLoginForm(loginForm.value);
    loginValidation.value = validation;

    if (!validation.isValid) {
      // Mostrar primeiro erro encontrado
      const firstFieldError = Object.values(validation.errors).find(
        (field) => !field.isValid
      );
      if (firstFieldError && firstFieldError.errors.length > 0) {
        loginError.value = firstFieldError.errors[0] ?? null;
      } else if (validation.globalErrors.length > 0) {
        loginError.value = validation.globalErrors[0] ?? null;
      }
      return;
    }

    // Se validação passou, tentar fazer login
    const result = await login(
      loginForm.value.email.trim(),
      loginForm.value.password
    );

    if (result.success) {
      loginSuccess.value = true;
      // Redirecionar para a página principal após login bem-sucedido
      await navigateTo("/");
    } else {
      loginError.value =
        result.error ?? "Credenciais inválidas. Verifique seu email e senha.";
    }
  } catch (err) {
    loginError.value =
      err instanceof Error ? err.message : "Erro inesperado. Tente novamente.";
  } finally {
    isValidating.value = false;
  }
};

// Função para obter erros de um campo específico
const getFieldErrors = (
  fieldName: string,
  validation: FormValidation | null
): string[] => {
  if (!validation || !validation.errors[fieldName]) return [];
  return validation.errors[fieldName].errors;
};

// Função para verificar se um campo tem erro
const hasFieldError = (
  fieldName: string,
  validation: FormValidation | null
): boolean => {
  if (!validation || !validation.errors[fieldName]) return false;
  return !validation.errors[fieldName].isValid;
};

// Função para fazer registro
const handleRegister = async (event: FormSubmitEvent) => {
  event.preventDefault();

  // Limpar mensagens anteriores
  registerError.value = null;
  registerSuccess.value = false;
  isValidating.value = true;

  try {
    // Validar formulário
    const validation = await validateRegisterForm(registerForm.value);
    registerValidation.value = validation;

    if (!validation.isValid) {
      // Mostrar primeiro erro encontrado
      const firstFieldError = Object.values(validation.errors).find(
        (field) => !field.isValid
      );
      if (firstFieldError && firstFieldError.errors.length > 0) {
        registerError.value = firstFieldError.errors[0] ?? null;
      } else if (validation.globalErrors.length > 0) {
        registerError.value = validation.globalErrors[0] ?? null;
      }
      return;
    }

    // Se validação passou, tentar criar conta
    const result = await register(
      registerForm.value.email.trim(),
      registerForm.value.password
    );

    if (result.success) {
      registerSuccess.value = true;

      // Se há uma mensagem de erro (confirmação de email necessária)
      if (result.error) {
        registerError.value = result.error;
        // Limpar formulário
        registerForm.value = {
          email: "",
          password: "",
          confirmPassword: "",
        };
        return;
      }

      // Se o usuário foi criado e já está logado, redirecionar
      if (result.session) {
        setTimeout(async () => {
          await navigateTo("/");
        }, 1500);
      } else {
        // Usuário criado mas precisa confirmar email
        registerError.value = "Verifique seu email para ativar a conta.";
      }
    } else {
      registerError.value =
        result.error ?? "Erro ao criar conta. Tente novamente.";
    }
  } catch (err) {
    registerError.value =
      err instanceof Error ? err.message : "Erro inesperado. Tente novamente.";
  } finally {
    isValidating.value = false;
  }
};
</script>
