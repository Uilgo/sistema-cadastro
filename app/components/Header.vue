<template>
  <header class="bg-background-surface border-b border-border-subtle shadow-lg">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo/Brand -->
        <div class="flex items-center gap-3">
          <div class="bg-brand-primary p-2 rounded-lg">
            <BuildingOfficeIcon class="w-6 h-6 text-text-onAccent" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-text-base">
              Sistema de Cadastro
            </h1>
            <p class="text-xs text-text-muted">Gestão de Funcionários</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center gap-6">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-text-base hover:bg-background-elevated hover:text-brand-primary transition-all duration-200"
          >
            <HomeIcon class="w-4 h-4" />
            Início
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primaryHover text-text-onAccent rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowRightOnRectangleIcon class="w-4 h-4" />
            Login
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  BuildingOfficeIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
</script>
