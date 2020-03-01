import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: resolve => {require(['../views/home.vue'],resolve) }
  },
  {
    path: '*',
    name: 'view',
    //component: () => import(/* webpackChunkName: "about" */ '../views/view.vue')
    component: resolve => {require(['../views/view.vue'],resolve) }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
