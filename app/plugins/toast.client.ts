import { createApp } from "vue";
import Toast, { POSITION, TYPE } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  // Configurações do toast
  const options = {
    // Posição dos toasts
    position: POSITION.TOP_RIGHT,

    // Timeout padrão (5 segundos)
    timeout: 5000,

    // Permitir fechar clicando
    closeOnClick: true,

    // Pausar quando hover
    pauseOnFocusLoss: true,
    pauseOnHover: true,

    // Arrastar para fechar
    draggable: true,
    draggablePercent: 0.6,

    // Mostrar barra de progresso
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",

    // Ícones
    icon: true,

    // Máximo de toasts na tela
    maxToasts: 5,

    // Transições
    transition: "Vue-Toastification__bounce",

    // Estilos customizados para tema dark
    toastDefaults: {
      [TYPE.SUCCESS]: {
        timeout: 4000,
        closeButton: false,
      },
      [TYPE.ERROR]: {
        timeout: 6000,
        closeButton: true,
      },
      [TYPE.WARNING]: {
        timeout: 5000,
        closeButton: true,
      },
      [TYPE.INFO]: {
        timeout: 4000,
        closeButton: false,
      },
    },
  };

  // Registrar o plugin
  nuxtApp.vueApp.use(Toast, options);
});
