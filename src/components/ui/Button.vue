<template>
  <button
    :class="[
      ' py-2.5 rounded-md text-sm font-medium  transition-colors duration-200 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'success' &&
        'bg-primary-bg2 hover:bg-primary-bg2-hover text-white disabled:bg-primary-bg2-disabled',
      variant === 'danger' && 'bg-error-bg2 text-white hover:bg-error-bg2-hover  ',
      variant === 'outline' &&
        'border border-neutral-st2 hover:border-[#B3B3B3] text-neutral-fg1 disabled:bg-neutral-st2-disabled',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <LoadingIcon v-if="loading" class="animate-spin m-auto" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import LoadingIcon from './icons/LoadingIcon.vue'
defineProps({
  variant: {
    type: String,
    default: 'success',
    validator: (value: string) => ['success', 'danger', 'outline'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>
