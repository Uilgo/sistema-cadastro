import { useToast as useVueToastification } from "vue-toastification";

export const useToast = () => {
  const toast = useVueToastification();

  return {
    // Toast de sucesso
    success: (message: string, options?: any) => {
      toast.success(message, {
        icon: "✅",
        ...options,
      });
    },

    // Toast de erro
    error: (message: string, options?: any) => {
      toast.error(message, {
        icon: "❌",
        ...options,
      });
    },

    // Toast de aviso
    warning: (message: string, options?: any) => {
      toast.warning(message, {
        icon: "⚠️",
        ...options,
      });
    },

    // Toast de informação
    info: (message: string, options?: any) => {
      toast.info(message, {
        icon: "ℹ️",
        ...options,
      });
    },

    // Toast customizado
    custom: (
      message: string,
      type: "success" | "error" | "warning" | "info" = "info",
      options?: any
    ) => {
      toast[type](message, options);
    },

    // Limpar todos os toasts
    clear: () => {
      toast.clear();
    },

    // Toast de loading (personalizado)
    loading: (message: string = "Carregando...", options?: any) => {
      return toast.info(message, {
        icon: "⏳",
        timeout: false, // Não remove automaticamente
        closeOnClick: false,
        draggable: false,
        ...options,
      });
    },

    // Remover toast específico
    dismiss: (toastId: any) => {
      toast.dismiss(toastId);
    },
  };
};
