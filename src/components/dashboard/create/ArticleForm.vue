<template>
  <form @submit="onSubmit" class="w-full rounded-lg basis-2/3 h-full bg-white">
    <div class="py-6 px-[38px] border-b border-neutral-st3 text-lg font-semibold">New article</div>
    <div class="p-6">
      <RegularInput name="title" label="Title" placeholder="Title" as="input" />
      <RegularInput name="description" label="Description" placeholder="Description" as="input" />
      <RegularInput name="body" label="Body" placeholder="" as="textarea" />
      <Button :loading="loading" :disabled="loading" class="mt-6 px-4">Submit</Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import RegularInput from '@/components/ui/RegularInput.vue'
import Button from '@/components/ui/Button.vue'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import { NewArticleSchema, type NewArticle } from '@/schemas/NewArticleSchema'

interface Props {
  initialValues?: {
    title: string
    description: string
    body: string
  }
  loading: boolean
}
const props = defineProps<Props>()

const { handleSubmit, resetForm, values } = useForm<NewArticle>({
  validationSchema: NewArticleSchema,
})

watch(
  () => props.initialValues,
  (vals) => {
    if (vals) resetForm({ values: props.initialValues })
  },
  { immediate: true },
)

const emit = defineEmits<{
  (e: 'submit', payload: NewArticle): void
}>()

const onSubmit = handleSubmit((values) => emit('submit', values))
</script>
