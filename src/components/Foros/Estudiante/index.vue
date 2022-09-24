<template>
  <div class="cointer-fluid">
    <hr>
    <div class="row d-flex flex-column">
      <div class="card my-3" v-for="foro in foros" :key="foro.index">
        <div class="card-header">
          <h3>
            {{ foro.titulo}}
          </h3>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ foro.pregunta }}</h5>
          <p class="card-text">Disponible : {{ formatear(foro.fechaInicio) }} --- {{ formatear(foro.fechaFin) }}</p>
            <router-link class="btn btn-primary" :to="{name:'fororespuesta', params:{idSeccion:$route.params.idSeccion,idForo:foro.id}  }"> 
                Respuestas
            </router-link>  
        </div>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'ForoDocente',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      register:false,
      invalid: false,
      dataForo:{
        titulo:null,
        pregunta:null,
        fechaInicio:null,
        fechaFin:null,
        idSeccion:this.$route.params.idSeccion
      },
      foros:[]
    }
  },
  methods:{
    formatear(date){
      const dateN = new Date(date)
        const formatDate = (current_datetime)=>{
            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
            return formatted_date;
        }

        return formatDate(dateN);
    },
    async enviar(){
      if(
        this.dataForo.titulo!=null &&
        this.dataForo.pregunta!=null &&
        this.dataForo.fechaInicio!=null &&
        this.dataForo.fechaFin!=null
      ){
        this.dataForo.fechaInicio = await this.formatear(this.dataForo.fechaInicio) 
        this.dataForo.fechaFin = await this.formatear(this.dataForo.fechaFin) 
  
        await this.axios.post('foros/create', this.dataForo).then((res)=>{
            if(res.data.data){
              this.dataForo.titulo=null
              this.dataForo.pregunta=null
              this.dataForo.fechaInicio=null
              this.dataForo.fechaFin=null
              this.register=true
              this.traerForos()
            }
        })
      }else{
        this.invalid = true
      }
    },
    async traerForos(){
      // foros/search?idSeccion=3
      await this.axios.get(`foros/search?idSeccion=${this.$route.params.idSeccion}`).then((res)=>{
        this.foros=res.data.data
      })
    }

  },
  created(){
    this.traerForos();
  }

}
</script>

<style scoped>

</style>