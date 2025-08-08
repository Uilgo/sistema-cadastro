<template>
  <div class="min-h-screen flex flex-col bg-background-base text-text-base">
    <Header />
    <main class="flex-1 p-6">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>
