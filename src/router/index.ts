import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ArticlesView from '@/views/ArticlesView.vue'
import CreateArticleView from '@/views/CreateArticleView.vue'
import EditArticle from '@/components/dashboard/edit/EditArticle.vue'
import EditArticleView from '@/views/EditArticleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/articles/edit/:slug',
      name: 'articles-edit',
      component: EditArticleView,
      meta: { requiresAuth: true },
    },
    {
      path: '/articles/create',
      name: 'articles-create',
      component: CreateArticleView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

export default router
