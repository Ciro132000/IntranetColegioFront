<template>
  <div class="cointer-fluid">
    <div class="row">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
          Crear nuevo foro <i class="fas fa-plus-square"></i>
        </button>
      </div>
    </div>
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

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear un foro</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="register">
              <strong>Perfecto!</strong> Se registro el foro correctamente
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="invalid">
              <strong>Ups!</strong> LLene los campos correctamente
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="mb-3">
              <label for="titulo" class="form-label">Titulo del foro</label>
              <input type="text" v-model="dataForo.titulo" class="form-control" id="titulo">
            </div>

            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Pregunta del foro</label>
              <textarea v-model="dataForo.pregunta" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <div class="mb-3">
              <label  class="form-label">Fecha de incio</label>
              <input v-model="dataForo.fechaInicio" type="datetime-local" class="form-control" >
            </div>

            <div class="mb-3">
              <label  class="form-label">Fecha limite</label>
              <input v-model="dataForo.fechaFin" type="datetime-local"  class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="enviar()">Registrar</button>
          </div>
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