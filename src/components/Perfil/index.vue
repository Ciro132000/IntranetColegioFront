<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-3 contenedor">
                <h5 class="text-center">Perfil</h5>
                <form>
                    <img :src="dataUsuario.perfil.img" alt="">
                    <div class="mb-3">
                        <input class="form-control form-control-sm" @change="obtenerFile" type="file">
                    </div>


                    <div class="mb-3 row">
                        <label  class="col-form-label">Estado</label>
                            <input type="text" class="form-control" v-model="dataUsuario.perfil.estado">
                    </div>
                    
                    <div class="mb-3 row">
                        <label  class=" col-form-label">Descripcion</label>    
                            <textarea class="form-control" v-model="dataUsuario.perfil.descripcion" ></textarea>
                    </div>

                    <button class="btn btn-primary" @click="modificarPerfil()"> Registrar perfil</button>
                </form>
            </div>
            <div class="mx-5 col-8 contenedor">
                <h5 class="text-center">Datos de usuario</h5>
                <form >
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label">Nombres</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control"  v-model="dataUsuario.datos.nombre">
                        </div>
                        <label class="col-sm-2 col-form-label">Apellidos</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" v-model="dataUsuario.datos.apellido" >
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label">Codigo</label>
                        <div class="col-sm-4">
                            <input type="text" readonly class="form-control-plaintext"  v-model="dataUsuario.datos.codigo">
                        </div>
                        <label class="col-sm-2 col-form-label">DNI</label>
                        <div class="col-sm-4">
                            <input type="text" readonly class="form-control-plaintext"  v-model="dataUsuario.datos.dni">
                        </div>
                    </div>
                    <button class="btn btn-primary" @click="modificarDatos()"> Modificar datos</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataUsuario:[],
      imgIpunt:null,
      id_user:localStorage.getItem('id_user'),
    }
  },

  methods:{
      async traerInfo(){
        await this.axios.get(`perfil`).then((res)=>{
            this.dataUsuario = res.data.data
            localStorage.setItem("nombre_user",res.data.data.datos.nombre)
            localStorage.setItem("apellido_user",res.data.data.datos.apellido)
            localStorage.setItem("codigo",res.data.data.datos.codigo)
            localStorage.setItem("imagen",res.data.data.perfil.img)
        })
      },

      obtenerFile(e){
          let file = e.target.files[0];

          this.imgIpunt = file
      },
      async modificarPerfil(){
            let formData = new FormData();
            formData.append('descripcion',this.dataUsuario.perfil.descripcion)
            formData.append('file',this.imgIpunt)
            formData.append('estado',this.dataUsuario.perfil.estado)
            await this.axios.post(`perfil?idUsuario=${this.id_user}`,formData).then((res)=>{
                if(res.data.data){
                    this.traerInfo()
                    alert('Registro actualizado')
                }
            })
      },

      async modificarDatos(){
          let data ={
              nombre: this.dataUsuario.datos.nombre,
              apellido: this.dataUsuario.datos.nombre.apellido
          }
          let query = ''
          if(this.rol_user == 2){
              query = 'docente'
          }else if(this.rol_user == 3){
              query = 'alumno'
          } 
            await this.axios.post(`perfil/${query}?idUsuario=${this.id_user}`,data).then((res)=>{
                if(res.data.data){
                    this.traerInfo()
                    alert('Registro actualizado')
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
        border-radius: 50%;
        height: 80px;
        width: 80px;
        display: block;
        margin: auto;
        border: solid 1px black;
        margin-bottom: 5px;
    }

    .contenedor{
        background: rgba(231, 231, 231, 0.198);
        padding: 1rem;
        border-radius: 25px;
    }
</style>