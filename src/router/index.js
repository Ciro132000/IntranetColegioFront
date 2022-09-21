import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Principal from '../views/Principal.vue'
import Docentes from '../views/Docentes.vue'
import Estudiantes from '../views/Estudiantes.vue'
import Secciones from '../views/Secciones.vue'
import Login from '../views/auth/Login.vue'
import Horario from '../views/Horario.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { autenticado: true },
    children:[
      {path: '/',component: Principal,name: 'principal'},
      {path: 'estudiantes',component: Estudiantes,name: 'estudiantes'},
      {path: 'docentes',component: Docentes,name: 'docentes'},
      {path: 'secciones',component: Secciones,name: 'secciones'},
      {path: 'horario', component: Horario, name: 'horarioClases' },
      {path: 'horario/:idAula', component: Horario, name: 'horario'},
      {path: 'horario/:idAula/:idSeccion', component: Horario, name: 'asignarHorario'}
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '/login', name: 'Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('access_token');
  let autenticado = to.matched.some(record => record.meta.autenticado);
  // let status = localStorage.getItem('status_user')
  if (autenticado && !token) {
    next('login');
  }
  //  if ((!autenticado && token) && status == 0 ) {
  //   next('/preferences');
  else if ((!autenticado && token)) {
    next('/');
  }
  else {
    next()
  }
})

export default router
