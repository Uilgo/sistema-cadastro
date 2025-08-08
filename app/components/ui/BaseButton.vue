<template>
  <button :type="type" :class="buttonClasses" :disabled="disabled">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "BaseButton",
  props: {
    type: {
      type: String as PropType<"button" | "submit" | "reset">,
      default: "button",
    },
    variant: {
      type: String as PropType<"primary" | "secondary" | "outline">,
      default: "primary",
    },
    size: {
      type: String as PropType<"sm" | "md" | "lg">,
      default: "md",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      const baseClasses = [
        "font-semibold",
        "rounded-lg",
        "transition-all",
        "duration-200",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-offset-background-base",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "disabled:transform-none",
        "transform",
        "active:scale-95",
        "cursor-pointer",
      ];

      // Variantes de cor
      const variantClasses = {
        primary: [
          "bg-brand-primary",
          "hover:bg-brand-primaryHover",
          "active:bg-brand-primaryActive",
          "text-text-onAccent",
          "focus:ring-brand-primary",
          "shadow-lg",
          "hover:shadow-xl",
        ],
        secondary: [
          "bg-background-elevated",
          "hover:bg-background-surface",
          "active:bg-background-base",
          "text-text-base",
          "focus:ring-border-strong",
          "border",
          "border-border-subtle",
        ],
        outline: [
          "bg-transparent",
          "hover:bg-background-elevated",
          "active:bg-background-surface",
          "text-text-base",
          "border-2",
          "border-brand-primary",
          "hover:border-brand-primaryHover",
          "focus:ring-brand-primary",
        ],
      };

      // Tamanhos
      const sizeClasses = {
        sm: ["px-3", "py-2", "text-sm"],
        md: ["px-4", "py-3", "text-base"],
        lg: ["px-6", "py-4", "text-lg"],
      };

      return [
        ...baseClasses,
        ...variantClasses[this.variant],
        ...sizeClasses[this.size],
      ];
    },
  },
});
</script>
