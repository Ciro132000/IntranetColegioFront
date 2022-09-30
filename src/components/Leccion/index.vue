<template>

  <div class="cotainer-fluid px-5" >
    <div class="row mt-5">
      <div class="col-md-3">
        <Menu/>
      </div>
      <div class="col-md-9">
          <h2>{{ dataLeccion.nombre }}</h2> 
          <a :href="dataLeccion.archivo" download target="_blank">Download</a>
          <hr>
        <iframe :src="dataLeccion.archivo" frameborder="0" class="material"></iframe>
      </div>
    </div>
  </div>
  
</template>

<script>

import Menu from '../Secciones/menu'

export default {
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataLeccion:[]
    }
  },
  components:{
      Menu
  },
  methods:{
      async traerInfo(){
        await this.axios.get(`courses/leccion?idLeccion=${this.$route.params.idLeccion}`).then((res)=>{
            this.dataLeccion = res.data.data
        })
      }
  },
  created(){
      this.traerInfo()
  }
}
</script>

<style scoped>

.material{
    width: 100%;
    height: 250%;
}

</style>