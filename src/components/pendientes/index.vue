<template>
  <div class="cotainer-fluid px-5">
    <div class="row mt-5">
      <div class="col-md-2">
        <Menu/>
      </div>
      <div class="col-md-10">
        <h2 class="text-center">Actividades Pendientes</h2>
        <h6 v-if="actividades.length == 0" class="text-center mt-5">No se encontraron actividades pendientes</h6>
        <div>
          <h3>Evaluaciones</h3>
          <ul class="list-group my-4">
            <li class="list-group-item " v-for="evaluacion in actividades.evaluaciones" :key="evaluacion.index" >

              <router-link class="d-flex justify-content-between" :to="{name:'respuestaEvaluacion', params:{idSeccion:idSeccion,idEvaluacion:evaluacion.id,tipoEvaluacion:evaluacion.idTipo === 1?'examen':'tarea'}  }"> 
                <div>
                  <h5>{{ evaluacion.titulo }}</h5>
                  <samp>{{ evaluacion.descripcion }}</samp>
                </div>

                <div class="d-flex flex-column">
                  <span>Vence el {{ formatear(evaluacion.fechaFin) }}</span>
                  <div class="d-flex justify-content-end">
                    <span>{{ evaluacion.idTipo === 1?'Examen':'Tarea' }}</span>
                  </div>
                </div>        
              </router-link> 



            </li>
          </ul>
        </div>
        <hr>
        <div>
          <h3>Foros</h3>
          <ul class="list-group my-4">
            <li class="list-group-item " v-for="evaluacion in actividades.foros" :key="evaluacion.index" >
              <router-link class="d-flex justify-content-between" :to="{name:'fororespuesta', params:{idSeccion:idSeccion,idForo:evaluacion.id}  }"> 
                <div>
                  <h5>{{ evaluacion.titulo }}</h5>
                  <samp>{{ evaluacion.pregunta }}</samp>
                </div>

                <div class="d-flex flex-column ">
                  <span>Vence el {{ formatear(evaluacion.fechaFin) }}</span>
                </div>      
              </router-link> 

            </li>
          </ul>
        </div>

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
      idSeccion:this.$route.params.idSeccion,
      actividades:[]
    }
  },
  components:{
      Menu
  },
  methods:{
      async traerInfo(){
        await this.axios.get(`students/pendientes?idSeccion=${this.idSeccion}`).then((res)=>{
            this.actividades=res.data.data
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

a{
  text-decoration: none;
  color: black;
}

li:hover, a:hover{
  color: white;
  transition: 1s;
}

li:hover{
  background: rgba(65, 187, 235, 0.342);
}

</style>