<template>
  <div class="container my-4">
    <h1 class="text-center">Estudiantes</h1>
    <div class="row">
            <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Registrar Alumno
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Registro de alumno</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div v-if="!isRegister">
                <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Algo salio!</strong> {{ alert }}.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Nombres</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" v-model="dataEstudiante.nombre">
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Apellidos</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" v-model="dataEstudiante.apellido">
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail2" class="form-label">DNI</label>
                  <input type="number" class="form-control" id="exampleInputEmail2"  v-model="dataEstudiante.dni">
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Nivel</label>
                  <select v-model="dataEstudiante.idNivel" class="form-select">
                      <option value="null">Seleccione el nivel educativo </option>
                      <option v-for="item in niveles" :key="item.index" :value="item.id" >{{ item.nombre }}</option>
                    </select>
                </div>

                <div class="mb-3" v-if="dataEstudiante.idNivel != null">
                  <label for="exampleInputEmail3" class="form-label">Grado</label>
                  <div v-if="dataEstudiante.idNivel == 1">
                    <select v-model="dataEstudiante.grado" class="form-select">
                      <option value="null">Seleccione el grado </option>
                      <option v-for="item in [1,2,3,4,5,6]" :key="item.index" :value="item" >{{ item }}</option>
                    </select>
                  </div>
                  <div v-else>
                    <select v-model="dataEstudiante.grado" class="form-select">
                      <option value="null">Seleccione el grado </option>
                      <option v-for="item in [1,2,3,4,5]" :key="item.index" :value="item" >{{ item }}</option>
                    </select>
                  </div>
                </div>
                
                <button class="btn btn-primary" @click="enviar()" >Enviar</button>
              </div>
              
              <div v-if="isRegister">
                <h3>El alumno fue registrado con éxito</h3>
              </div>

            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5">
      

    <div class="row">
      <h3>Todos los alumnos</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">DNI</th>
            <th scope="col">Nivel</th>
            <th scope="col">Grado</th>
            <th scope="col">Aula</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in todosAlumnos" :key="item.index">
            <th scope="row">{{ item.codigo }}</th>
            <td>{{ item.nombre }}</td>
            <td>{{ item.apellido }}</td>
            <td>{{ item.dni}}</td>
            <td>{{ item.nivel }}</td>
            <td>{{ item.grado }}</td>
            <td>{{ item.aula == null ? 'Sin asignar' : item.aula }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EstudiantesComponent',
  data(){
    return{
      isRegister:false,
      error:false,
      alert:'',
      niveles:null,
      todosAlumnos:null,
      dataRegister:null,
      dataEstudiante:{
        nombre:null,
        apellido:null,
        grado:null,
        dni:null,
        idNivel:null
      },
    }
  },
  methods:{
    async traerNiveles(){
      await this.axios.get('level').then((res)=>{
        this.niveles = res.data.data
      })
    },
    async traerAlumnos(){
      await this.axios.get('students').then((res)=>{
        this.todosAlumnos = res.data.data
      })
    },
    async enviar(){
      let valores = Object.values(this.dataEstudiante)
      let countNull = null;
      for(let i=0; i<valores.length; i++){
        if(valores[i] == null){
          countNull += 1;
        }
      }
      console.log(this.dataEstudiante)
      if(countNull > 0){
        alert('Llene todos los datos')
      }else{
        await this.axios.post('students/register', this.dataEstudiante ).then((res)=>{
          if(res.data.data){
            this.traerAlumnos();
            this.isRegister=true;
          }

          if(res.data.msg){
            this.error = true
            this.alert = res.data.msg
          }

          console.log(res.data)
        })
      }
    }
  },
  created(){
    this.traerNiveles();
    this.traerAlumnos();
  }
}
</script>