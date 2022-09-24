<template>
  <div class="container">
      <h1 class="text-center">Cursos a cargo</h1>
      <div class="list-group">
        <a v-for="data in dataUser" :key="data.index" href="#" class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ data.curso }}</h5>
            <small>
              <router-link :to="{name:'seccion', params:{idSeccion:data.id } }"> 
                Ver curso
              </router-link>
            </small>
            </div>
            <p class="mb-1">Docente{{ data.nombreDocente }} ({{ data.codigoDocente }}).</p>
            <small>Seccion: {{ data.codigo}}</small>
        </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CursoDocente',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataUser:[]
    }
  },
  methods:{
      async traerInfo(){
        await this.axios.get(`teachers/sections?idDocente=${localStorage.getItem('id_usuario')}`).then((res)=>{
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