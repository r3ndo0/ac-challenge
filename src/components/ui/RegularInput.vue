<template>
  <div class="relative flex flex-col gap-2 mb-3">
    <label class="text-neutral-fg1 text-[14px]" :for="label">{{ label }}</label>
    <input
      v-if="as === 'input'"
      :disabled="disabled"
      :id="label"
      v-model="value"
      :class="errors.length ? 'border-error-fg1' : ' border-neutral-st2'"
      class="bg-white outline-none text-neutral-fg1 rounded-lg border p-2"
      :name="name"
      :type="type"
      :placeholder="placeholder"
    />
    <textarea
      v-else
      :disabled="disabled"
      :id="label"
      v-model="value"
      :class="errors.length ? 'border-error-fg1' : ' border-neutral-st2'"
      class="bg-white outline-none min-h-[140px] text-neutral-fg1 rounded-lg border p-2"
      :name="name"
      :type="type"
      :placeholder="placeholder"
    />
    <p v-if="errors.length" class="text-[12px] text-error-fg1">
      {{ errors[0] }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  label: String,
  name: {
    type: String,
    default: '',
  },
  placeholder: String,
  as: {
    type: String,
    default: 'input',
    validator: (value: string) => {
      return ['input', 'textarea'].includes(value)
    },
  },
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => ['text', 'password', 'number'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const { value, errors } = useField<string>(() => props.name)
</script>
