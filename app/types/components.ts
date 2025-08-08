// Tipos para componentes base
export interface BaseInputProps {
  modelValue: string;
  id?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export interface BaseButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

// Tipos para eventos
export interface FormSubmitEvent extends Event {
  preventDefault(): void;
}
