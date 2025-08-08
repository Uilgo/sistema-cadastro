# Sistema de Cadastro de Funcionários

Sistema completo de CRUD (Create, Read, Update, Delete) para gerenciamento de funcionários, desenvolvido com Nuxt 4, TypeScript, Tailwind CSS e Supabase.

## 🚀 Funcionalidades

- ✅ **Autenticação** - Login e registro de usuários
- ✅ **Dashboard** - Visualização geral dos funcionários
- ✅ **Cadastro** - Adicionar novos funcionários
- ✅ **Edição** - Modificar dados existentes
- ✅ **Exclusão** - Remover funcionários com confirmação
- ✅ **Validação** - Formulários com validação completa
- ✅ **Responsivo** - Interface adaptável para todos os dispositivos
- ✅ **Toast Notifications** - Feedback visual para ações

## 🛠️ Tecnologias

- **Nuxt 4** - Framework Vue.js
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Backend e autenticação
- **Vue 3** - Framework reativo
- **Heroicons** - Ícones

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do Supabase:

```env
SUPABASE_URL=sua_url_do_supabase_aqui
SUPABASE_KEY=sua_chave_publica_do_supabase_aqui
```

### 2. Criação da Tabela no Supabase

Execute o seguinte SQL no editor do Supabase para criar a tabela de funcionários:

```sql
create table public.funcionarios (
  id serial not null,
  nome text not null,
  cargo text null,
  endereco text null,
  email text null,
  salario numeric(10, 2) null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint funcionarios_pkey primary key (id),
  constraint funcionarios_email_key unique (email)
) TABLESPACE pg_default;
```

### 3. Dados de Exemplo

Para popular a tabela com dados de teste, execute:

```sql
INSERT INTO funcionarios (nome, cargo, endereco, email, salario)
VALUES
  ('Roberto Lima', 'Engenheiro de Software', 'Rua das Palmeiras, 55 - Porto Alegre/RS', 'roberto.lima@email.com', 9200.00),
  ('Fernanda Alves', 'Coordenadora de Marketing', 'Av. Atlântica, 2500 - Rio de Janeiro/RJ', 'fernanda.alves@email.com', 7800.50),
  ('Paulo Santos', 'Técnico de Suporte', 'Rua das Acácias, 88 - Salvador/BA', 'paulo.santos@email.com', 3800.00),
  ('Tatiane Ferreira', 'Analista Financeiro', 'Rua XV de Novembro, 120 - Florianópolis/SC', 'tatiane.ferreira@email.com', 6400.25),
  ('Ricardo Souza', 'Desenvolvedor Front-End', 'Av. Independência, 900 - Recife/PE', 'ricardo.souza@email.com', 7000.00);
```

## 🏃‍♂️ Como Executar

### Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Executar em modo de desenvolvimento
pnpm dev
```

### Produção

```bash
# Fazer build
pnpm build

# Executar em produção
pnpm start
```

## 📁 Estrutura do Projeto

```
app/
├── components/
│   ├── ui/                          # Componentes base
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   └── BaseDropdown.vue
│   │
│   ├── layout/                      # Componentes de layout
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── DashboardLayout.vue
│   │
│   ├── funcionarios/                # Componentes de funcionários
│   │   ├── FuncionariosTable.vue
│   │   ├── FormFuncionario.vue
│   │   └── ModalDeleteFuncionario.vue
│   │
│   └── LoginForm.vue                # Componente de login
│
├── composables/
│   ├── auth/                        # Composables de autenticação
│   │   └── useAuth.ts
│   │
│   ├── funcionarios/                # Composables de funcionários
│   │   └── useFuncionarios.ts
│   │
│   └── ui/                          # Composables de UI
│       ├── useToast.ts
│       └── useValidation.ts
│
├── pages/
│   ├── funcionario/
│   │   └── [id].vue                 # Página de edição
│   │
│   ├── index.vue                    # Dashboard
│   ├── login.vue                    # Página de login
│   └── novoCadastro.vue             # Página de cadastro
│
├── types/                           # Definições de tipos
├── utils/                           # Utilitários
├── middleware/                      # Middlewares de rota
└── plugins/                         # Plugins do Nuxt
```

## 🎯 Funcionalidades Detalhadas

### Autenticação

- Login com email e senha
- Registro de novos usuários
- Proteção de rotas
- Logout seguro

### Gerenciamento de Funcionários

- **Listagem** - Tabela com todos os funcionários
- **Cadastro** - Formulário completo com validação
- **Edição** - Modificar dados existentes
- **Exclusão** - Modal de confirmação antes de deletar

### Validações

- Campos obrigatórios
- Formato de email
- Valores numéricos para salário
- Sanitização de dados

### Interface

- Design moderno e responsivo
- Feedback visual com toasts
- Loading states
- Estados de erro tratados

## 🔧 Comandos Úteis

```bash
# Instalar dependências
pnpm install

# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview

# Linting
pnpm lint

# Limpar cache
rm -rf .nuxt .output
```

## 📝 Notas Importantes

1. **Configuração do Supabase**: Certifique-se de configurar as políticas RLS (Row Level Security) no Supabase conforme necessário
2. **Variáveis de Ambiente**: Nunca commite o arquivo `.env` com credenciais reais
3. **Tipos**: O sistema usa TypeScript para maior segurança de tipos
4. **Responsividade**: A interface é totalmente responsiva e funciona em dispositivos móveis

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido com ❤️ usando Nuxt 3 e Supabase
