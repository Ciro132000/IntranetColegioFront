import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Mensajes from '../views/Mensajes.vue'
import Principal from '../views/Principal.vue'
import Docentes from '../views/Docentes.vue'
import Estudiantes from '../views/Estudiantes.vue'
import Secciones from '../views/Secciones.vue'
import Login from '../views/auth/Login.vue'
import Horario from '../views/Horario.vue'
import Curso from '../views/Cursos.vue'
import Historial from '../views/Historial.vue'
import Foros from '../components/Foros'
import Evaluaciones from '../components/Evaluaciones'
import EvaluacionesRespuesta from '../components/Evaluaciones/respuestas.vue'
import ForosRespuesta from '../components/Foros/respuesta.vue'
import Calificar from '../components/Evaluaciones/calificar'
import Notas from '../components/Evaluaciones/notas'
import Leccion from '../components/Leccion'
import Pendientes from '../components/pendientes'
import Anuncios from '../components/anuncios'
import Grupos from '../components/grupos'


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
      {path: 'mensajes',component: Mensajes,name: 'mensajes'},
      
      {path: 'secciones/:idSeccion',component: Secciones,name: 'seccion'},
      {path: 'secciones/:idSeccion/foros',component: Foros,name: 'foros'},
      {path: 'secciones/:idSeccion/foros/:idForo',component: ForosRespuesta,name: 'fororespuesta'},
  
      {path: 'secciones/:idSeccion/evaluaciones',component: Evaluaciones,name: 'evaluaciones'},
      {path: 'secciones/:idSeccion/notas',component: Notas,name: 'notas'},

      {path: 'secciones/:idSeccion/actividades',component: Pendientes,name: 'pendientes'},
      {path: 'secciones/:idSeccion/anuncios',component: Anuncios,name: 'anuncios'},
      {path: 'secciones/:idSeccion/grupos',component: Grupos,name: 'grupos'},

      {path: 'secciones/:idSeccion/leccion/:idLeccion',component: Leccion,name: 'leccion'},

      // Responder evaluaciones - ALUMNOS
      {path: 'secciones/:idSeccion/evaluaciones/:tipoEvaluacion/:idEvaluacion',component: EvaluacionesRespuesta,name: 'respuestaEvaluacion'},

      // Calificar evaluciones - DOCENTES
      {path: 'secciones/:idSeccion/evaluaciones/:tipoEvaluacion/:idEvaluacion/alumno/:idEstudiante',component: Calificar,name: 'revisarEvaluacion'},

      {path: 'horario', component: Horario, name: 'horarioClases' },
      {path: 'horario/:idAula', component: Horario, name: 'horario'},
      {path: 'horario/:idAula/:idSeccion', component: Horario, name: 'asignarHorario'},
      {path: 'cursos', component: Curso, name: 'cursos' },
      {path: 'historial', component: Historial, name: 'historial' }
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
