import type {
  ValidationResult,
  EmailValidationResult,
  EmailValidationOptions,
} from "~/types";

// Lista de domínios de email descartáveis (alguns exemplos)
const DISPOSABLE_EMAIL_DOMAINS = [
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "tempmail.org",
  "yopmail.com",
  "temp-mail.org",
  "throwaway.email",
  "maildrop.cc",
  "sharklasers.com",
  "guerrillamailblock.com",
  "pokemail.net",
  "spam4.me",
  "bccto.me",
  "chacuo.net",
  "dispostable.com",
  "fakeinbox.com",
];

// Validação de formato de email
export const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Verificar se é email descartável
export const isDisposableEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? DISPOSABLE_EMAIL_DOMAINS.includes(domain) : false;
};

// Validação de senha
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];

  if (!password) {
    errors.push("Senha é obrigatória");
  } else {
    if (password.length < 6) {
      errors.push("Senha deve ter pelo menos 6 caracteres");
    }
    if (password.length > 128) {
      errors.push("Senha deve ter no máximo 128 caracteres");
    }
    if (!/[A-Za-z]/.test(password)) {
      errors.push("Senha deve conter pelo menos uma letra");
    }
    if (!/\d/.test(password)) {
      errors.push("Senha deve conter pelo menos um número");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validação completa de email
export const validateEmail = async (
  email: string,
  options: EmailValidationOptions = {}
): Promise<EmailValidationResult> => {
  const {
    checkFormat = true,
    checkDisposable = true,
    checkMxRecord = false, // Desabilitado por padrão pois requer API externa
  } = options;

  const errors: string[] = [];
  const details = {
    format: true,
    disposable: true,
    mxRecord: true,
  };

  // Verificar se email foi fornecido
  if (!email) {
    errors.push("Email é obrigatório");
    return {
      isValid: false,
      errors,
      details: { format: false, disposable: false, mxRecord: false },
    };
  }

  // Verificar formato
  if (checkFormat && !isValidEmailFormat(email)) {
    errors.push("Formato de email inválido");
    details.format = false;
  }

  // Verificar se é descartável
  if (checkDisposable && isDisposableEmail(email)) {
    errors.push("Emails descartáveis não são permitidos");
    details.disposable = false;
  }

  // Verificar MX record (simulado - em produção usaria uma API)
  if (checkMxRecord) {
    // Em produção, você faria uma chamada para uma API de validação de email
    // Por enquanto, vamos simular que emails com domínios conhecidos são válidos
    const domain = email.split("@")[1]?.toLowerCase();
    const validDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
    ];

    if (domain && !validDomains.includes(domain)) {
      // Simular verificação MX - em produção seria uma chamada real
      console.log(`Verificando MX record para: ${domain}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    details,
  };
};

// Validação de campo obrigatório
export const validateRequired = (
  value: string,
  fieldName: string
): ValidationResult => {
  const errors: string[] = [];

  if (!value || value.trim() === "") {
    errors.push(`${fieldName} é obrigatório`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validação de confirmação de senha
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  const errors: string[] = [];

  if (!confirmPassword) {
    errors.push("Confirmação de senha é obrigatória");
  } else if (password !== confirmPassword) {
    errors.push("Senhas não coincidem");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Sanitizar entrada de texto
export const sanitizeInput = (input: string): string => {
  return input.trim().toLowerCase();
};
