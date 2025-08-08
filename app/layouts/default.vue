<template>
  <div
    class="h-screen flex flex-col bg-background-base text-text-base overflow-hidden"
  >
    <!-- Header fixo -->
    <Header class="flex-shrink-0" />

    <!-- Conteúdo principal com scroll -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-6">
        <slot />
      </div>
    </main>

    <!-- Footer fixo -->
    <Footer class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
// Os componentes serão auto-importados pelo Nuxt
// Header -> components/layout/Header.vue
// Footer -> components/layout/Footer.vue
</script>
