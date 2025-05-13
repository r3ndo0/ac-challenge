import './assets/main.css'
import { VueQueryPlugin, QueryClient, keepPreviousData } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { useCookies } from '@vueuse/integrations/useCookies'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000, // 5 min
      refetchOnWindowFocus: false,
      retry: 1,
      placeholderData: keepPreviousData, // smooth pagination
    },
    mutations: {
      retry: false,
    },
  },
})
const app = createApp(App)

router.beforeEach((to, _from, next) => {
  const needsAuth = to.matched.some((r) => r.meta.requiresAuth)
  const token = useCookies().get('token')
  if (needsAuth && !token) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
