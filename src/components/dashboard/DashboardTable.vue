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

      <!-- <nav class="flex items-center justify-end gap-1">
        <button
          class="px-2 py-1 rounded hover:bg-neutral-200"
          :disabled="page === 0"
          @click="page--"
        >
          ‹
        </button>

        <button
          v-for="n in totalPages"
          :key="n"
          class="px-2 py-1 rounded"
          :class="n - 1 === page ? 'bg-primary-bg2 text-white' : 'hover:bg-neutral-200'"
          @click="page = n - 1"
        >
          {{ n }}
        </button>

        <button
          class="px-2 py-1 rounded hover:bg-neutral-200"
          :disabled="page >= totalPages - 1"
          @click="page++"
        >
          ›
        </button>
      </nav> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useCurrentUser } from '@/composables/useAuth'
import SingleTableRow from './SingleTableRow.vue'

const page = ref(0)
const pageSize = 10
const deleteModal = ref(false)
const { data: user } = useCurrentUser()
const author = computed(() => user.value?.username)

const { data, isFetching, isError } = useArticles(page.value, pageSize, author)

const articles = computed(() => data.value?.articles ?? [])
const articlesCnt = computed(() => data.value?.articlesCount ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(articlesCnt.value / pageSize)))

function firstWords(text: string, n: number) {
  return text.split(/\s+/).slice(0, n).join(' ') + '…'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString()
}

function edit(a: any) {
  console.log('edit', a.slug)
}
function del(a: any) {
  console.log('delete', a.slug)
}

const dropdownActions = [
  { label: 'Edit', onSelect: () => console.log('edit') },
  { label: 'Delete', onSelect: () => (deleteModal.value = true) },
]
</script>
