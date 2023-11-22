import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'

const routes = [
  {
    path: '/auth',
    redirect: '/login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        component: LoginView
      },
      {
        path: '/profile',
        component: ProfileView
      }
    ]
  },
  {
    path: '/',
    redirect: '/home',
    name: 'Guest',
    component: DefaultLayout,
    children: [
      {
        path: '/home',
        component: HomeView
      },
      {
        path: '/about',
        component: AboutView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
