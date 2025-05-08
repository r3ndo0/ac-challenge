import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { components } from '@/types/api'

type User = components['schemas']['User']
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  const clearUser = () => {
    user.value = null
  }

  const isAuthenticated = computed(() => user.value !== null)

  return { user, setUser, clearUser, isAuthenticated }
})
