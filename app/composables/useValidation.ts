import type {
  FormValidation,
  FieldValidation,
  LoginForm,
  RegisterForm,
} from "~/types";
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validatePasswordConfirmation,
  sanitizeInput,
} from "~/utils/validation";

export const useValidation = () => {
  // Validar formulário de login
  const validateLoginForm = async (
    form: LoginForm
  ): Promise<FormValidation> => {
    const errors: FieldValidation = {};
    const globalErrors: string[] = [];

    // Validar email
    const emailValidation = await validateEmail(sanitizeInput(form.email), {
      checkFormat: true,
      checkDisposable: true,
      checkMxRecord: false,
    });

    errors.email = emailValidation;

    // Validar senha
    const passwordValidation = validateRequired(form.password, "Senha");
    errors.password = passwordValidation;

    // Verificar se há erros globais
    if (!emailValidation.isValid || !passwordValidation.isValid) {
      globalErrors.push(
        "Por favor, corrija os erros abaixo antes de continuar"
      );
    }

    const isValid =
      Object.values(errors).every((field) => field.isValid) &&
      globalErrors.length === 0;

    return {
      isValid,
      errors,
      globalErrors,
    };
  };

  // Validar formulário de registro
  const validateRegisterForm = async (
    form: RegisterForm
  ): Promise<FormValidation> => {
    const errors: FieldValidation = {};
    const globalErrors: string[] = [];

    // Validar email
    const emailValidation = await validateEmail(sanitizeInput(form.email), {
      checkFormat: true,
      checkDisposable: true,
      checkMxRecord: false,
    });

    errors.email = emailValidation;

    // Validar senha
    const passwordValidation = validatePassword(form.password);
    errors.password = passwordValidation;

    // Validar confirmação de senha
    const confirmPasswordValidation = validatePasswordConfirmation(
      form.password,
      form.confirmPassword
    );
    errors.confirmPassword = confirmPasswordValidation;

    // Verificar se há erros globais
    if (
      !emailValidation.isValid ||
      !passwordValidation.isValid ||
      !confirmPasswordValidation.isValid
    ) {
      globalErrors.push(
        "Por favor, corrija os erros abaixo antes de continuar"
      );
    }

    const isValid =
      Object.values(errors).every((field) => field.isValid) &&
      globalErrors.length === 0;

    return {
      isValid,
      errors,
      globalErrors,
    };
  };

  // Validar campo individual (para validação em tempo real)
  const validateField = async (
    fieldName: string,
    value: string,
    form?: any
  ): Promise<FieldValidation> => {
    const errors: FieldValidation = {};

    switch (fieldName) {
      case "email":
        errors.email = await validateEmail(sanitizeInput(value), {
          checkFormat: true,
          checkDisposable: true,
          checkMxRecord: false,
        });
        break;

      case "password":
        errors.password = validatePassword(value);
        break;

      case "confirmPassword":
        if (form && form.password) {
          errors.confirmPassword = validatePasswordConfirmation(
            form.password,
            value
          );
        } else {
          errors.confirmPassword = validateRequired(
            value,
            "Confirmação de senha"
          );
        }
        break;

      default:
        errors[fieldName] = validateRequired(value, fieldName);
    }

    return errors;
  };

  return {
    validateLoginForm,
    validateRegisterForm,
    validateField,
  };
};
