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
          <tr
            v-for="(a, i) in articles"
            :key="a.slug"
            class="border-b text-neutral-fg1 text-[14px] border-neutral-st3"
          >
            <td class="text-center">
              <span
                class="w-6 h-6 text-[12px] flex justify-center items-center bg-neutral-bg2 rounded text-neutral-fg1"
                >{{ page * pageSize + i + 1 }}</span
              >
            </td>

            <td class="font-semibold px-4 py-4">{{ a.title }}</td>

            <td class="px-3 py-3">@{{ a.author.username }}</td>

            <td class="px-3 py-3">
              <span
                v-for="(t, k) in a.tagList"
                :key="k"
                class="inline-block bg-neutral-200 rounded px-1.5 mr-1 mb-0.5"
                >{{ t }}</span
              >
            </td>

            <td class="px-3 py-3">
              {{ firstWords(a.body, 20) }}
            </td>

            <td class="px-3 py-3">
              {{ formatDate(a.createdAt) }}
            </td>

            <td class="relative">
              <button
                class="w-8 h-8 rounded-xl border border-neutral-st2 flex items-center justify-center"
                @click="openMenu = openMenu === a.slug ? null : a.slug"
              >
                ⋯
              </button>

              <div
                v-if="openMenu === a.slug"
                class="absolute right-0 mt-1 w-32 bg-white border rounded shadow-lg z-10"
              >
                <button
                  class="block w-full text-left px-4 py-3 hover:bg-neutral-100"
                  @click="edit(a)"
                >
                  Edit
                </button>
                <button
                  class="block w-full text-left px-4 py-3 hover:bg-neutral-100"
                  @click="del(a)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <nav class="flex items-center justify-end gap-1">
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
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useCurrentUser } from '@/composables/useAuth'
type Article = NonNullable<typeof data.value>['articles'][number] & { body: string }
const page = ref(0)
const pageSize = 10

const { data: user } = useCurrentUser()
const author = computed(() => user.value?.username)

const { data, isFetching, isError } = useArticles(page.value, pageSize, author)

const articles = computed<any>(() => data.value?.articles ?? [])
const articlesCnt = computed(() => data.value?.articlesCount ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(articlesCnt.value / pageSize)))

const openMenu = ref<string | null>(null)
watch([page, articles], () => (openMenu.value = null))

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
</script>
