<template>
  <div class="cotainer-fluid px-5">
    <div class="row mt-5">
      <div class="col-md-3">
        <Menu/>
      </div>
      <div class="col-md-9">
        
        <div class="row" v-if="rol_user==2">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#crearEvaluacion">
                Crear nueva evaluacion <i class="fas fa-plus-square"></i>
                </button>
            </div>
        </div>

        <hr>
        <div class="row d-flex flex-column">
            <h3>Examenes</h3>
            <div class="card my-3" v-for="examen in dataEvaluaciones.examenes" :key="examen.index" >
                <div class="card-header">
                <h4>
                    {{ examen.titulo }}
                </h4>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Decripcion: {{ examen.descripcion }}</h5>
                  <p v-if="rol_user==1" class="card-text">Disponible : El {{ formatear(examen.fechaInicio)}}, hasta el {{ formatear(examen.fechaFin) }} </p>
                  <div v-if="rol_user==2">
                    Disponible del
                    <a class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ formatear(examen.fechaInicio)}}
                    </a>
                    <div class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton1">
                      <input v-model="modificar.fechaInicio" type="datetime-local" class="form-control" >
                      <button class="btn btn-success my-2" @click="modificarFechaInicio(examen.id)">Modificar</button>
                    </div>

                    , hasta el 

                    <a class="dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ formatear(examen.fechaFin)}}
                    </a>
                    <div class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton2">
                      <input v-model="fechaFin" type="datetime-local" class="form-control" >
                      <button class="btn btn-success my-2" @click="modificarFechaFin(examen.id, examen.fechaInicio)">Modificar</button>
                    </div>

                  </div>
                </div>
            </div>
            <h3>Tareas</h3>
            <div class="card my-3" v-for="tarea in dataEvaluaciones.tareas" :key="tarea.index" >
                  <div class="card-header">
                  <h4>
                      {{ tarea.titulo }}
                  </h4>
                  </div>
                  <div class="card-body">
                  <h5 class="card-title">Decripcion: {{ tarea.descripcion }}</h5>
                  <p v-if="rol_user==1" class="card-text">Disponible : El {{ formatear(tarea.fechaInicio)}}, hasta el {{ formatear(tarea.fechaFin) }} </p>

                  <div v-if="rol_user==2">
                    Disponible del
                    <a class="dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ formatear(tarea.fechaInicio)}}
                    </a>
                    <div class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton3">
                      <input v-model="modificar.fechaInicio" type="datetime-local" class="form-control" >
                      <button class="btn btn-success my-2" @click="modificarFechaInicio(tarea.id)">Modificar</button>
                    </div>

                    , hasta el 

                    <a class="dropdown-toggle" type="button" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ formatear(tarea.fechaFin)}}
                    </a>
                    <div class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton4">
                      <input v-model="fechaFin" type="datetime-local" class="form-control" >
                      <button class="btn btn-success my-2" @click="modificarFechaFin(tarea.id, tarea.fechaInicio)">Modificar</button>
                    </div>
                  </div>

                </div>
            </div>
        </div>

      </div>
    </div>

    
      <!-- Modal -->
    <div class="modal fade" id="crearEvaluacion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear una Evaluación</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Tipo de evaluación</label>
                <select v-model="selectTipo" class="form-select">
                    <option :value="[]">Seleccione el tipo de evaluación </option>
                    <option v-for="item in tipoEvaluacion" :key="item.index" :value="item" >{{ item.tipo }}</option>
                </select>
            </div>
            <crearExamen v-if="selectTipo.id == 1"/>
            <crearTarea v-if="selectTipo.id == 2"/>

          </div>
        </div>
      </div>
    </div>


  </div>
  
</template>

<script>

import Menu from '../Secciones/menu'
import crearTarea from './tareas/crearTarea.vue'
import crearExamen from './examenes/crearExamen.vue'

export default {
  name: 'Evaluaciones',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      tipoEvaluacion:[],
      selectTipo:[],
      dataEvaluaciones:[],
      modificar:{
        fechaInicio:null,
        fechaFin:null
      },
      fechaFin:null
    }
  },
  components:{
      Menu,
      crearExamen,
      crearTarea
  },
  methods:{
      async traerInfo(){
        await this.axios.get(`evaluaciones/tipos`).then((res)=>{
            this.tipoEvaluacion=res.data.data
        })
        
        await this.axios.get(`evaluaciones/todos?idSeccion=${this.$route.params.idSeccion}`).then((res)=>{
            this.dataEvaluaciones=res.data.data
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

    formateoFecha(date){
      const dateN = new Date(date)
      const formatDate = (current_datetime)=>{
          let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
          return formatted_date;
      }

      return formatDate(dateN);
    },

   async modificarFechaInicio(id){
 
       if(this.modificar.fechaInicio !=null ){

        const fecha = await this.formateoFecha(this.modificar.fechaInicio) 

         await this.axios.post(`evaluaciones/reprogramar?idEvaluacion=${id}`,{fechaInicio:fecha}).then((res)=>{
            if(res.data.data){
              this.traerInfo()
            }
            console.log(res.data.data)
        }) 
       }else{
         alert('Seleccione una fecha')
       }

   },

   async modificarFechaFin(id){
     if(this.modificar.fechaFin !=null ){
         const fechaFin = await this.formateoFecha(this.modificar.fechaFin) 
         await this.axios.post(`evaluaciones/reprogramar?idEvaluacion=${id}`,...fechaFin).then((res)=>{
            if(res.data.data){
              this.traerInfo()
            }
            console.log(res.data.data)
        }) 
       }else{
         alert('Seleccione una fecha')
       }
   }

  },
  created(){
      this.traerInfo()
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