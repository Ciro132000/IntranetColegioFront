<template>
    <div>
        <div class="d-flex">
            <input type="date" class="form-control" id="start" name="trip-start"
                v-model="dia"
            >
            <button class="btn btn-primary" @click="buscar(dia)">Buscar</button>
        </div>
        <div v-if="idSeccion!=null" class="py-5">
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between" v-for="(alumno,index) in listaAlumnos" :key="index">
                    <div>
                        <img class="img-perfil" :src="alumno.img" alt="">
                        <span>{{ alumno.nombre }} {{ alumno.apellido }} <strong>Cod.</strong> {{ alumno.codigo }}</span>
                    </div>
                    <div v-if="disponible==true">
                        <label class="switch">
                        <input type="checkbox" :value="alumno.id" v-model="estudiantes[index].asistencia">
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div v-else>
    
                        <div v-if="alumno.asistencia" class="checked text-success" >
                            <i class="fas fa-check-square"></i>
                        </div>
                        <div v-else class="checked text-danger">
                            <i class="fas fa-window-close"></i>
                        </div>
                    </div>
                </li>
            </ul>
            <button class="btn btn-primary my-5" @click="enviar()">Enviar</button>
        </div>
        
        <div v-else>
            <h2 class="text-center pt-5">Seleccione una clase</h2>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      idSeccion:this.$route.query.seccion,
      idEvaluacion:this.$route.params.idEvaluacion,
      listaAlumnos:[],
      estudiantes:[],
      dia:null,
      asistencias:[],
      disponible:true
    }
  },
  
  methods:{
      async buscar(dia){
          await this.axios.get(`assistance/verify?idSeccion=${this.idSeccion}&dia=${dia}`).then(async(res)=>{
              console.log(res)
              this.asistencias=res.data.data
          })
          this.traerInfo()
      },
      async traerInfo(){
        await this.axios.get(`students/searchSection?idSeccion=${this.idSeccion}`).then(async(res)=>{
            this.listaAlumnos = res.data.data
            this.listaAlumnos.map((a)=>{
                let alumn = {
                    idEstudiante:a.id,
                    asistencia:false
                }
                this.estudiantes.push(alumn)
            })
        })

        await this.axios.get(`assistance/verify?idSeccion=${this.idSeccion}&dia=${this.dia}`).then(async(res)=>{
            if(res.data.data.length > 0){
                this.disponible=false
            }
              res.data.data.map((asis)=>{
                this.listaAlumnos.map((a,index)=>{
                    if(a.id === asis.idEstudiante){
                        this.listaAlumnos[index].asistencia= asis.asistencia
                    }
                })
              })
        })

      },

        async enviar(){

            const dateN = new Date(Date.now())
            const formatDate = (current_datetime)=>{
                let formatted_date = current_datetime.getFullYear() + "-"+(current_datetime.getMonth() + 1) + "-" +current_datetime.getDate() ;
                return formatted_date;
            }

            let dataSend={
                dia:formatDate(dateN),
                idSeccion:this.idSeccion,
                estudiantes:this.estudiantes
            }

            await this.axios.post(`assistance/register`,dataSend).then((res)=>{
                if(res.data.status){
                    alert('Registro existoso')
                }else if(!res.data.status){
                    alert('Ya se registro este dia')
                }
            })

        },
        formatFecha(){
            const dateN = new Date(Date.now())
            const formatDate = (current_datetime)=>{
                let formatted_date = current_datetime.getFullYear() + "-"+(current_datetime.getMonth() + 1) + "-" +current_datetime.getDate() ;
                return formatted_date;
            }
            return formatDate(dateN)
        }

  },
  created(){
      this.traerInfo()
      this.dia = this.formatFecha()
  },
  watch: { 
     '$route.query.seccion': {
        handler: function(search) {
            console.log(search)
            this.traerInfo()
            this.$router.go()
        }
      }
}
}
</script>

<style scoped>
.checked{
    font-size: 25px;
}
.img-perfil{
    border-radius: 50%;
    border: 2px solid rgb(158, 158, 158);
    width: 60px;
    height: 60px;
    margin-right: 2rem;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>