<template>
  <div class="cotainer-fluid px-5">
    <div class="row mt-5">
      <div class="col-md-3">
        <Menu/>
      </div>
      <div class="col-md-9">
          <h2>Tablero de notas</h2>
          <div v-if="rol_user==2">
              <Docente/>
          </div>
          <div v-if="rol_user==3">
              <Estudiante/>
          </div>

      </div>
    </div>
  </div>
  
</template>

<script>

import Menu from '../../Secciones/menu'
import Estudiante from './Estudiante.vue'
import Docente from './Docente.vue'

export default {

  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      idEvaluacion:this.$route.params.idEvaluacion
    }
  },
  components:{
      Menu,
      Estudiante,
      Docente
  },
  methods:{
      
  },
  created(){
      
  }
}
</script>

<style scoped>
.text-respuesta{
    width: 100%;
    min-height: 150px;
    border: none !important;
    outline: none;
    display: block;
    resize: none;
}
.img-perfil{
    border-radius: 50%;
    border: 2px solid rgb(158, 158, 158);
    width: 60px;
    height: 60px;
    margin-right: 2rem;
}
</style>