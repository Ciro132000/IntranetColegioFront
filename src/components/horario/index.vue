<template>
  <div v-if="rol_user==1">
    <EsquemaHorario/>
  </div>
  <div v-if="rol_user==2">
    dff
  </div>
  <div v-if="rol_user==3">
    <EstudianteHorario/>
  </div>
</template>

<script>
import EsquemaHorario from './esquema/horario.vue'
import EstudianteHorario from './Estudiante'

export default {
  name: 'Horario',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user')
    }
  },
  components:{
      EsquemaHorario,
      EstudianteHorario
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