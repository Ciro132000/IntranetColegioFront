<template>
  <div v-if="rol_user==2">
    <DocenteCurso />
  </div>
  <div v-if="rol_user==3">
    <EstudianteCurso/>
  </div>
</template>

<script>
import EstudianteCurso from './Estudiantes'
import DocenteCurso from './Docentes'

export default {
  name: 'Cursos',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user')
    }
  },
  components:{
      EstudianteCurso,
      DocenteCurso
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