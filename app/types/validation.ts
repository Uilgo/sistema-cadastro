// Tipos para validação
export interface ValidationRule {
  message: string;
  validator: (value: string) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FieldValidation {
  [key: string]: ValidationResult;
}

export interface FormValidation {
  isValid: boolean;
  errors: FieldValidation;
  globalErrors: string[];
}

// Tipos para validação de email
export interface EmailValidationOptions {
  checkFormat?: boolean;
  checkDisposable?: boolean;
  checkMxRecord?: boolean;
}

export interface EmailValidationResult {
  isValid: boolean;
  errors: string[];
  details: {
    format: boolean;
    disposable: boolean;
    mxRecord: boolean;
  };
}
