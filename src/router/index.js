import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: DefaultLayout,
      redirect:'/' ,
      children:[
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/coin/:id',
          name: 'DetailsPage',
          component: () => import('../views/DetailsPage.vue')
        },
      ]
    }
  ]
})
export default router
