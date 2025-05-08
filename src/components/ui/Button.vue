<template>
  <button
    :class="[
      ' py-2.5 rounded-md text-sm font-medium text-white transition-colors duration-200 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'success' &&
        'bg-primary-bg2 hover:bg-primary-bg2-hover  disabled:bg-primary-bg2-disabled',
      variant === 'danger' && 'bg-error-bg2 hover:bg-error-bg2-hover  ',
      variant === 'outline' &&
        'border border-neutral-st2 hover:border-neutral-st2-hover text-gray-700 disabled:bg-neutral-st2-disabled',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'success', // Default to 'success' (green)
    validator: (value: string) => ['success', 'danger', 'outline'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>
