<template>
  <div
    class="bg-background-surface rounded-xl shadow-xl border border-border-subtle p-6"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Nome -->
      <div>
        <label for="nome" class="block text-sm font-medium text-text-base mb-2">
          Nome *
        </label>
        <BaseInput
          id="nome"
          v-model="form.nome"
          type="text"
          placeholder="Digite o nome completo"
          required
          :class="{ 'border-semantic-error': hasFieldError('nome') }"
          @blur="handleFieldBlur('nome')"
        />
        <!-- Erros do campo nome -->
        <div
          v-if="hasFieldError('nome')"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors('nome')"
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

      <!-- Cargo -->
      <div>
        <label
          for="cargo"
          class="block text-sm font-medium text-text-base mb-2"
        >
          Cargo *
        </label>
        <BaseDropdown
          v-model="form.cargo"
          :options="cargoOptions"
          placeholder="Selecione um cargo"
          :button-class="hasFieldError('cargo') ? 'border-semantic-error' : ''"
          @update:model-value="handleCargoChange"
        />
        <!-- Erros do campo cargo -->
        <div
          v-if="hasFieldError('cargo')"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors('cargo')"
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

      <!-- Endereço -->
      <div>
        <label
          for="endereco"
          class="block text-sm font-medium text-text-base mb-2"
        >
          Endereço *
        </label>
        <BaseInput
          id="endereco"
          v-model="form.endereco"
          type="text"
          placeholder="Digite o endereço completo"
          required
          :class="{ 'border-semantic-error': hasFieldError('endereco') }"
          @blur="handleFieldBlur('endereco')"
        />
        <!-- Erros do campo endereço -->
        <div
          v-if="hasFieldError('endereco')"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors('endereco')"
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

      <!-- Email -->
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-text-base mb-2"
        >
          Email *
        </label>
        <BaseInput
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Digite o email"
          required
          :class="{ 'border-semantic-error': hasFieldError('email') }"
          @blur="handleFieldBlur('email')"
        />
        <!-- Erros do campo email -->
        <div
          v-if="hasFieldError('email')"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors('email')"
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

      <!-- Salário -->
      <div>
        <label
          for="salario"
          class="block text-sm font-medium text-text-base mb-2"
        >
          Salário *
        </label>
        <BaseInput
          id="salario"
          v-model="form.salario"
          type="number"
          step="0.01"
          placeholder="Digite o salário (ex: 5000.00)"
          required
          :class="{ 'border-semantic-error': hasFieldError('salario') }"
          @blur="handleFieldBlur('salario')"
        />
        <!-- Erros do campo salário -->
        <div
          v-if="hasFieldError('salario')"
          class="mt-1 text-sm text-semantic-error"
        >
          <div
            v-for="error in getFieldErrors('salario')"
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

      <!-- Botão de Ação -->
      <div class="flex justify-end pt-4">
        <BaseButton type="submit" :disabled="loading" class="min-w-32">
          <span v-if="loading">Salvando...</span>
          <span v-else>{{ isNovo ? "Salvar" : "Editar" }}</span>
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type {
  FuncionarioInsert,
  FormValidation,
  ValidationResult,
} from "~/types";
import {
  validateRequired,
  validateEmail,
  sanitizeInput,
} from "~/utils/validation";

// Props
interface Props {
  isNovo?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isNovo: true,
});

// Composables
const { insertFuncionario } = useFuncionarios();

// Estado do formulário (usando strings para compatibilidade com BaseInput)
const form = ref({
  nome: "",
  cargo: "",
  endereco: "",
  email: "",
  salario: "",
});

const loading = ref(false);
const errors = ref<{ [key: string]: string[] }>({});
const isValidating = ref(false);

// Opções de cargo para o dropdown
const cargoOptions = [
  { value: "Engenheiro de Software", label: "Engenheiro de Software" },
  { value: "Coordenadora de Marketing", label: "Coordenadora de Marketing" },
  { value: "Técnico de Suporte", label: "Técnico de Suporte" },
  { value: "Analista Financeiro", label: "Analista Financeiro" },
  { value: "Desenvolvedor Front-End", label: "Desenvolvedor Front-End" },
  { value: "Gerente de Projetos", label: "Gerente de Projetos" },
  { value: "Desenvolvedor Back-End", label: "Desenvolvedor Back-End" },
  { value: "Designer Gráfico", label: "Designer Gráfico" },
  { value: "Analista de Dados", label: "Analista de Dados" },
  { value: "Assistente Administrativo", label: "Assistente Administrativo" },
];

// Função para validar um campo específico
const validateField = async (
  fieldName: string,
  value: string
): Promise<ValidationResult> => {
  switch (fieldName) {
    case "nome":
      return validateRequired(value, "Nome");

    case "cargo":
      return validateRequired(value, "Cargo");

    case "endereco":
      return validateRequired(value, "Endereço");

    case "email":
      // Email é obrigatório
      if (!value.trim()) {
        return { isValid: false, errors: ["Email é obrigatório"] };
      }
      const emailValidation = await validateEmail(sanitizeInput(value), {
        checkFormat: true,
        checkDisposable: true,
        checkMxRecord: false,
      });
      return {
        isValid: emailValidation.isValid,
        errors: emailValidation.errors,
      };

    case "salario":
      // Salário é obrigatório
      if (!value.trim()) {
        return { isValid: false, errors: ["Salário é obrigatório"] };
      }
      const salarioNum = parseFloat(value);
      if (isNaN(salarioNum) || salarioNum < 0) {
        return {
          isValid: false,
          errors: ["Salário deve ser um número válido e positivo"],
        };
      }
      if (salarioNum > 999999.99) {
        return {
          isValid: false,
          errors: ["Salário deve ser menor que R$ 999.999,99"],
        };
      }
      return { isValid: true, errors: [] };

    default:
      return { isValid: true, errors: [] };
  }
};

// Função para validar todo o formulário
const validateForm = async (): Promise<boolean> => {
  isValidating.value = true;
  const newErrors: { [key: string]: string[] } = {};
  let isValid = true;

  // Validar cada campo
  for (const [fieldName, value] of Object.entries(form.value)) {
    const validation = await validateField(fieldName, value);
    if (!validation.isValid) {
      newErrors[fieldName] = validation.errors;
      isValid = false;
    }
  }

  errors.value = newErrors;
  isValidating.value = false;
  return isValid;
};

// Função para validar campo em tempo real
const handleFieldBlur = async (fieldName: string) => {
  const value = form.value[fieldName as keyof typeof form.value];
  const validation = await validateField(fieldName, value);

  if (!validation.isValid) {
    errors.value = { ...errors.value, [fieldName]: validation.errors };
  } else {
    const newErrors = { ...errors.value };
    delete newErrors[fieldName];
    errors.value = newErrors;
  }
};

// Função para verificar se um campo tem erro
const hasFieldError = (fieldName: string): boolean => {
  return !!(errors.value[fieldName] && errors.value[fieldName].length > 0);
};

// Função para obter erros de um campo
const getFieldErrors = (fieldName: string): string[] => {
  return errors.value[fieldName] || [];
};

// Função para lidar com mudança no dropdown de cargo
const handleCargoChange = async (value: string) => {
  form.value.cargo = value;
  // Validar o campo após a mudança
  await handleFieldBlur("cargo");
};

// Função para lidar com o submit
const handleSubmit = async () => {
  loading.value = true;

  try {
    // Validar formulário
    const isFormValid = await validateForm();

    if (!isFormValid) {
      loading.value = false; // Importante: resetar loading se há erros
      console.log("Formulário inválido! Erros:", errors.value);
      return; // Não prosseguir se há erros
    }

    console.log("Formulário válido! Prosseguindo...");

    // Converter dados do formulário para o tipo correto
    const funcionarioData: FuncionarioInsert = {
      nome: form.value.nome.trim(),
      cargo: form.value.cargo.trim() || null,
      endereco: form.value.endereco.trim() || null,
      email: form.value.email.trim() || null,
      salario: form.value.salario ? parseFloat(form.value.salario) : null,
    };

    const toast = useToast();

    if (props.isNovo) {
      // Salvar novo funcionário no Supabase
      const result = await insertFuncionario(funcionarioData);

      if (result.success) {
        toast.success("Funcionário cadastrado com sucesso!");

        // Limpar formulário após sucesso
        form.value = {
          nome: "",
          cargo: "",
          endereco: "",
          email: "",
          salario: "",
        };
        errors.value = {};
      } else {
        throw new Error(result.error || "Erro ao cadastrar funcionário");
      }
    } else {
      // TODO: Implementar lógica de edição
      toast.info("Funcionalidade de edição será implementada em breve");
    }
  } catch (error) {
    console.error("Erro ao processar formulário:", error);

    // Usar toast para feedback de erro
    const toast = useToast();
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro inesperado ao processar formulário";
    toast.error(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>
