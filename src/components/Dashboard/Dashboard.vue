<template>
  <div>
    <!-- <Construccion/> -->
    <div class="container d-flex">
      <div v-for="data in dataUser" :key="data.index" data-intro="Acá pueden visualizar sus cursos activos">
        <router-link :to="{name:'seccion', params:{idSeccion:data.id }}" class="card mx-3" style="width: 18rem;">
          <div class="card-imagen"></div>
          <div class="card-body">
            <h5 class="card-title">{{ data.curso }} - {{ data.codigo}}</h5>
            <p class="card-text">Docente: {{ data.nombreDocente }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

// import Construccion from '@/components/default/Construction.vue'

export default {
  name: 'PrincipalComponent',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataUser:[]
    }
  },
  // components:{
  //   Construccion
  // },
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

.card{
  border-radius: 25px !important;
  color: black;
  max-height: 18rem;
  transition: 1s;
}

.card:hover{
  -webkit-transform:scale(1.05);
  -moz-transform:scale(1.05);
  -ms-transform:scale(1.05);
  -o-transform:scale(1.05);
  transform:scale(1.05);
  background: rgba(228, 228, 228, 0.438);
}

.card-imagen{
  background-image: linear-gradient(rgba(49, 144, 223, 0.5), rgba(97, 241, 140, 0.404)), url("../../assets/libros.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  height: 200px;
  border-radius: 25px 25px 0px 0px;

}

</style>