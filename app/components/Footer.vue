<template>
  <footer class="bg-background-elevated border-t border-border-subtle mt-auto">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="text-center">
        <p
          class="text-sm text-text-muted flex items-center justify-center gap-2"
        >
          Feito com
          <HeartIcon class="w-4 h-4 text-semantic-error animate-pulse" />
          - © {{ new Date().getFullYear() }} Sistema de Cadastro
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/24/solid";
</script>
