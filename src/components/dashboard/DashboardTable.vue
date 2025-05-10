<template>
  <div v-if="isError">Couldn’t load articles</div>

  <table v-else>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="a in data?.articles" :key="a.slug">
        <td>{{ a.title }}</td>
        <td>{{ a.author.username }}</td>
      </tr>
    </tbody>
  </table>

  <button :disabled="page === 0" @click="page--">Prev</button>
  <button :disabled="!data || (page + 1) * pageSize >= data.articlesCount" @click="page++">
    Next
  </button>

  <span v-if="isFetching">Updating…</span>
</template>
<script setup lang="ts">
import { useArticles } from '@/composables/useArticles'
import { ref } from 'vue'

const page = ref(0)
const pageSize = 10

const { data, isFetching, isError } = useArticles(page.value, pageSize)
console.log(data.value)
</script>
