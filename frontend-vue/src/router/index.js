import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import SurveysView from '../views/SurveysView.vue';
import SurveyDetailsView from '../views/SurveyDetailsView.vue';
import SurveyCreateView from '../views/SurveyCreateView.vue';
import SurveysBySlugView from '../views/SurveysBySlugView.vue';
import NotFound from '../views/NotFound.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';

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
        path: '/surveys/:id',
        name: 'surveyDetail',
        component: SurveyDetailsView
      },
      {
        path: '/surveys/create',
        name: 'surveyCreate',
        component: SurveyCreateView
      },

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
        path: '/surveys',
        name: 'surveys',
        component: SurveysView
      },
      {
        path: '/surveys/slug',
        name: 'surveysBySlug',
        component: SurveysBySlugView
      }
    ]
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
