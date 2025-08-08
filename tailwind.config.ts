import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#F97316",        // Laranja principal
          primaryHover: "#EA580C",   // Hover
          primaryActive: "#C2410C",  // Ativo / clique
          secondary: "#181818",      // Preto profundo (ex: botões secundários)
          accent: "#FF7C00",         // Destaques vivos
        },
        background: {
          base: "#0F0F0F",           // Fundo geral (body)
          surface: "#1A1A1A",        // Cartões, inputs
          elevated: "#272727",       // Elementos em destaque
          overlay: "rgba(0, 0, 0, 0.5)", // Overlay modais
        },
        text: {
          base: "#FFFFFF",           // Texto padrão claro
          muted: "#A3A3A3",          // Texto desabilitado ou secundário
          inverted: "#0F0F0F",       // Texto escuro sobre fundos claros
          link: "#F97316",           // Links laranja
          onAccent: "#FFFFFF",       // Texto sobre cor vibrante
        },
        border: {
          DEFAULT: "#3F3F46",        // Bordas padrão
          subtle: "#2E2E2E",         // Inputs, componentes
          strong: "#52525B",         // Destaques de seção
        },
        semantic: {
          success: "#22C55E",        // Verde
          warning: "#FACC15",        // Amarelo
          error: "#EF4444",          // Vermelho
          info: "#3B82F6",           // Azul
        },
      },
    },
  },
  plugins: [],
};

export default config;
