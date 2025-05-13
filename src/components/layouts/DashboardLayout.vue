<template>
  <main class="md:h-screen bg-neutral-bg2">
    <header
      class="fixed inset-x-0 top-0 z-20 h-16 px-6 border-b flex justify-between items-center bg-white border-neutral-st3"
    >
      <p>Welcome {{ user?.username }}</p>

      <button @click="mobileOpen = true" class="md:hidden">
        <HamIcon />
      </button>

      <span
        class="hidden md:inline-block text-neutral-fg1 py-2 px-3 font-semibold bg-neutral-bg2 rounded-sm"
      >
        Arvancloud Challenge
      </span>

      <button
        @click="signOut"
        class="hidden md:block text-sm py-2.5 px-4 border border-neutral-st2 rounded-xl text-neutral-fg1"
      >
        Log out
      </button>
    </header>

    <aside
      class="hidden md:flex fixed top-16 left-0 h-[calc(100vh-64px)] w-[240px] flex-col gap-1 p-4 bg-white"
    >
      <RouterLink
        v-for="{ to, name } in links"
        :key="to"
        exact-active-class="text-primary-fg1 bg-primary-bg1"
        class="p-2"
        :to="to"
      >
        {{ name }}
      </RouterLink>
    </aside>

    <Transition name="fade">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-30 bg-black/30 md:hidden"
        @click.self="mobileOpen = false"
      >
        <aside ref="drawer" class="h-full w-[240px] bg-white flex flex-col justify-between">
          <nav class="p-4 space-y-1">
            <RouterLink
              v-for="{ to, name } in links"
              :key="to"
              exact-active-class="text-primary-fg1 bg-primary-bg1"
              class="block p-2"
              :to="to"
              @click="mobileOpen = false"
            >
              {{ name }}
            </RouterLink>
          </nav>

          <div class="p-4 space-y-3 border-t border-neutral-st3">
            <span class="block text-neutral-fg1 py-2 px-3 font-semibold bg-neutral-bg2 rounded-sm">
              Arvancloud Challenge
            </span>
            <button
              @click="signOut"
              class="w-full text-sm py-2.5 px-4 border border-neutral-st2 rounded-xl text-neutral-fg1"
            >
              Log out
            </button>
          </div>
        </aside>
      </div>
    </Transition>

    <div class="pt-16 md:pl-[240px]">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSignOut, useCurrentUser } from '@/composables/useAuth'
import HamIcon from '../ui/icons/HamIcon.vue'
const signOut = useSignOut()

const { data: user } = useCurrentUser()
const mobileOpen = ref(false)

const links = [
  { name: 'All Articles', to: '/articles' },
  { name: 'New Article', to: '/articles/create' },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
