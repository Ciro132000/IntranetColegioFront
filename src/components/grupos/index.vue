<template>

  <div class="cotainer-fluid px-5">
    <div class="row mt-5">
      <div class="col-md-3">
        <Menu/>
      </div>
      <div class="col-md-9">

        <div class="row" v-if="rol_user==2">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#crearEvaluacion">
                Crear nueva anuncio <i class="fas fa-plus-square"></i>
                </button>
            </div>
        </div>

        <hr>

        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item" v-for="g in grupos" :key="g.index">
                <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush'+g.id" aria-expanded="true">
                    Grupo - {{ g.nombre }}
                </button>
                </h2>
                <div :id="'flush'+g.id" class="accordion-collapse collapse" >
                    <div class="accordion-body">
                        <div v-if="g.alumno.length == 0">Este grupo no tiene alumno asignados</div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" v-for="a in g.alumno" :key="a.index">
                                {{ a.nombre }} {{ a.apellido }} - Cod. {{ a.codigo }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>


      <!-- Modal -->
    <div class="modal fade" id="crearEvaluacion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear un grupo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="alert" class="alert alert-success" role="alert">
                El grupo fue creado satisfactoriamente!!
            </div>
            <div>
                <div class="mb-3">
                    <label  class="form-label">Nombre del grupo</label>
                    <input type="text" class="form-control" v-model="creaGrupo.nombre">
                </div>

                <label  class="form-label">Seleccione los alumnos</label>
                <div class="mb-3 alumnos">
                    <div class="form-check" v-for="a in alumnos" :key="a.index">
                        <input class="form-check-input" type="checkbox" v-model="creaGrupo.idEstudiantes" :value="a.id">
                        <label class="form-check-label " :class="[a.idGrupo != null?'text-danger':'text-success']">
                            {{ a.nombre }} {{ a.apellido }} {{ a.idGrupo != null?'- Pertenece a un grupo':'' }}
                        </label>
                    </div>
                </div>

                <button class="btn btn-success" @click="crearGrupo()"> Registrar </button>

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
  name: 'SeccionesComponent',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      grupos:[],
      alert:false,
      creaGrupo:{
          nombre:null,
          idSeccion:this.$route.params.idSeccion,
          idEstudiantes:[]
      },
      alumnos:[]
    }
  },
  components:{
      Menu
  },
  methods:{
    async traerInfo(){
        await this.axios.get(`groups?idSeccion=${this.$route.params.idSeccion}`).then((res)=>{
            this.grupos=res.data.data
            this.grupos.map( async(g,index)=>{
                await this.axios.get(`groups/students?idGroup=${g.id}`).then((res)=>{
                    this.grupos[index].alumno = res.data.data
                })
            })
        })

        await this.axios.get(`sections/students?idSeccion=${this.$route.params.idSeccion}`).then((res)=>{
            this.alumnos=res.data.data
        })

    },
    formatear(date){
      const dateN = new Date(date)
      const formatDate = (current_datetime)=>{
          let formatted_date =  current_datetime.getDate() + "/"+(current_datetime.getMonth() + 1) + "/" +current_datetime.getFullYear()  + " a las " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() + " horas";
          return formatted_date;
      }

      return formatDate(dateN);
    },

    async crearGrupo(){
        if(
            this.creaGrupo.nombre != null  
        ){
            await this.axios.post(`groups/create`,this.creaGrupo).then((res)=>{
                if(res.data.data){
                    this.creaGrupo.nombre=null
                    this.creaGrupo.idEstudiantes=[]
                    this.traerInfo()
                    setTimeout(() => {
                        this.alert = false
                    }, 2000)
                }
            })
        }else{
            alert('Complete los datos')
        }
    }


  },
  created(){
      this.traerInfo()
  }
}
</script>

<style scoped>

img{
  max-width: 500px;
  display: block;
  margin: auto;
}

.alumnos{
    height: 200px;
    overflow: auto;
}

</style>