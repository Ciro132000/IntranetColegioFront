<template>
    <div>

        <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="register">
              <strong>Perfecto!</strong> Se registro el examen correctamente
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="invalid">
              <strong>Ups!</strong> LLene los campos correctamente
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

        <div class="mb-3">
            <label for="titulo" class="form-label">Titulo del examen</label>
            <input type="text" v-model="dataExamen.titulo" class="form-control" id="titulo">
        </div>

        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Descripcion del examen</label>
            <textarea  class="form-control"  v-model="dataExamen.descripcion" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div class="mb-3">
            <label for="titulo" class="form-label">Nota máxima</label>
            <input type="number"   v-model="dataExamen.notaMaxima"  class="form-control" id="titulo">
        </div>

        <div class="mb-3">
            <label  class="form-label">Fecha de incio</label>
            <input  type="datetime-local"  v-model="dataExamen.fechaInicio" class="form-control" >
        </div>

        <div class="mb-3">
            <label  class="form-label">Fecha limite</label>
            <input  type="datetime-local"  v-model="dataExamen.fechaFin"  class="form-control">
        </div>

        <hr>
        <h5>Preguntas del examen</h5>
        <button @click="aumneta()" class="form-control btn btn-info" >Agregar nueva pregunta</button>
        <div class="row g-3 align-items-center" v-for="(pregunta,index) in dataExamen.preguntas" :key="index">
            <div class="col-auto">
                <label class="col-form-label">Pregunta</label>
                <textarea v-model="dataExamen.preguntas[index].pregunta"  class="form-control"  rows="1"></textarea>
            </div>
            <div class="col-3">
                <label  class="col-form-label">Puntos</label>
                <input  v-model="dataExamen.preguntas[index].punto"  class="form-control"  type="number"/>
            </div>
            <div class="col-2">
                <label  class="col-form-label"></label>
                <button class="form-control btn btn-danger" @click="eliminarPregunta(index)"> <i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
        
        <button type="button" class="btn btn-primary my-4" @click="enviar()" >Registrar</button>
    </div>
</template>

<script>

export default {
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataExamen:{
          titulo:null,
          descripcion:null,
          fechaInicio:null,
          fechaFin:null,
          notaMaxima:null,
          idTipo:1,
          idSeccion:this.$route.params.idSeccion,
          preguntas:[],
      },
      invalid:false,
      register:false
    }
  },
  components:{
      
  },
  methods:{
      aumneta(){
          this.dataExamen.preguntas.unshift({})
      },

      formatear(date){
      date = new Date()
      const formatDate = (current_datetime)=>{
          let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
          return formatted_date;
      }

      return formatDate(date);
    },

    async enviar(){
      if(
        this.dataExamen.titulo!=null &&
        this.dataExamen.descripcion!=null &&
        this.dataExamen.fechaInicio!=null &&
        this.dataExamen.fechaFin!=null &&
        this.dataExamen.notaMaxima!=null &&
        this.dataExamen.preguntas.length > 0
      ){
        this.dataExamen.fechaInicio = await this.formatear(this.dataExamen.fechaInicio) 
        this.dataExamen.fechaFin = await this.formatear(this.dataExamen.fechaFin) 
  
        await this.axios.post('evaluaciones/crearExamen', this.dataExamen).then((res)=>{
            if(res.data.data){
                this.dataExamen.titulo=null
                this.dataExamen.notaMaxima=null
                this.dataExamen.fechaInicio=null
                this.dataExamen.fechaFin=null
                this.dataExamen.descripcion=null
                this.dataExamen.preguntas = [],
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