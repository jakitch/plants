import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlanterView from '../views/PlanterView.vue'
import ShelfView from '../views/ShelfView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/planter',
    name: 'planter',
    component: PlanterView
  },
  {
    path: '/shelf',
    name: 'shelf',
    component: ShelfView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
