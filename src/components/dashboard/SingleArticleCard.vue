<template>
  <article :key="item.slug" class="border border-neutral-st3 rounded-lg p-4 flex flex-col gap-2">
    <header class="flex items-center justify-between text-[13px]">
      <span class="font-semibold">{{ index }}.</span>
      <time class="text-neutral-fg2">{{ formatDate(item.createdAt) }}</time>
    </header>

    <h3 class="font-semibold">{{ item.title }}</h3>
    <p class="text-neutral-fg2 text-[13px]">@{{ item.author.username }}</p>

    <p class="text-[13px] leading-5 line-clamp-3">
      {{ firstWords(item.body, 20) }}
    </p>

    <div class="flex flex-wrap gap-1">
      <span v-for="t in item.tagList" :key="t" class="bg-neutral-bg2 rounded px-1.5 text-[12px]">{{
        t
      }}</span>
    </div>

    <footer class="flex gap-6 mt-3 justify-end">
      <AcButton
        class="w-full"
        variant="outline"
        @click="router.push(`/articles/edit/${item.slug}`)"
      >
        Edit
      </AcButton>
      <AcButton
        @click="() => deleteArticle(item.slug)"
        :loading="isPending"
        :disabled="isPending"
        class="w-full"
        variant="danger"
        >Delete</AcButton
      >
    </footer>
  </article>
</template>
<script setup lang="ts">
import type { paths } from '@/types/api'

import AcButton from '../ui/AcButton.vue'
import { useDeleteArticle } from '@/composables/useArticles'
import { useRouter } from 'vue-router'
type Article =
  paths['/articles']['get']['responses'][200]['content']['application/json']['articles'][number]

function firstWords(text: string, n: number) {
  return text.split(/\s+/).slice(0, n).join(' ') + '…'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString()
}
interface Props {
  item: Article
  index: number
}
defineProps<Props>()

const router = useRouter()

const { mutate: deleteArticle, isPending } = useDeleteArticle()
</script>
