<template>
  <div
    class="h-screen bg-gradient-to-br from-background-base to-background-elevated flex items-center justify-center p-4 overflow-hidden"
  >
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-text-base mb-2">Bem-vindo</h1>
        <p class="text-text-muted">Entre na sua conta ou crie uma nova</p>
      </div>

      <LoginForm />
    </div>
  </div>
</template>

<script setup>
// Remove o layout padrão e aplica middleware guest
definePageMeta({
  layout: false,
  middleware: "guest",
});

// Configurações da página
useHead({
  title: "Login - Minha App",
  meta: [{ name: "description", content: "Página de login e cadastro" }],
});
</script>
