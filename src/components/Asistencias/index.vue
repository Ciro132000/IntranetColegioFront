<template>
  <div class="container py-2">
    <div class="row">
        <div class="col-2">
            <Menu/>
        </div>
        <div class="col-10">
            <h2 class="text-center">Lista de asistencia</h2>
            <Lista/>
        </div>
    </div>
  </div>
</template>

<script>
import Menu from './Menu.vue'
import Lista from './Lista.vue'

export default {
  name: 'Cursos',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user')
    }
  },
  components:{
    Menu,
    Lista
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