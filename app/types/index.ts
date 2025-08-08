// Re-exportar todos os tipos para facilitar importação
export * from "./auth";
export * from "./components";
export * from "./validation";
export * from "./routes";
export * from "./funcionarios";

// Tipos utilitários globais
export type Maybe<T> = T | null | undefined;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
