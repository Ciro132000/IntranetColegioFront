<template>
  <div class="container my-4">
    <h1 class="text-center">Secciones</h1>
    <div class="row">
      <!-- Button trigger modal -->
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Registrar sección 
          </button>

          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalAula">
            Registrar nueva aula
          </button>

          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCurso">
            Registrar nuevo curso
          </button>

      </div>


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

                <form @submit="checkForm">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Curso de la seccion *</label>
                    <select v-model="courseSelect" class="form-select">
                        <option value="null">Seleccione un curso </option>
                        <option v-for="item in courses" :key="item.index" :value="item" >{{ item.nombre }} - {{ item.idNivel == '1' ? 'Primaria':'Secundaria' }}</option>
                      </select>
                  </div>

                  <div class="mb-3" v-if="courseSelect != null">
                    <label for="exampleInputEmail1" class="form-label">Seleccione el aula</label>
                    <select v-model="dataSecciones.idAula" class="form-select">
                        <option value="null">Seleccione un docente</option>
                        <option v-for="item in aulas.filter(i => i.idNivel === courseSelect.idNivel)" :key="item.index" :value="item.id" >{{ item.grado }} {{ item.seccion}} - {{ item.nivel}}</option>
                      </select>
                  </div>

                  <div class="mb-3" v-if="courseSelect != null">
                    <label for="exampleInputEmail1" class="form-label">Docente a asignar (Opcional)</label>
                    <select v-model="dataSecciones.idDocente" class="form-select">
                        <option value="null">Seleccione un docente</option>
                        <option v-for="item in docentes.filter(i => i.idNivel === courseSelect.idNivel)" :key="item.index" :value="item.id" >{{ item.nombre }}</option>
                      </select>
                      <div  class="form-text">Puede elegirlo luego</div>
                  </div>
                  
                  <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
      
              </div>
              
              <div v-if="isRegister">
                <h3>La seccion fue registrada con éxito.</h3>
                <p>Registada como seccion {{ dataRegistrada.codigo }} y asignada al profesor {{ profesor(dataRegistrada.idDocente) }}</p>
              </div>

            </div>
            </div>
          </div>
      </div>

      <div class="modal fade" id="ModalAula" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Registrar nueva aula</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div v-if="mensajeAlerta" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Upss!</strong> {{ mensajeAlerta }}.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>

              <div v-if="isRegisterAula" class="alert alert-info alert-dismissible fade show" role="alert">
                <strong>Perfecto!</strong> registro guardado correctamente.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>


              <label for="exampleInputEmail1" class="form-label">Nivel educativo del aula</label>
              <select v-model="registrarAula.idNivel" class="form-select">
                <option value="null">Seleccione el nivel educativo </option>
                <option v-for="item in niveles" :key="item.index" :value="item.id" >{{ item.nombre }}</option>
              </select>

              <div v-if="registrarAula.idNivel != null">
                <div class="mb-3" >
                  <label for="exampleInputEmail3" class="form-label">Grado</label>
                  <div v-if="registrarAula.idNivel == 1">
                    <select v-model="registrarAula.grado" class="form-select">
                      <option value="null">Seleccione el grado </option>
                      <option v-for="item in [1,2,3,4,5,6]" :key="item.index" :value="item" >{{ item }}</option>
                    </select>
                  </div>
                  <div v-else>
                    <select v-model="registrarAula.grado" class="form-select">
                      <option value="null">Seleccione el grado </option>
                      <option v-for="item in [1,2,3,4,5]" :key="item.index" :value="item" >{{ item }}</option>
                    </select>
                  </div>
                </div>

                <div class="mb-3" >
                  <label for="exampleInputEmail3" class="form-label">Sección</label>
                  <div>
                    <select v-model="registrarAula.seccion" class="form-select">
                      <option value="null">Seleccione la sección </option>
                      <option v-for="item in ['A','B','C','D','E','F']" :key="item.index" :value="item" >{{ item }}</option>
                    </select>
                  </div>

                </div>

              </div>

              <button type="submit" class="btn btn-primary" @click="enviarAula()" >Enviar</button>
            </div>
            </div>
          </div>
      </div>

      <div class="modal fade" id="ModalCurso" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Registro de seccion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div v-if="mensajeAlerta" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Upss!</strong> {{ mensajeAlerta }}.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>

              <div v-if="isRegisterCurso" class="alert alert-info alert-dismissible fade show" role="alert">
                <strong>Perfecto!</strong> registro guardado correctamente.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>  

              <div class="mb-3" >
                <label class="form-label">Nombre del curso</label>
                <input v-model="registrarCurso.nombre" class="form-control" type="text">
              </div>

              <div class="mb-3" >
                <label class="form-label">Horas semanales del curso</label>
                <input v-model="registrarCurso.horas" class="form-control" type="number">
              </div>

              <div class="mb-3" >
                 <label for="exampleInputEmail1" class="form-label">Nivel educativo del curso</label>
                  <select v-model="registrarCurso.idNivel" class="form-select">
                    <option value="null">Seleccione el nivel educativo </option>
                    <option v-for="item in niveles" :key="item.index" :value="item.id" >{{ item.nombre }}</option>
                  </select>
              </div>
              
              
              <button type="submit" class="btn btn-primary" @click="enviarCurso()" >Enviar</button>

            </div>
            </div>
          </div>
      </div>


      </div>
    </div>
    <div class="row my-5">

    <div class="row">
      <h3 class="text-center">Todas las secciones</h3>
      <div class="table-container">
        <table class="table ">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Curso</th>
              <th scope="col">Nivel</th>
              <th scope="col">Docente</th>
              <th scope="col">Horario</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in todosSecciones" :key="i">
              <th scope="row">{{ item.codigo }}</th>
              <td>{{ item.curso.nombre }}</td>
              <td>{{ item.nivel }}</td>
              <td>
                <div v-if="item.idDocente == null" class="d-flex">
                    <select class="form-select form-select-md select-table" aria-label="Default select example" v-model="selectDocente[i]">
                      <option v-for="(item,index) in docentes.filter(i => i.idNivel === item.idNivel)" :key="index" :value="item.id">{{ item.nombre }}</option>
                    </select>
                    <button type="button" class="btn btn-info" @click="asignarSeccion(item.id,i)">Registrar</button>
                </div>
                <div v-else>
                  {{ item.codigoDocente }}
                </div>
              </td>
              <td>
                <div v-if="item.horarios.length > 0" class="d-flex flex-column">
                  <ul>
                    <li v-for="h in item.horarios" :key="h.index" >
                      {{ dias(h.dia) }} : {{ h.horaInicio }} - {{ h.horaFinal }}
                    </li>
                  </ul>
                  <router-link class="editar" :to="{name:'asignarHorario', params:{idAula:item.idAula ,idSeccion:item.id } }"> 
                    Editar <i class="fas fa-edit"></i>
                  </router-link>
                </div>
                <div v-else>
                    <router-link :to="{name:'asignarHorario', params:{idAula:item.idAula ,idSeccion:item.id } }"> 
                      <button type="button" class="btn btn-success">
                        Asignar
                      </button>
                    </router-link>
                  
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Secciones',
  data(){
    return{
      isRegister:false,
      error:false,
      alert:'',
      niveles:null,
      todosSecciones:null,
      dataRegister:null,
      courseSelect:null,
      dataSecciones:{
        idCurso:null,
        idDocente:null,
        idAula:null
      },
      courses:null,
      docentes:null,
      dataRegistrada:null,
      aulas:null,
      selectDocente:[],
      registrarAula:{
        grado:null,
        seccion:null,
        idNivel:null
      },
      registrarCurso:{
        nombre:null,
        horas:null,
        idNivel:null
      },
      mensajeAlerta:null,
      isRegisterAula:false,
      isRegisterCurso:false,
    }
  },
  methods:{
 
    dias(dia){
      switch (dia) {
        case 1:
          return 'Lunes'
        case 2:
          return 'Martes'
        case 3:
          return 'Miercoles'
        case 4:
          return 'Jueves'
        case 5:
          return 'Viernes'
      }
    },

    checkForm: function(e){
      if(this.courseSelect && this.dataSecciones.idAula){
        this.dataSecciones.idCurso = this.courseSelect.id
        this.enviar()
        return true;
      }else{
        alert('Llene todos los datos')
      }

      e.preventDefault()
    },

    async asignarSeccion(idSection, index){
      if(!this.selectDocente[index]){
        alert('Elija docente')
        return
      }
      const data = {
        idDocente:this.selectDocente[index],
        idSection
      }
      await this.axios.post('sections/assign', data).then((res)=>{
        if(res.data.data){
          window.location.reload()
        }
      })
 
    },

    async traerNiveles(){
      await this.axios.get('level').then((res)=>{
        this.niveles = res.data.data
      })
    },

    async traerSecciones(){
      await this.axios.get('sections').then((res)=>{
        this.todosSecciones = res.data.data
      })

      await this.todosSecciones.map(async (seccion, index) =>{
        await this.axios.get(`sections/schedule?idSeccion=${seccion.id}`).then((res)=>{
          this.todosSecciones[index].horarios = res.data.data
        }
        )
      })

    },

    async traerData(){
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

      await this.axios.get('classroom').then((res)=>{
        this.aulas = res.data.data
      })
    },

    async enviar(){
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
    },

    profesor(id){
        const doce = this.docentes.find((docente)=> docente.id === id)
        return doce.nombre + ' ' + doce.apellido + ' con código '+doce.codigo
    },

    async enviarAula(){
      if(
        this.registrarAula.grado != null &&
        this.registrarAula.seccion != null &&
        this.registrarAula.idNivel != null
      ){
        await this.axios.post('classroom/create', this.registrarAula ).then((res)=>{
          if(res.data.data){ 
            this.registrarAula.idNivel=null
            this.registrarAula.grado=null 
            this.registrarAula.seccion=null
            this.isRegisterAula=true;
          }

          if(res.data.msg){
            this.mensajeAlerta = res.data.msg
          }
        })
      }else{
        this.mensajeAlerta = "Llene los campos requeridos"
        setTimeout(() => {
          this.mensajeAlerta=null
        }, "3000")
      }
    },

    async enviarCurso(){
      if(
        this.registrarCurso.nombre != null &&
        this.registrarCurso.horas != null &&
        this.registrarCurso.idNivel != null
      ){
        await this.axios.post('courses/create', this.registrarCurso ).then((res)=>{
          if(res.data.data){
            this.registrarCurso.nombre = null 
            this.registrarCurso.horas = null 
            this.registrarCurso.idNivel = null
            this.isRegisterCurso=true;
            console.log(res.data.data)
          }

          if(res.data.msg){
            this.mensajeAlerta = res.data.msg
          }
        })
      }else{
        this.mensajeAlerta = "Llene los campos requeridos"
        setTimeout(() => {
          this.mensajeAlerta=null
        }, "3000")
      }
    }
  },
  created(){
    this.traerNiveles();
    this.traerSecciones();
    this.traerData();
  }
}
</script>

<style scoped>
.select-table{
  width: 30%;
}
a{
  text-decoration: none;
  color: white;
}
.editar{
  color: black;
  background: rgba(231, 231, 231, 0.472);
  width: 100px;
  text-align: center;
  border-radius: 10px;
}
.editar i{
  margin-left: 0.5rem;
}
.table-container{
  width: 90%;
  margin: auto;
}
</style>