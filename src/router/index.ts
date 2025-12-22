import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { isLoggedIn } from '@/backend/services/authService'
import LoginPage from '@/views/LoginPage.vue'
import TabsPage from '@/views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/movies'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/movies',
    redirect: '/tabs/movies'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/movies'
      },
      {
        path: 'movies',
        name: 'Movies',
        component: () => import('@/views/MoviesPage.vue')
      },
      {
        path: 'series',
        name: 'Series',
        component: () => import('@/views/SeriesPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !isLoggedIn()) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn()) {
    next('/tabs/movies')
  } else {
    next()
  }
})

export default router
