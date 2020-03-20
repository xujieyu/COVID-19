import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 路由懒加载
// https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
const Index = () => import('../views/index.vue');
const View = () => import('../views/view.vue');

const routes = [
  {
    path: '/',
    name: 'Index',
    component: resolve => {require(['../views/index.vue'],resolve) }
  },
  {
    path: '*',
    name: 'view',
    component: resolve => {require(['../views/view.vue'],resolve) }
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
