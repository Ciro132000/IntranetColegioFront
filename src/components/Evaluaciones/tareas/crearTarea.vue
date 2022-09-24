<template>
    <div>
            <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="register">
              <strong>Perfecto!</strong> La tarea se registro exitosamente
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="invalid">
              <strong>Ups!</strong> LLene los campos correctamente
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="mb-3">
              <label for="titulo" class="form-label">Titulo de la tarea</label>
              <input type="text" v-model="dataTarea.titulo" class="form-control" id="titulo">
            </div>

            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Descripcion de la tarea</label>
              <textarea v-model="dataTarea.descripcion" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <div class="mb-3">
              <label for="titulo" class="form-label">Nota máxima</label>
              <input type="number" v-model="dataTarea.notaMaxima" class="form-control" id="titulo">
            </div>

            <div class="mb-3">
              <label  class="form-label">Fecha de incio</label>
              <input v-model="dataTarea.fechaInicio" type="datetime-local" class="form-control" >
            </div>

            <div class="mb-3">
              <label  class="form-label">Fecha limite</label>
              <input v-model="dataTarea.fechaFin" type="datetime-local"  class="form-control">
            </div>

            <button type="button" class="btn btn-primary my-4" @click="enviar()" >Registrar</button>
    </div>
</template>

<script>

export default {
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataTarea:{
          titulo:null,
          descripcion:null,
          fechaInicio:null,
          fechaFin:null,
          notaMaxima:null,
          idTipo:2,
          idSeccion:this.$route.params.idSeccion,
      },
      invalid:false,
      register:false
    }
  },
  components:{
      
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
        this.dataTarea.titulo!=null &&
        this.dataTarea.descripcion!=null &&
        this.dataTarea.fechaInicio!=null &&
        this.dataTarea.fechaFin!=null &&
        this.dataTarea.notaMaxima!=null 
      ){
        this.dataTarea.fechaInicio = await this.formatear(this.dataTarea.fechaInicio) 
        this.dataTarea.fechaFin = await this.formatear(this.dataTarea.fechaFin) 
  
        await this.axios.post('evaluaciones/crearTarea', this.dataTarea).then((res)=>{
            if(res.data.data){
                this.dataTarea.titulo=null
                this.dataTarea.notaMaxima=null
                this.dataTarea.fechaInicio=null
                this.dataTarea.fechaFin=null
                this.dataTarea.descripcion=null
                this.register=true,
                setTimeout(() => {
                    this.register=false
                }, "3000")
            }
        })
      }else{
        this.invalid = true,
        setTimeout(() => {
            this.invalid=false
        }, "3000")
      }
    },

    eliminarPregunta(index){
        this.dataExamen.preguntas.splice(index,1)
    }

  },
  created(){
      
  }
}
</script>
