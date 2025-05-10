<template>
  <form @submit.prevent="onSubmit" class="w-full p-6 rounded-lg bg-white basis-1/3">
    <RegularInput name="tag" placeholder="New tag" label="Tags" class="mb-3" />
    <Button class="w-full mb-6">Add New Tag</Button>
    <ul class="flex p-4 border border-neutral-st3 rounded-2xl flex-col gap-2">
      <li v-for="tag in tags" :key="tag">
        <Checkbox :checked="isChecked(tag)" :label="tag" @select="toggle" />
      </li>
    </ul>
  </form>
</template>

<script setup lang="ts">
import Checkbox from '@/components/ui/Checkbox.vue'
import RegularInput from '@/components/ui/RegularInput.vue'
import { useAddTag, useTags } from '@/composables/useTags'
import Button from '@/components/ui/Button.vue'
import { useForm } from 'vee-validate'
import { NewTagSchema } from '@/schemas/NewTagScgena'
import { useQueryClient } from '@tanstack/vue-query'
const selected = defineModel<string[]>({ default: [] })
const emit = defineEmits(['new-tag'])
const { data: tags = [], isLoading, error } = useTags()
const { mutate } = useAddTag()
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
  selected.value = isChecked(tag)
    ? selected.value.filter((t) => t !== tag)
    : [...selected.value, tag]
}
</script>
