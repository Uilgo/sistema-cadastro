# 🍞 Sistema de Toast - Vue Toastification

## 📋 Configuração Completa

O sistema de toast está configurado com:

- ✅ **Plugin configurado** (`app/plugins/toast.client.ts`)
- ✅ **Composable personalizado** (`app/composables/useToast.ts`)
- ✅ **Estilos dark theme** (`app/assets/css/toast.css`)
- ✅ **Integração no FormFuncionario** (exemplo de uso)

## 🚀 Como Usar

### Importar o Composable

```typescript
const toast = useToast();
```

### Tipos de Toast Disponíveis

#### 1. Toast de Sucesso ✅

```typescript
toast.success("Funcionário cadastrado com sucesso!");
toast.success("Operação realizada!", { timeout: 3000 });
```

#### 2. Toast de Erro ❌

```typescript
toast.error("Erro ao salvar dados!");
toast.error("Falha na conexão", { timeout: 8000 });
```

#### 3. Toast de Aviso ⚠️

```typescript
toast.warning("Atenção: Dados não salvos!");
toast.warning("Sessão expirando em 5 minutos");
```

#### 4. Toast de Informação ℹ️

```typescript
toast.info("Dados carregados com sucesso");
toast.info("Sistema atualizado para versão 2.0");
```

#### 5. Toast de Loading ⏳

```typescript
// Toast que não desaparece automaticamente
const loadingToast = toast.loading("Salvando dados...");

// Remover quando terminar
setTimeout(() => {
  toast.dismiss(loadingToast);
  toast.success("Dados salvos!");
}, 3000);
```

#### 6. Toast Customizado

```typescript
toast.custom("Mensagem personalizada", "success", {
  timeout: 5000,
  position: "bottom-right",
});
```

### Opções Avançadas

#### Configurações Personalizadas

```typescript
toast.success("Sucesso!", {
  timeout: 10000, // 10 segundos
  closeOnClick: false, // Não fechar ao clicar
  draggable: false, // Não arrastar
  position: "top-left", // Posição diferente
  hideProgressBar: true, // Esconder barra de progresso
});
```

#### Limpar Todos os Toasts

```typescript
toast.clear();
```

#### Remover Toast Específico

```typescript
const toastId = toast.info("Mensagem temporária");
setTimeout(() => {
  toast.dismiss(toastId);
}, 2000);
```

## 🎨 Estilos e Tema

### Cores Aplicadas (Tema Dark)

- **Fundo**: `#1A1A1A` (background-surface)
- **Texto**: `#FFFFFF` (text-base)
- **Bordas**: `#2E2E2E` (border-subtle)
- **Sucesso**: `#22C55E` (semantic-success)
- **Erro**: `#EF4444` (semantic-error)
- **Aviso**: `#FACC15` (semantic-warning)
- **Info**: `#3B82F6` (semantic-info)

### Posições Disponíveis

- `top-right` (padrão)
- `top-left`
- `top-center`
- `bottom-right`
- `bottom-left`
- `bottom-center`

## 📱 Exemplos Práticos

### Em Formulários

```typescript
// No submit do formulário
const handleSubmit = async () => {
  try {
    loading.value = true;

    // Validar dados
    if (!isValid) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    // Salvar dados
    await saveData();
    toast.success("Dados salvos com sucesso!");
  } catch (error) {
    toast.error("Erro ao salvar: " + error.message);
  } finally {
    loading.value = false;
  }
};
```

### Em Operações de API

```typescript
// Login
const handleLogin = async () => {
  const loadingToast = toast.loading("Fazendo login...");

  try {
    await login(credentials);
    toast.dismiss(loadingToast);
    toast.success("Login realizado com sucesso!");
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error("Credenciais inválidas");
  }
};
```

### Em Operações de CRUD

```typescript
// Deletar item
const handleDelete = async (id: string) => {
  try {
    await deleteItem(id);
    toast.success("Item removido com sucesso!");
  } catch (error) {
    toast.error("Erro ao remover item");
  }
};

// Atualizar lista
const handleRefresh = async () => {
  const loadingToast = toast.loading("Atualizando lista...");

  try {
    await fetchData();
    toast.dismiss(loadingToast);
    toast.info("Lista atualizada!");
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.warning("Erro ao atualizar lista");
  }
};
```

## ⚙️ Configurações Globais

### No Plugin (`app/plugins/toast.client.ts`)

```typescript
const options = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  maxToasts: 5,
  // ... outras configurações
};
```

### Timeouts Padrão por Tipo

- **Success**: 4 segundos
- **Error**: 6 segundos
- **Warning**: 5 segundos
- **Info**: 4 segundos
- **Loading**: Infinito (manual)

## 🔧 Personalização

### Adicionar Novos Tipos

```typescript
// No composable useToast.ts
const customType = (message: string, options?: any) => {
  toast(message, {
    type: "custom",
    icon: "🎉",
    className: "custom-toast",
    ...options,
  });
};
```

### Estilos Customizados

```css
/* No arquivo toast.css */
.custom-toast {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4) !important;
  border: none !important;
}
```

## 📋 Checklist de Implementação

- ✅ Plugin instalado e configurado
- ✅ Composable criado
- ✅ Estilos dark theme aplicados
- ✅ Exemplo no FormFuncionario
- ✅ Documentação completa
- ✅ Responsividade implementada
- ✅ Acessibilidade considerada

## 🎯 Próximos Passos

1. **Integrar em outros componentes** (LoginForm, FuncionariosTable, etc.)
2. **Adicionar toasts de confirmação** para ações destrutivas
3. **Implementar toasts de progresso** para uploads
4. **Criar toasts personalizados** para notificações específicas

O sistema está pronto para uso em todo o projeto! 🎉
