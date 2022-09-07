<template>
  <div class="container my-4">
    <h1 class="text-center">Secciones</h1>
    <div class="row">
            <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Registrar sección 
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Registro de seccion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div v-if="!isRegister">
                <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Algo salio!</strong> {{ alert }}.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Curso de la seccion</label>
                  <select v-model="dataSecciones.idCurso" class="form-select">
                      <option value="null">Seleccione un curso </option>
                      <option v-for="item in courses" :key="item.index" :value="item.id" >{{ item.nombre }}</option>
                    </select>
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Docente a asignar</label>
                  <select v-model="dataSecciones.idDocente" class="form-select">
                      <option value="null">Seleccione un docente </option>
                      <option v-for="item in docentes" :key="item.index" :value="item.id" >{{ item.nombre }}</option>
                    </select>
                </div>
                
                <button class="btn btn-primary" @click="enviar()" >Enviar</button>
              </div>
              
              <div v-if="isRegister">
                <h3>La seccion fue registrada con éxito.</h3>
                <p>Registada como seccion {{ dataRegistrada.codigo }} y asignada al profesor {{ profesor(dataRegistrada.idDocente) }}</p>
              </div>

            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5">
      

    <div class="row">
      <h3>Todas las secciones</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Curso</th>
            <th scope="col">Nivel</th>
            <th scope="col">Docente</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in todosSecciones" :key="item.index">
            <th scope="row">{{ item.codigo }}</th>
            <td>{{ item.curso.nombre }}</td>
            <td>{{ item.nivel }}</td>
            <td>{{ item.idDocente == null ? 'Sin asignar' : item.codigoDocente }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SeccionesComponent',
  data(){
    return{
      isRegister:false,
      error:false,
      alert:'',
      niveles:null,
      todosSecciones:null,
      dataRegister:null,
      dataSecciones:{
        idCurso:null,
        idDocente:null
      },
      courses:null,
      docentes:null,
      dataRegistrada:null
    }
  },
  methods:{
    async traerNiveles(){
      await this.axios.get('level').then((res)=>{
        this.niveles = res.data.data
      })
    },
    async traerSecciones(){
      await this.axios.get('sections').then((res)=>{
        this.todosSecciones = res.data.data
      })

      await this.axios.get('courses').then((res)=>{
        this.courses = res.data.data
      })

      await this.axios.get('teachers').then((res)=>{
        this.docentes = res.data.data
      })

      await this.todosSecciones.map( async (item)=>{
          const curo = await this.courses.find((curs) => curs.id === item.idCurso)
          item.curso = curo
      })

    },
    async enviar(){
      let valores = Object.values(this.dataSecciones)
      let countNull = null;
      for(let i=0; i<valores.length; i++){
        if(valores[i] == null){
          countNull += 1;
        }
      }
      console.log(countNull)
      if(countNull > 0){
        alert('Llene todos los datos')
      }else{
        await this.axios.post('sections/register', this.dataSecciones ).then((res)=>{
            this.dataRegistrada = res.data.data
          if(res.data.data){
            this.traerSecciones();
            this.isRegister=true;
          }

          if(res.data.msg){
            this.error = true
            this.alert = res.data.msg
          }
        })
      }
    },
    profesor(id){
        const doce = this.docentes.find((docente)=> docente.id === id)
        return doce.nombre + ' ' + doce.apellido + ' con código '+doce.codigo
    }
  },
  created(){
    this.traerNiveles();
    this.traerSecciones();
  }
}
</script>
