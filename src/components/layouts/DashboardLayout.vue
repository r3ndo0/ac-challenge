<template>
  <main class="h-screen bg-neutral-bg2">
    <header
      class="h-16 px-6 border-b flex justify-between items-center bg-white border-neutral-st3"
    >
      <p>Welcome {{ user?.username }}</p>
      <span class="text-neutral-fg1 py-2 px-3 font-semibold bg-neutral-bg2 rounded-sm"
        >Arvancloud Challenge</span
      >
      <button class="text-sm py-2.5 px-4 border border-neutral-st2 rounded-xl text-neutral-fg1">
        Log out
      </button>
    </header>
    <aside
      class="w-[240px] p-4 flex flex-col gap-1 bg-white h-[calc(100vh-64px)] fixed left-0 top-16"
    >
      <RouterLink
        exactActiveClass="text-primary-fg1 bg-primary-bg1"
        v-for="{ to, name } in sidebarLinks"
        class="p-2"
        :to="to"
        >{{ name }}</RouterLink
      >
    </aside>

    <div class="pl-[240px]">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useCurrentUser } from '@/composables/useAuth'
import { RouterLink } from 'vue-router'
const { data: user } = useCurrentUser()

const sidebarLinks = [
  {
    name: 'All Articles',
    to: '/articles',
  },
  {
    name: 'New Article',
    to: '/articles/create',
  },
]
</script>
