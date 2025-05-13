<template>
  <div class="p-6">
    <div v-if="!!articles.length" class="space-y-4 bg-white p-6">
      <p v-if="isError">Couldn’t load articles.</p>
      <p v-else-if="isFetching && !articles.length">Loading…</p>

      <table v-else class="hidden sm:table w-full text-sm border-collapse">
        <thead class="bg-neutral-bg2 text-neutral-fg1 font-semibold text-left">
          <tr>
            <th class="w-12 px-3 py-3">#</th>
            <th class="px-3 py-3">Title</th>
            <th class="px-3 py-3">Author</th>
            <th class="px-3 py-3">Tags</th>
            <th class="px-3 py-3 max-w-[22ch]">Excerpt</th>
            <th class="px-3 py-3">Created</th>
            <th class="w-12"></th>
          </tr>
        </thead>

        <tbody>
          <SingleTableRow
            v-for="(item, i) in articles"
            :key="item.slug"
            :index="(page - 1) * pageSize + i + 1"
            :item="item"
          />
        </tbody>
      </table>

      <div v-if="!isFetching" class="sm:hidden space-y-4">
        <SingleArticleCard
          v-for="(item, i) in articles"
          :key="item.slug"
          :index="(page - 1) * pageSize + i + 1"
          :item="item"
        />
      </div>

      <nav class="flex items-center justify-end">
        <div class="flex gap-2 rounded-lg border border-neutral-st2 p-1">
          <button
            class="px-2 disabled:text-neutral-st2"
            :disabled="page === 1"
            @click="goto(page - 1)"
          >
            <ChevronIcon />
          </button>

          <button
            v-for="n in totalPages"
            :key="n"
            :class="[
              'flex items-center justify-center size-8 rounded-lg',
              n === page ? 'bg-primary-bg2 text-white' : '',
            ]"
            @click="goto(n)"
          >
            {{ n }}
          </button>

          <button
            class="px-2 disabled:text-neutral-st2"
            :disabled="page === totalPages"
            @click="goto(page + 1)"
          >
            <ChevronIcon class="rotate-180" />
          </button>
        </div>
      </nav>
    </div>
    <div v-else>{{ JSON.stringify(articles.length) }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticles, useDeleteArticle } from '@/composables/useArticles'
import { useCurrentUser } from '@/composables/useAuth'
import SingleTableRow from './SingleTableRow.vue'
import ChevronIcon from '../ui/icons/ChevronIcon.vue'
import Button from '../ui/Button.vue'
import SingleArticleCard from './SingleArticleCard.vue'
const route = useRoute()
const router = useRouter()

const page = computed(() => Number(route.params.page) || 1)
const pageSize = 10

const { data: user } = useCurrentUser()
const author = computed(() => user.value?.username)

const { data, isFetching, isError } = useArticles(page, pageSize, author)

const articles = computed(() => data.value?.articles ?? [])
const articlesCnt = computed(() => data.value?.articlesCount ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(articlesCnt.value / pageSize)))
const { mutate: deleteArticle, isPending } = useDeleteArticle()
function firstWords(t: string, n: number) {
  return t.split(/\s+/).slice(0, n).join(' ') + '…'
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString()
}

function goto(n: number) {
  if (n < 1 || n > totalPages.value) return
  router.push(n === 1 ? '/articles' : `/articles/page/${n}`)
}
</script>
