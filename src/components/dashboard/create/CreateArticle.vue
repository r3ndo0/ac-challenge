<template>
  <div class="p-6 flex gap-6 w-full h-full">
    <CreateArticleForm :loading="isPending" @submit="onSubmit" />
    <TagsForm v-model="selectedTags" @new-tag="prependTag" />
  </div>
</template>
<script setup lang="ts">
import TagsForm from './TagsForm.vue'
import CreateArticleForm from './ArticleForm.vue'
import { ref } from 'vue'
import type { NewArticle } from '@/schemas/NewArticleSchema'
import { useCreateArticle } from '@/composables/useArticles'
const selectedTags = ref<string[]>([])
function prependTag(tag: string) {
  selectedTags.value = [tag, ...selectedTags.value.filter((t) => t !== tag)]
}

const { mutate: createNewArticle, isPending } = useCreateArticle()

const onSubmit = (payload: NewArticle) => {
  createNewArticle({
    article: {
      ...payload,
      tagList: selectedTags.value,
    },
  })
}
</script>
