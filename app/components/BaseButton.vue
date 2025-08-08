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
        "focus:ring-offset-gray-900",
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
          "bg-orange-500",
          "hover:bg-orange-600",
          "active:bg-orange-700",
          "text-white",
          "focus:ring-orange-500",
          "shadow-lg",
          "hover:shadow-xl",
        ],
        secondary: [
          "bg-gray-800",
          "hover:bg-gray-700",
          "active:bg-gray-900",
          "text-white",
          "focus:ring-gray-500",
          "border",
          "border-gray-600",
        ],
        outline: [
          "bg-transparent",
          "hover:bg-gray-800",
          "active:bg-gray-700",
          "text-white",
          "border-2",
          "border-orange-500",
          "hover:border-orange-600",
          "focus:ring-orange-500",
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
