<template>
    <div class="container">
        <h1 class="text-center my-3">Chat de comunicación</h1>
        <div class="row">
            <div class="col-2 chats" >
                <h3>Contactos</h3>
                <div class="item-card d-flex" v-for="item in chats" :key="item.index" @click="traerMensajes(item.idUsuario, item.img)">
                    <img :src="item.img" class="img-fluid rounded-circle" alt="...">
                    <h6>{{ item.nombre }} {{ item.apellido}}</h6>
                </div>
            </div>

            <div class="col-10 mensajes py-3" :class="{ 'd-flex align-items-end':idUser2 != null}">
                <h6 class="text-center" v-if="idUser2 == null">Seleccione un chat</h6>
                <div class="d-flex flex-column body-mensaje" v-else>
                    <h6 class="text-center" v-if="mensajes.length == 0">No se encontraron mensajes</h6>
                    <div class="d-flex flex-column body">
                        <div class="mensaje" v-for="m in mensajes" :key="m.index" :class="{ 'justify-content-end':m.idEnvia == idUser1}">
                            <div class="mt-3 mioi">
                                <img v-if="m.idEnvia != idUser1" :src="imgChat" class="img-fluid img-chat rounded-circle" alt="...">
                                <span :class="{ 'propio':m.idEnvia == idUser1}">{{ m.mensaje }}</span>
                            </div>
                        </div>
                    </div>

                    <form class="input-group mt-5" v-on:submit.prevent="enviarMensaje" v-if="idUser2 != null">
                        <input v-model="mensaje" type="text" class="form-control" placeholder="Escriba su mensaje ....." >
                        <button  type="submit" class="btn-send" ><i class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      idUser1:localStorage.getItem('id_user'),
      idDocente:localStorage.getItem('id_usuario'),
      idAula:localStorage.getItem('idAula'),
      idUser2:null,
      chats:[],
      mensajes:[],
      mensaje:'',
      imgChat:null
    }
  },
  methods:{
      async traerInfo(){
          let param = ''
          if(this.rol_user == 2){
              param = `idDocente=${this.idDocente}`
          }else if(this.rol_user == 3){
              param = `idAula=${this.idAula}`
          }
        await this.axios.get(`chats/list?${param}`).then((res)=>{
            this.chats = res.data.data
        })
      },

      async traerMensajes(idUser2,img){
        this.idUser2 = idUser2,
        this.imgChat = img
        await this.axios.get(`chats/chat?idUser1=${this.idUser1}&idUser2=${idUser2}`).then((res)=>{
            this.mensajes = res.data.data
        })
      },

      async enviarMensaje(){
        const dataSend = {
            mensaje: this.mensaje,
            idEnvia:this.idUser1,
            idRecibe:this.idUser2
        }
        await this.axios.post(`chats/sendMessage`, dataSend).then((res)=>{
            this.mensajes.push(res.data.data)
            this.mensaje=null
        })
      }
   
  },
  created(){
      this.traerInfo()
  },
  mounted() {
    const introJS = require('intro.js');
    introJS.introJs().start();
  }
}
</script>

<style scoped>
.body-mensaje{
    width: 100%;
}
.body{
    overflow: auto;
    max-height: 70vh;
}
.row{
    height: 80vh;
}
.mensajes{
    background: rgba(230, 230, 230, 0.479);
    border-radius: 30px;
}
.item-card img{
    height: 50px;
    width: 50px;
    border: 2px solid rgb(173, 173, 173);
    margin-right: 5px;
}
.item-card{
    align-items: center;
    margin-top: 1rem;
    border-radius: 25px;
    transition: 1s;
}
.item-card:hover{
    background: rgba(40, 161, 231, 0.596);
    cursor: pointer;
}

.propio{
    background: rgb(173, 173, 173) !important;
    border-radius: 20px 20px 0px 20px !important;
}
.mensaje{
    display: flex;
    height: 50%;
}

.mensaje span{
    background: rgba(36, 145, 246, 0.644);
    padding: 0.5rem 1rem;
    max-width: 50%;
    border-radius: 10px 20px 20px 0px;
    color: white;
    margin-top: 15rem;
    right: 5px;
}
.btn-send{
    border: none;
    font-size: 1.3rem;
    width: 3rem;
}
.img-chat{
    width: 40px;
    margin-right: 5px;
    border: 1px solid;
}
</style>