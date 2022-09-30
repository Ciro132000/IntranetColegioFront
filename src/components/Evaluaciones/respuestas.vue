<template>
  <div class="cotainer-fluid px-5">
    <div class="row mt-5">
      <div class="col-md-3">
        <Menu/>
      </div>
      <div class="col-md-9">

          <div v-if="rol_user == 2">
            <h2>Tablero de notas</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between" v-for="(alumno,index) in listaAlumnos" :key="index">
                    <div>
                        <router-link 
                        :to="{name:'revisarEvaluacion', 
                        params:{
                            idSeccion:$route.params.idSeccion,
                            idEvaluacion:$route.params.idEvaluacion,
                            tipoEvaluacion:$route.params.tipoEvaluacion,
                            idEstudiante:alumno.id
                            }  }"> 
                        
                            <img class="img-perfil" src="../../assets/perfil.jpg" alt="">
                            <span>{{ alumno.nombre }} {{ alumno.apellido }} <strong>Cod.</strong> {{ alumno.codigo }}</span>
                        </router-link>
                    </div>

                    <div>
                        <div v-if="alumno.nota">
                            <h5>Calificación:  <input type="number" class="nota-rectificar" v-model="listaAlumnos[index].nota.nota">/{{ dataEvaluacion.notaMaxima }} <button class="btn btn-success btn-rectificar" @click="rectificar(index)">Rectificar</button> </h5>
                            <h5>Estado: {{ alumno.nota.estado?'Aprobado':'Desaprobado' }} </h5>

                        </div>
                        <div v-else>
                            <h5 class="text-warning">No calificado</h5>
                        </div>
                    </div>

                </li>
            </ul>
          </div>
          <div v-else>

            <div class="card">
            <div class="card-body">
                <h2>{{ dataEvaluacion.titulo }}</h2>
                <p> {{ tipoEvaluacion === 1 ? 'Descripción:':'Pregunta de la tarea: ' }} {{ dataEvaluacion.descripcion }} </p>
                <p> <strong>Nota:</strong> Esta evaluación tiene como nota máxima <strong> {{ dataEvaluacion.notaMaxima }} </strong> </p>
            </div>
            </div>
            <div v-if="rol_user == 3 && alumnoHabilitado == false">
                <div class="alert alert-warning mt-4" role="alert">
                    <strong>Usted ya respondio esta evaluación</strong>, sus respuestas ya fueron enviadas
                </div>
            </div>

            <div v-else>
                <div v-if="tipoEvaluacion === 1" class="my-4">
                    <h4>Preguntas del examen</h4>
                    <div class="card my-5" v-for="(pregunta,index) in dataPreguntas" :key="index">
                        <div class="card-header d-flex justify-content-between">
                            <div>
                                <h5>{{ pregunta.pregunta}}</h5> 
                            </div>
                            <div>
                                Pts. {{ pregunta.punto}}
                            </div>
                        </div>
                        <div class="card-body">
                            <textarea v-model="respuestasExamen[index].respuesta" placeholder="Escribe tu respuesta aquí ....." class="text-respuesta" name="" id="" ></textarea>
                        </div>
                    </div>
                    <button class="btn btn-success" @click="enviarExamen()">Enviar</button>
                </div>
                <div v-if="tipoEvaluacion === 2" class="my-4">
                    <h4>Respuesta a la tarea</h4>
                    <form enctype="multipart/form-data">
                        <div class="form-floating my-3" >
                            <textarea class="form-control" v-model="respuestaTarea.respuesta" placeholder="Leave a comment here" id="Textarea2" style="height: 100px"></textarea>
                            <label for="Textarea2">Escribir una respuesta</label>
                        </div>

                        <div class="my-3" >
                            <label >Seleccione un archivo de ser necesario</label>
                            <input class="form-control" @change="obtenerFile" type="file">      
                        </div>

                        <button type="button" class="btn btn-primary btn-lg" @click="enviarTarea()">Enviar respuesta</button>
                    </form>
                </div>
            </div>
          </div>

      </div>
    </div>
  </div>
  
</template>

<script>

import Menu from '../Secciones/menu'

export default {
  name: 'Foros',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      idEvaluacion:this.$route.params.idEvaluacion,
      dataEvaluacion:[],
      dataPreguntas:[],
      tipoEvaluacion:null,
      respuestasExamen:[],
      alumnoHabilitado:true,
      respuestaTarea:{
          file:null,
          respuesta:null,
          idEvaluacion:this.$route.params.idEvaluacion
      },
      listaAlumnos:[]
    }
  },
  components:{
      Menu
  },
  methods:{
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
                            idEvaluacion:this.idEvaluacion
                        }
                        this.respuestasExamen.push(pregunta)
                    })
                }else{
                    this.dataEvaluacion=res.data.data[0]
                }
                
              })
          if(this.rol_user == 2){
              await this.axios.get(`students/searchSection?idSeccion=${this.$route.params.idSeccion}`).then(async(res)=>{
               this.listaAlumnos = res.data.data
               await this.axios.get(`evaluaciones/notas?idEvaluacion=${this.$route.params.idEvaluacion}`).then((res)=>{
                   const notas = res.data.data
                   this.listaAlumnos.map((alumno, index) =>{
                        const found = notas.find(element => element.idEstudiante === alumno.id);
                        if(found){
                            this.listaAlumnos[index].nota=found
                        }else{
                            console.log('nel') 
                        } 
                   })
               })
              })

          }
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
      obtenerFile(e){
          let file = e.target.files[0];

          this.respuestaTarea.file = file
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
      },
      async rectificar(index){
          const data = this.listaAlumnos[index].nota
          const dataSend = {
              estado: null,
              nota: data.nota
          }
          if(data.nota > this.dataEvaluacion.notaMaxima/2){
            dataSend.estado = true
          }else{
              dataSend.estado = false
          }
          await this.axios.post(`evaluaciones/rectificarNota?idNota=${data.id}`,dataSend).then((res)=>{
                if(res.data.data){
                    alert('Rectificación correcta')
                    this.infoEvaluacion()
                }
            })
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
.nota-rectificar{
    width: 45px;
}

.btn-rectificar{
    width: 100px;
    font-size: 15px;
    padding: 0;
    margin: auto;
}
</style>