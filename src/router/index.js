import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Principal from '../views/Principal.vue'
import Docentes from '../views/Docentes.vue'
import Estudiantes from '../views/Estudiantes.vue'
import Secciones from '../views/Secciones.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {path: '/',component: Principal,name: 'principal',},
      {path: 'estudiantes',component: Estudiantes,name: 'estudiantes',},
      {path: 'docentes',component: Docentes,name: 'docentes',},
      {path: 'secciones',component: Secciones,name: 'secciones',},
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
