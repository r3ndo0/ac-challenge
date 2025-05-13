<template>
  <form @submit.prevent="onSubmit" class="w-full p-6 rounded-lg bg-white basis-1/3">
    <RegularInput name="tag" placeholder="New tag" label="Tags" class="mb-3" />
    <AcButton class="w-full mb-6">Add New Tag</AcButton>
    <ul class="flex p-4 border border-neutral-st3 rounded-2xl flex-col gap-2">
      <li v-for="tag in sortedTags" :key="tag">
        <AcCheckbox :checked="isChecked(tag)" :label="tag" @select="toggle" />
      </li>
    </ul>
  </form>
</template>

<script setup lang="ts">
import AcCheckbox from '@/components/ui/AcCheckbox.vue'
import RegularInput from '@/components/ui/RegularInput.vue'
import { useTags } from '@/composables/useTags'
import AcButton from '@/components/ui/AcButton.vue'
import { useForm } from 'vee-validate'
import { NewTagSchema } from '@/schemas/NewTagSchema'
import { useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
const selected = defineModel<string[]>({ default: [] })
const emit = defineEmits(['new-tag'])
const tagsQuery = useTags()
const sortedTags = computed(() => {
  const list = tagsQuery.data.value ?? []
  return [...list].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
})
const isChecked = (tag: string) => selected.value.includes(tag)
const { handleSubmit, resetForm } = useForm({
  validationSchema: NewTagSchema,
})
const queryClient = useQueryClient()

const onSubmit = handleSubmit(({ tag }) => {
  const newTag = tag.trim()
  if (!newTag) return

  emit('new-tag', newTag)

  queryClient.setQueryData<string[]>(['tags'], (old) =>
    old ? [newTag, ...old.filter((t) => t !== newTag)] : [newTag],
  )

  if (!selected.value.includes(newTag)) {
    selected.value.unshift(newTag)
  }

  resetForm()
})
function toggle(tag: string) {
  const next = new Set(selected.value)
  if (next.has(tag)) {
    next.delete(tag)
  } else {
    next.add(tag)
  }
  selected.value = [...next]
}
</script>
