import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView         from '../views/HomeView.vue'
import DiariosCampoView from '../views/DiariosCampoView.vue'
import MemoriasView     from '../views/MemoriasView.vue'
import SimbiografiaView from '../views/SimbiografiaView.vue'
import CartografiasView from '../views/CartografiasView.vue'
import ConexionesView   from '../views/ConexionesView.vue'
import LiquenView       from '../views/LiquenView.vue'

const routes = [
  { path: '/',            name: 'home',         component: HomeView },
  { path: '/diarios',     name: 'diarios',      component: DiariosCampoView },
  { path: '/memorias',    name: 'memorias',     component: MemoriasView,  meta: { hideNav: true } },
  { path: '/simbiosis',   name: 'simbiosis',    component: SimbiografiaView, meta: { hideNav: true } },
  { path: '/cartografias',name: 'cartografias', component: CartografiasView },
  { path: '/conexiones',  name: 'conexiones',   component: ConexionesView },
  { path: '/liquenes',    name: 'liquenes',     component: LiquenView,    meta: { hideNav: true } },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
