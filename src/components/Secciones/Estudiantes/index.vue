<template>
  <div >
    <h1 class="text-center">contenido del curso</h1>
    <div class="row d-flex flex-row-reverse" v-if="rol_user == 2 ">
        <button class="btn btn-primary btn-modulo" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-plus"></i>Nuevo modulo
        </button>

        <div class="dropdown-menu menu-modulo">
            <input type="text" class="form-control" v-model="createModulo.nombre" placeholder="Nombre del modulo">
            <button type="submit" class="btn btn-success my-2" @click="enviarModulo()">Registrare</button>
        </div>
    </div>
    <hr>
    <div class="card my-3" v-for="data in dataCourse" :key="data.index">
        <div class="card-header d-flex justify-content-between">
            <div>
                <h4>{{ data.nombre }}</h4> 
            </div>
            <div v-if="rol_user == 2 ">
                <a data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-plus text-success" ></i>
                </a>

                <div class="dropdown-menu menu-modulo">
                    <form enctype="multipart/form-data">
                        <div class="form-floating my-3" >
                            <textarea class="form-control" v-model="createLeccion.nombre" placeholder="Leave a comment here" id="Textarea2" style="height: 100px"></textarea>
                            <label for="Textarea2">Nombre de la lección</label>
                        </div>

                        <div class="my-3" >
                            <label >Seleccione un archivo</label>
                            <input class="form-control" @change="obtenerFile" type="file">      
                        </div>

                        <button class="btn btn-success" @click="subirMaterial(data.id)">Registrar</button>
                    </form>
                </div>

            </div>
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="leccion in data.lecciones" :key="leccion.index">
                    <i class="fas fa-link"></i> 
                    <router-link :to="{name:'leccion', params:{idSeccion:$route.params.idSeccion, idLeccion:leccion.id}  }"> 
                        {{ leccion.nombre}}
                    </router-link>     
                    <a :href="leccion.archivo" download target="_blank" class="text-success descarga" ><i class="fas fa-download"></i></a>     
                </li>
            </ul>
        </div>
    </div>

  </div>
</template>

<script>


export default {
  name: 'Cursos',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataCourse:[],
      createModulo:{
          nombre:null,
          idSeccion:this.$route.params.idSeccion
      },
      createLeccion:{
          file:null,
          nombre:null
      }
    }
  },

  methods:{
      async traerInfo(){
        await this.axios.get(`courses/content?idSeccion=${this.$route.params.idSeccion}`).then((res)=>{
            this.dataCourse = res.data.data
            this.dataCourse.map(async (d,index) =>{
                await this.axios.get(`courses/content?idModulo=${d.id}`).then((res)=>{
                    this.dataCourse[index].lecciones = res.data.data
                })
            })
        })
      },
      async enviarModulo(){
          if(this.createModulo.nombre != null){
              await this.axios.post(`courses/createModule`, this.createModulo).then((res)=>{
                  if(res.data.data){
                      this.createModulo.nombre = null
                      this.traerInfo()
                  }
              })
          }else{
              alert('Agregue un nombre al modulo')
          }
      },
      obtenerFile(e){
          let file = e.target.files[0];

          this.createLeccion.file = file
      },
      async subirMaterial(idModulo){
          if(
              this.createLeccion.file !=null ||
              this.createLeccion.nombre != null
          ){
              let formData = new FormData();
              formData.append('nombre',this.createLeccion.nombre)
              formData.append('file',this.createLeccion.file)
              formData.append('idModulo',idModulo)
            await this.axios.post(`courses/createLesson`,formData).then((res)=>{
                if(res.data.data){
                    this.$router.go(0)
                }
            })
          }else{
              alert('Agregue nombre y archivo a la lección')
          }
      }
  },
  created(){
      this.traerInfo()
  }
  
}
</script>

<style scoped>
.descarga{
    margin-left: 3rem;
}

a{
    font-size: 20px;
}

.fa-link{
    margin-right: 1rem;
    font-size: 21px;
}

.fa-plus{
    margin-right: 1rem;
    cursor: pointer;
}

.btn-modulo{
    width: 200px;
}

.menu-modulo{
    max-width: 500px;
    padding: 1rem;
}

</style>