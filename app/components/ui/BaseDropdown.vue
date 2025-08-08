<template>
  <div class="relative">
    <Listbox v-model="selectedValue" @update:model-value="handleChange">
      <div class="relative">
        <ListboxButton
          :class="[
            'relative w-full cursor-pointer rounded-lg bg-background-surface border border-border-subtle py-3 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            buttonClass,
          ]"
          :disabled="disabled"
        >
          <span
            :class="[
              'block truncate',
              selectedValue ? 'text-text-base' : 'text-text-muted',
            ]"
          >
            {{ selectedValue || placeholder }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-text-muted"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-background-surface border border-border-subtle py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-brand-primary text-text-onAccent'
                    : 'text-text-base',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors duration-150',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ option.label }}
                </span>
                <span
                  v-if="selected"
                  :class="[
                    active ? 'text-text-onAccent' : 'text-brand-primary',
                    'absolute inset-y-0 left-0 flex items-center pl-3',
                  ]"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

// Props
interface Props {
  modelValue: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  buttonClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Selecione uma opção",
  disabled: false,
  buttonClass: "",
});

// Emits
interface Emits {
  "update:modelValue": [value: string];
}

const emit = defineEmits<Emits>();

// Estado interno
const selectedValue = ref(props.modelValue);

// Função para lidar com mudanças
const handleChange = (value: string) => {
  selectedValue.value = value;
  emit("update:modelValue", value);
};

// Watch para sincronizar com prop externa
watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  }
);
</script>
