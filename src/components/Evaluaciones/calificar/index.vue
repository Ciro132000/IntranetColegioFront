<template>
  <div class="cotainer-fluid px-5">
    <div class="row mt-5">
      <div class="col-md-2">
        <Menu/>
      </div>
      <div class="col-md-10">
            <div class="card">
                <div class="card-body d-flex justify-content-between">
                    <div>
                        <h2>{{ dataEvaluacion.titulo }}</h2>
                        <p> {{ tipoEvaluacion === 1 ? 'Descripción:':'Pregunta de la tarea: ' }} {{ dataEvaluacion.descripcion }} </p>
                        <p> <strong>Nota:</strong> Esta evaluación tiene como nota máxima <strong> {{ dataEvaluacion.notaMaxima }} </strong> </p>
                    </div>

                    <div v-if="tipoEvaluacion == 1">
                        <h2 class="mb-3">Nota: {{ sumaNota(notas) }}</h2>
                    </div>

                    <div v-if="tipoEvaluacion == 2">
                        <h2 class="mb-3">Nota: <input class="nota" v-model="notaTarea" type="number">/{{ dataEvaluacion.notaMaxima }}</h2>
                    </div>
                    
                </div>
            </div>

            <div>
                <div v-if="tipoEvaluacion == 1" class="my-4">
                    <h4>Preguntas del examen</h4>
                    <div class="card my-5" v-for="(pregunta,index) in dataPreguntas" :key="index">
                        <div class="card-header d-flex justify-content-between">
                            <div>
                                <h5>{{ pregunta.pregunta}}</h5> 
                            </div>
                            <div class="d-flex">
                                Pts. <input type="number" class="nota" v-model="notas[index].nota" :max="pregunta.punto">/{{ pregunta.punto }}
                            </div>
                        </div>
                        <div class="card-body"  >
                            <p>Respuesta: {{ pregunta.respuesta?pregunta.respuesta[0].respuesta:'NO RESPONDIO' }}</p>
                        </div>
                    </div>

                    <h5 class="mb-3">Nota total: {{ sumaNota(notas) }}</h5>

                    <button class="btn btn-success" @click="enviarNota()">Enviar</button>
                </div>

                <div class="my-4" v-if="tipoEvaluacion == 2 && respuestas[0]">
                    <h4>Respuesta a la tarea</h4>
                    <div class="form-floating my-3" >
                        <p>Respuesta: {{ respuestas[0].respuesta }}</p>
                    </div>
 
                    <div class="my-3" v-if="respuestas[0].archivo != null">
                        <h4>Archivo adjunto</h4>    
                        <iframe class="archivo" :src="respuestas[0].archivo" frameborder="0"></iframe>
                    </div>

                    <button type="button" class="btn btn-primary btn-lg" @click="enviarNota()">Calificar</button>
                </div>
            </div>
          </div>

    </div>
  </div>
  
</template>

<script>

import Menu from '../../Secciones/menu'

export default {
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      idEvaluacion:this.$route.params.idEvaluacion,
      dataEvaluacion:[],
      dataPreguntas:[],
      tipoEvaluacion:null,
      respuestasExamen:[],
      alumnoHabilitado:true,
      respuestas:[],
      notas:[],
      notaTarea:0
    }
  },
  components:{
      Menu
  },
  methods:{
    sumaNota(array) {
        let suma = 0
        array.map((item) => {
            if(item.nota === null || item.nota === ''){
                suma += 0
            }else{
                suma += item.nota
            }
        })
        return suma
    },

    async enviarNota(){
         const tipo = this.$route.params.tipoEvaluacion;
              if(tipo === 'examen'){
                  let data={
                      nota:this.sumaNota(this.notas),
                      idEvaluacion:this.$route.params.idEvaluacion,
                      idEstudiante:this.$route.params.idEstudiante,
                      notas:[...this.notas]
                  }

                  if(data.nota > this.dataEvaluacion.notaMaxima/2){
                      data.estado = true
                  }else{
                      data.estado = false
                  }

                    await this.axios.post(`evaluaciones/calificarExamen`, data).then((res)=>{
                        console.log(res.data.data)
                    })

                  console.log(data)
                }else if(tipo === 'tarea'){
                    let data={
                      nota:this.notaTarea,
                      idEvaluacion:this.$route.params.idEvaluacion,
                      idEstudiante:this.$route.params.idEstudiante
                    }

                    if(data.nota > this.dataEvaluacion.notaMaxima/2){
                      data.estado = true
                    }else{
                      data.estado = false
                    }

                    await this.axios.post(`evaluaciones/calificarTarea`, data).then((res)=>{
                        console.log(res.data.data)
                    })
                  
                }
    },

      async infoEvaluacion(){
              const tipo = this.$route.params.tipoEvaluacion;
              let query = ''
              if(tipo === 'examen'){
                  query = 'idExamen',
                  this.tipoEvaluacion = 1
              }else if(tipo === 'tarea'){
                  query = 'idTarea',
                  this.tipoEvaluacion = 2
              }
              await this.axios.get(`evaluaciones/getContent?${query}=${this.idEvaluacion}`).then((res)=>{
                if(res.data.data.preguntas){
                    this.dataEvaluacion=res.data.data.evaluacion
                    this.dataPreguntas=res.data.data.preguntas
                    const preguntas = res.data.data.preguntas;
                    preguntas.map((p) =>{
                        const pregunta={
                            idPregunta:p.id,
                            nota:0
                        }
                        this.notas.push({...pregunta, idEstudiante:this.$route.params.idEstudiante})
                    })
                }else{
                    this.dataEvaluacion=res.data.data[0]
                }
                
              })
          
            await this.axios.get(`evaluaciones/verRespuestas?${query}=${this.idEvaluacion}&idEstudiante=${this.$route.params.idEstudiante}`).then((res)=>{
                this.respuestas = res.data.data
                this.dataPreguntas.map((pregunta,index)=>{
                    const found = this.respuestas.filter(element => element.idPregunta === pregunta.id);
                    this.dataPreguntas[index].respuesta = found
                })
            })
      },
      async enviarExamen(){
          await this.axios.post(`evaluaciones/respuestaExamen`,this.respuestasExamen).then((res)=>{
            console.log(res.data.data)
            if(res.data.data){
                alert('Examen enviado correctamente')
                this.$router.go(0)
            }
          })  
      },
      async verificarDisponiblidad(){
          await this.axios.get(`evaluaciones/verificarExamen?idEvaluacion=${this.idEvaluacion}`).then(async (res)=>{
            console.log(res.data.status)
            if(res.data.status===0){
                this.alumnoHabilitado=false
            }else{
                await this.axios.get(`evaluaciones/verificarTarea?idEvaluacion=${this.idEvaluacion}`).then((res)=>{
                    if(res.data.status===0){
                        this.alumnoHabilitado=false
                    }
                }) 
            }
          }) 
      },
      async enviarTarea(){
          if(
              this.respuestaTarea.file !=null ||
              this.respuestaTarea.respuesta != null
          ){
              let formData = new FormData();
              formData.append('respuesta',this.respuestaTarea.respuesta)
              formData.append('file',this.respuestaTarea.file)
              formData.append('idEvaluacion',this.respuestaTarea.idEvaluacion)
            await this.axios.post(`evaluaciones/respuestaTarea`,formData).then((res)=>{
                if(res.data.data){
                    alert('Tarea enviada correctamente')
                    this.$router.go(0)
                }
            })
          }else{
              alert('Responda la tarea')
          }
      }
  },
  created(){
      this.verificarDisponiblidad()
      this.infoEvaluacion()
  }
}
</script>

<style scoped>
.text-respuesta{
    width: 100%;
    min-height: 150px;
    border: none !important;
    outline: none;
    display: block;
    resize: none;
}
.img-perfil{
    border-radius: 50%;
    border: 2px solid rgb(158, 158, 158);
    width: 60px;
    height: 60px;
    margin-right: 2rem;
}
.nota{
    width: 50px;
}
.archivo{
    width: 100%;
    min-height: 500px;
}
</style>