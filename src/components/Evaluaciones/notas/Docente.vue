<template>
    <div>
        <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between" v-for="alumno in listaAlumnos" :key="alumno.index">
                    <div>
                        <img class="img-perfil" src="../../../assets/perfil.jpg" alt="">
                        <span>{{ alumno.nombre }} {{ alumno.apellido }} <strong>Cod.</strong> {{ alumno.codigo }}</span>
                    </div>

                    <div>
                        <div v-if="alumno.evaluaciones.length > 0">
                            <ul class="list-group list-group-flush">
                                <li v-for="evaluacion in alumno.evaluaciones" :key="evaluacion.index" >
                                    <p> <strong>Evaluación:</strong> {{ evaluacion.titulo }} - <strong>Calificación: {{ evaluacion.nota }} : {{ evaluacion.estado?'Aprobado':'Desaprobado' }}</strong></p>
                                </li>
                            </ul>
                        </div>
                        <div v-else>
                            <h5 class="text-warning">No presenta calificaciones</h5>
                        </div>
                    </div>

                </li>
            </ul>
    </div>
</template>

<script>


export default {
  name: 'Foros',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      idEvaluacion:this.$route.params.idEvaluacion,
      listaAlumnos:[]
    }
  },
  
  methods:{
      async traerInfo(){
          await this.axios.get(`students/searchSection?idSeccion=${this.$route.params.idSeccion}`).then(async(res)=>{
               this.listaAlumnos = res.data.data
               await this.axios.get(`evaluaciones/todosNotas?idSeccion=${this.$route.params.idSeccion}`).then((res)=>{
                   const notas = res.data.data
                   this.listaAlumnos.map((alumno, index) =>{
                        const found = notas.filter(element => element.idEstudiante === alumno.id);
                        if(found){
                            this.listaAlumnos[index].evaluaciones=found
                        }else{
                            console.log('nel') 
                        } 
                   })
               })
              })
      }
  },
  created(){
      this.traerInfo()
  }
}
</script>

<style scoped>
.img-perfil{
    border-radius: 50%;
    border: 2px solid rgb(158, 158, 158);
    width: 60px;
    height: 60px;
    margin-right: 2rem;
}
</style>