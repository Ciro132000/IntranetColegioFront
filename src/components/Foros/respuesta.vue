<template>
  <div class="cotainer-fluid px-5">
    <div class="row mt-5">
      <div class="col-md-3">
        <Menu/>
      </div>
      <div class="col-md-9">
        <div class="card">
            <div class="card-body">
                <h2> {{ dataForo.titulo }} </h2>
                <h4> {{ dataForo.pregunta }} </h4>
                Recuerda responder este foro y verificar las respuestas de tus compañeros para continuar con tu aprendizaje
            </div>
        </div>

        <div class="form-floating my-5" v-if="rol_user==3">
            <textarea v-model="sendRespuesta.respuesta" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
            <label for="floatingTextarea2">Escribir una respuesta</label>
            <button type="button" class="btn btn-primary btn-lg" @click="enviarRespuesta()">Enviar respuesta</button>
        </div>

        <hr>
        <h2>Respuestas</h2>
        <div class="card my-3" v-for="res in respuestas " :key="res.item">
            <div class="card-body">
                <h5> {{ res.nombreEstudiante }} {{ res.apellidoEstudiante}} - {{ res.codigoEstudiante }} </h5>
                <p>
                    Respuesta: {{ res.respuesta }}
                </p>
            </div>
        </div>

      </div>
    </div>
  </div>
  
</template>

<script>
import Menu from '../Secciones/menu'

export default {
  name: 'ForoRespuesta',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataForo:null,
      respuestas:null,
      sendRespuesta:{
          respuesta:null,
          idEstudiante:localStorage.getItem('id_usuario'),
          idForo:null
      }
    }
  },
  methods:{
      async traerData(){
            await this.axios.get(`foros/search?idForo=${this.$route.params.idForo}`).then((res)=>{
                this.dataForo = res.data.data
            })

            await this.axios.get(`foros/responses?idForo=${this.$route.params.idForo}`).then((res)=>{
                this.respuestas = res.data.data
            })
      },
       async enviarRespuesta(){
           this.sendRespuesta.idForo = this.dataForo.id
           if(this.sendRespuesta.respuesta !=null && this.sendRespuesta.idEstudiante !=null && this.sendRespuesta.idForo !=null){
               await this.axios.post(`foros/respuesta`, this.sendRespuesta).then((res)=>{
                    if(res.data.data){
                        this.traerData()
                        this.sendRespuesta.respuesta = ''
                    }
                })
           }
       }
  },
  components:{
      Menu
  },
  created(){
      this.traerData()
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