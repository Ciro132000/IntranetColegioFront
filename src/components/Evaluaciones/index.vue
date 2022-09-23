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
            <div class="card my-3" >
                <div class="card-header">
                <h3>
                    titulo
                </h3>
                </div>
                <div class="card-body">
                <h5 class="card-title">Decripcion</h5>
                <p class="card-text">Disponible : </p>
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
            <h5 class="modal-title" id="exampleModalLabel">Crear un foro</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <!-- <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="register">
              <strong>Perfecto!</strong> Se registro el foro correctamente
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="invalid">
              <strong>Ups!</strong> LLene los campos correctamente
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> -->

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
      selectTipo:[]
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