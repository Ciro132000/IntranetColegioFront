<template>
  <div >
    <h1 class="text-center">contenido del curso</h1>
  </div>
</template>

<script>


export default {
  name: 'Cursos',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      
    }
  },
  
}
</script>

<style scoped>



</style>