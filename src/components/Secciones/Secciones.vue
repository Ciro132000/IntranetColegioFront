<template>
  <div v-if="rol_user==1">
    <Admin />
  </div>

  <div class="cotainer-fluid px-5" v-else>
    <div class="row mt-5">
      <div class="col-md-2">
        <Menu/>
      </div>
      <div class="col-md-10">
        <div>
          <Estudiante />
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import Admin from './admin'
import Estudiante from './Estudiantes'

import Menu from './menu'

export default {
  name: 'SeccionesComponent',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user')
    }
  },
  components:{
      Admin,
      Estudiante,

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