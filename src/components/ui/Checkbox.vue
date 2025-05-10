<template>
  <label class="inline-flex items-center gap-1 cursor-pointer select-none">
    <input type="checkbox" class="hidden h-4 w-4" :checked="checked" @change="handleChange" />
    <span
      :class="checked ? 'bg-primary-bg2 border-primary-bg2' : ' border-neutral-st1'"
      class="h-4 w-4 rounded-sm flex border-2 justify-center items-center"
      ><CheckIcon class="w-2.5 h-[7px]"
    /></span>
    {{ label }}
  </label>
</template>

<script setup lang="ts">
import CheckIcon from './icons/CheckIcon.vue'
const props = defineProps<{
  checked: boolean
  label: string
}>()

const emit = defineEmits<{
  (e: 'select', label: string): void
}>()

function handleChange() {
  emit('select', props.label)
}
</script>
