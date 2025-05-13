<template>
  <div class="p-6">
    <div class="space-y-4 bg-white p-6">
      <p v-if="isError">Couldn’t load articles.</p>
      <p v-else-if="isFetching && !articles.length">Loading…</p>

      <table v-else class="min-w-full text-sm border-collapse">
        <thead class="bg-neutral-bg2 text-neutral-fg1 text-left font-semibold">
          <tr>
            <th class="w-12 px-3 py-3">#</th>
            <th class="px-3 py-3">Title</th>
            <th class="px-3 py-3">Author</th>
            <th class="px-3 py-3">Tags</th>
            <th class="px-3 py-3">Excerpt</th>
            <th class="px-3 py-3">Created</th>
            <th class="w-12"></th>
          </tr>
        </thead>

        <tbody>
          <SingleTableRow
            v-for="(item, i) in articles"
            :index="page * pageSize + i + 1"
            :key="i"
            :item="item"
          />
        </tbody>
      </table>

      <nav class="flex items-center justify-end">
        <div class="gap-2 rounded-lg border p-1 border-neutral-st2 flex justify-center">
          <button
            :disabled="page === 1"
            @click="router.push(page === 2 ? '/articles' : `/articles/page/${page - 1}`)"
            class="px-2 disabled:text-neutral-st2"
          >
            <ChevronIcon />
          </button>
          <button
            :class="i === page ? 'bg-primary-bg2 text-white' : ''"
            class="flex justify-center items-center rounded-lg size-8"
            :kay="i"
            @click="router.push(i === 1 ? '/articles' : `/articles/page/${i}`)"
            v-for="i in totalPages - 1"
          >
            {{ i }}
          </button>
          <button
            :disabled="page === totalPages - 1"
            @click="router.push(`/articles/page/${page + 1}`)"
            class="px-2 disabled:text-neutral-st2"
          >
            <ChevronIcon class="rotate-180" />
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useCurrentUser } from '@/composables/useAuth'
import SingleTableRow from './SingleTableRow.vue'
import { useRoute, useRouter } from 'vue-router'
import ChevronIcon from '../ui/icons/ChevronIcon.vue'
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
</script>
