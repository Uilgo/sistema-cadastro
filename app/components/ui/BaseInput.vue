<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-text-base text-sm font-medium">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="actualType"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="onInput"
        class="w-full bg-background-surface border border-border-subtle text-text-base px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 placeholder:text-text-muted"
        :class="{ 'pr-10': type === 'password' }"
      />

      <!-- Botão do olhinho para senha -->
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-base transition-colors cursor-pointer"
      >
        <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
        <EyeIcon v-else class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

export default defineComponent({
  name: "BaseInput",
  components: {
    EyeIcon,
    EyeSlashIcon,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    actualType() {
      if (this.type === "password" && this.showPassword) {
        return "text";
      }
      return this.type;
    },
  },
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        this.$emit("update:modelValue", target.value);
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
});
</script>
