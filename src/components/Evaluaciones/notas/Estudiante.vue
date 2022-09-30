<template>
    <div>
        <ul class="list-group my-4">
          <li class="list-group-item d-flex justify-content-between" v-for="evaluacion in listaEvaluaciones" :key="evaluacion.index">
            <div>
              <h5>{{ evaluacion.titulo }}</h5>
              <samp>Tipo de evaluación: {{ evaluacion.idTipo == 1 ? 'Examen':'Tarea' }}</samp>
            </div>

            <div class="d-flex flex-column ">
              <span>{{ evaluacion.nota }}/{{ evaluacion.notaMaxima }}</span>
              <span class="fw-bold" :class="[evaluacion.estado == 1 ? 'text-success' : 'text-danger', errorClass]">
                {{ evaluacion.estado == 1 ? 'Aprobado':'Desaprobado' }}
              </span>
            </div>

          </li>
        </ul>

        <span >Nota:Las otras evaluaciones aun no se calificaron </span>
    </div>
</template>

<script>


export default {
  name: 'Foros',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      idSeccion:this.$route.params.idSeccion,
      listaEvaluaciones:[]
    }
  },
  
  methods:{
      async traerInfo(){
          await this.axios.get(`students/notas?idSeccion=${this.idSeccion}`).then((res)=>{
              this.listaEvaluaciones = res.data.data
              console.log(res)
          })
      }
  },
  created(){
      this.traerInfo()
  }
}
</script>

<style scoped>

</style>