<template>

  <div class="cotainer-fluid px-5">
    <div class="row mt-5">
      <div class="col-md-2">
        <Menu/>
      </div>
      <div class="col-md-10">

        <div class="row" v-if="rol_user==2">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#crearEvaluacion">
                Crear nueva anuncio <i class="fas fa-plus-square"></i>
                </button>
            </div>
        </div>

        <hr>

        <div class="card my-3" v-for="anuncio in anuncios" :key="anuncio.index" >
            <div class="card-header d-flex justify-content-between">
                <h4>
                    {{ anuncio.asunto }}
                </h4>
                <h6>
                    {{ formatear(anuncio.createdAt) }}
                </h6>
            </div>
            <div class="card-body">
                <h5 class="card-title">
                      <p>{{ anuncio.descripcion }}</p>
                </h5>
            </div>
        </div>
      </div>
    </div>


      <!-- Modal -->
    <div class="modal fade" id="crearEvaluacion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Crear un anuncio</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="alert" class="alert alert-success" role="alert">
                El anuncio fue creado satisfactoriamente!!
            </div>
            <div class="mb-3">
                <label  class="form-label">Asunto</label>
                <input type="text" class="form-control" v-model="creaAnuncio.asunto">
            </div>

            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Descripcion del anuncio</label>
                <textarea v-model="creaAnuncio.descripcion" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <button class="btn btn-primary" @click="crearAnuncio()" >Enviar</button>

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
      anuncios:[],
      creaAnuncio:{
          asunto:null,
          descripcion:null,
          idSeccion:this.$route.params.idSeccion
      },
      alert:false
    }
  },
  components:{
      Menu
  },
  methods:{
    async traerInfo(){
        await this.axios.get(`announcements?idSeccion=${this.$route.params.idSeccion}`).then((res)=>{
            this.anuncios=res.data.data
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

    async crearAnuncio(){
        await this.axios.post(`announcements/create`, this.creaAnuncio).then((res)=>{
            if(res.data.data){
                this.creaAnuncio.asunto = null,
                this.creaAnuncio.descripcion = null
                this.alert = true
                this.traerInfo()
                setTimeout(() => {
                    this.alert = false
                }, 2000)
            }
        })
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

</style>