<template>
    <div class="container">
        <h2 class="text-center my-5">Historial de actividades</h2>
        <ul class="list-group my-4">
            <li class="list-group-item d-flex justify-content-between " v-for="actividad in historial" :key="actividad.index" >
                <div>
                  <h5>{{ actividad.actividad }}</h5>
                  <samp>{{ actividad.nombreActividad }}</samp>
                </div>

                <div class="d-flex flex-column ">
                  <span>{{ formatear(actividad.createdAt) }}</span>
                </div>      
            </li>
          </ul>
    </div>
</template>


<script>
export default {
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      idSeccion:this.$route.params.idSeccion,
      historial:[]
    }
  },

  methods:{
      async traerInfo(){
        await this.axios.get(`students/historial`).then((res)=>{
            this.historial=res.data.data
        })
      },

      formatear(date){
      const dateN = new Date(date)
      const formatDate = (current_datetime)=>{
          let formatted_date =  current_datetime.getDate() + "/"+(current_datetime.getMonth() + 1) + "/" +current_datetime.getFullYear()  + " a las " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() + " horas";
          return formatted_date;
      }

      return formatDate(dateN);
    },

  },
  created(){
      this.traerInfo()
  }
}
</script>

<style scoped>


</style>