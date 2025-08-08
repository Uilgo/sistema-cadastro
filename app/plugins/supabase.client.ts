import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Criar cliente Supabase
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string
  );

  // Disponibilizar globalmente
  return {
    provide: {
      supabase,
    },
  };
});
