<template>
  <tr :key="item.slug" class="border-b text-neutral-fg1 text-[14px] border-neutral-st3">
    <td class="text-center">
      <span
        class="w-6 h-6 text-[12px] flex justify-center items-center bg-neutral-bg2 rounded text-neutral-fg1"
        >{{ index }}</span
      >
    </td>

    <td class="font-semibold px-4 py-4">{{ item.title }}</td>

    <td class="px-3 py-3">@{{ item.author.username }}</td>

    <td class="px-3 py-3">
      <span
        v-for="(t, k) in item.tagList"
        :key="k"
        class="inline-block bg-neutral-200 rounded px-1.5 mr-1 mb-0.5"
        >{{ t }}</span
      >
    </td>

    <td class="px-3 py-3">
      {{ firstWords(item.body, 20) }}
    </td>

    <td class="px-3 py-3">
      {{ formatDate(item.createdAt) }}
    </td>

    <td class="relative">
      <AcDropdown :items="dropdownActions"
        ><template #trigger>
          <div
            class="w-8 h-8 rounded-xl border border-neutral-st2 flex items-center justify-center"
          >
            <TrippleDotsIcon /></div></template
      ></AcDropdown>
    </td>
    <AcDialog v-model="deleteModal"
      ><template #title
        ><h4 class="py-4 px-6 border-b border-neutral-st3">Delete Article</h4></template
      >
      <template #content>
        <div class="p-6 flex flex-col items-center w-full border-b border-neutral-st3">
          <span class="flex mb-2 bg-error-bg1 justify-center items-center rounded-full size-14"
            ><WarningIcon class="text-error-fg1"
          /></span>
          <p class="text-sm text-neutral-fg1">Are you sure you want to delete this article?</p>
        </div>
        <div class="py-4 px-6 flex justify-end gap-4 items-center">
          <AcButton class="px-4" variant="danger" @click="() => confirmDelete(item.slug)"
            >Delete</AcButton
          >
          <AcButton class="px-4" variant="outline" @click="() => (deleteModal = false)"
            >Cancel</AcButton
          >
        </div></template
      ></AcDialog
    >
  </tr>
</template>

<script setup lang="ts">
import type { paths } from '@/types/api'
import { ref } from 'vue'
import AcDialog from '../ui/AcDialog.vue'
import AcDropdown from '../ui/AcDropdown.vue'
import TrippleDotsIcon from '../ui/icons/TrippleDotsIcon.vue'
import WarningIcon from '../ui/icons/WarningIcon.vue'
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
const props = defineProps<Props>()
const deleteModal = ref(false)
const router = useRouter()
const dropdownActions = [
  { label: 'Edit', onSelect: () => router.push(`/articles/edit/${props.item.slug}`) },
  { label: 'Delete', onSelect: () => (deleteModal.value = true) },
]

const { mutate: deleteArticle } = useDeleteArticle()

function confirmDelete(slug: string) {
  deleteModal.value = false
  deleteArticle(slug)
}
</script>
