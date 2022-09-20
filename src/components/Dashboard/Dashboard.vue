<template>
  <!-- <div class="d-flex flex-column">
    <img src="../../assets/paginaConstruccion.png" alt="">
    <h3 class="text-center">Esta página esta siendo construida</h3>
    <p class="text-center">Puede probar navegando en otras opciones</p>
  </div> -->
  <horario/>
</template>

<script>
import horario from '@/components/horario/esquema/horario.vue'

export default {
  name: 'PrincipalComponent',
  components:{
    horario
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