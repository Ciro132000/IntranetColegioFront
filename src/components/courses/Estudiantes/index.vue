<template>
  <div class="container">
      <div class="list-group">
        <router-link v-for="data in dataUser" :key="data.index" :to="{name:'seccion', params:{idSeccion:data.id } }" class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ data.curso }}</h5>
            </div>
            <p class="mb-1">Docente{{ data.nombreDocente }} ({{ data.codigoDocente }}).</p>
            <small>Seccion: {{ data.codigo}}</small>
        </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CursoEstudiante',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataUser:[]
    }
  },
  methods:{
      async traerInfo(){
        await this.axios.get(`courses/search?idAula=${localStorage.getItem('idAula')}`).then((res)=>{
            this.dataUser=res.data.data
        })
      }
  },
  created(){
      this.traerInfo()
  }

}
</script>

<style scoped>

</style>