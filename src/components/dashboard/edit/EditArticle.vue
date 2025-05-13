<template>
  <div class="p-6 flex gap-6 w-full h-full">
    <ArticleForm
      :loading="isPending"
      v-if="status === 'success'"
      :initialValues="initialValues"
      @submit="onSubmit"
    />
    <div class="w-full px-6 bg-white basis-1/3 flex justify-center items-center">
      <p class="text-center">
        looks like RealWorld api does not provide a way to update tags associated with an article.
      </p>
    </div>
    <!-- <TagsForm v-model="selectedTags" @new-tag="prependTag" /> -->
  </div>
</template>
<script setup lang="ts">
import ArticleForm from '../create/ArticleForm.vue'
import { useSingleArticle, useUpdateArticle } from '@/composables/useArticles'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
interface FormData {
  title: string
  description: string
  body: string
}
const route = useRoute()
const slug = computed(() => route.params.slug as string | undefined)

const { data: article, status } = useSingleArticle(slug)
const { mutate: updateArticle, isPending } = useUpdateArticle()

const onSubmit = (payload: FormData) => {
  if (!slug.value) return
  updateArticle({ slug: slug.value, article: payload })
}

const initialValues = computed<{ title: string; description: string; body: string } | undefined>(
  () =>
    article.value
      ? {
          title: article.value.title,
          description: article.value.description,
          body: article.value.body,
        }
      : undefined,
)
</script>
