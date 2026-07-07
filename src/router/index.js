import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',            name: 'home',         component: () => import('../views/HomeView.vue') },
  { path: '/diarios',     name: 'diarios',      component: () => import('../views/DiariosCampoView.vue') },
  { path: '/memorias',    name: 'memorias',     component: () => import('../views/MemoriasView.vue'),  meta: { hideNav: true } },
  { path: '/simbiosis',   name: 'simbiosis',    component: () => import('../views/SimbiografiaView.vue'), meta: { hideNav: true } },
  { path: '/cartografias',name: 'cartografias', component: () => import('../views/CartografiasView.vue') },
  { path: '/conexiones',  name: 'conexiones',   component: () => import('../views/ConexionesView.vue') },
  { path: '/liquenes',    name: 'liquenes',     component: () => import('../views/LiquenView.vue'),    meta: { hideNav: true } },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
