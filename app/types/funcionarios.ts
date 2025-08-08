// Tipos para a tabela funcionários
export interface Funcionario {
  id: number;
  nome: string;
  cargo?: string | null;
  endereco?: string | null;
  email?: string | null;
  salario?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// Tipo para inserção (sem id, created_at, updated_at que são gerados automaticamente)
export interface FuncionarioInsert {
  nome: string;
  cargo?: string | null;
  endereco?: string | null;
  email?: string | null;
  salario?: number | null;
}

// Tipo para atualização (todos os campos opcionais exceto id)
export interface FuncionarioUpdate {
  nome?: string;
  cargo?: string | null;
  endereco?: string | null;
  email?: string | null;
  salario?: number | null;
}

// Tipo para resposta da API
export interface FuncionariosResponse {
  success: boolean;
  data?: Funcionario[];
  error?: string | null;
}
