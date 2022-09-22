<template>
  <div class="cotainer-fluid px-5">
    <div class="row mt-5">
      <div class="col-md-3">
        <Menu/>
      </div>
      <div class="col-md-9">
        <div v-if="rol_user==2">
          <DocenteForo />
        </div>
        <div v-if="rol_user==3">
          <EstudianteForo/>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import EstudianteForo from './Estudiante'
import DocenteForo from './Docente'
import Menu from '../Secciones/menu'

export default {
  name: 'Foros',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user')
    }
  },
  components:{
      EstudianteForo,
      DocenteForo,
      Menu
  }
}
</script>

<style scoped>

img{
  max-width: 500px;
  display: block;
  margin: auto;
}

</style>