import './assets/main.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'

const app = createApp(App)
const pinia = createPinia()
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
app.use(VueQueryPlugin)
app.use(pinia)
app.mount('#app')
