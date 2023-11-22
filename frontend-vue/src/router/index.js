import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: LoginView
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterView
      },
      {
        path: '/profile',
        name: 'profile',
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
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
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
