<template>
    <div class="px-3 py-2 card">
        <div class="notificacion">
            <div v-if="isNotification==false" >
                <h6 class="text-center">Notificaciones desactivadas</h6>
            </div>
            <ul v-else class="list-group list-group-flush">
                <li v-for="n in listNotification" :key="n.index" class="list-group-item">
                    <h6 class="fw-bold">{{ n.tipoNotificación }}</h6>
                    <p>mensaje</p>
                </li>
            </ul>
        </div>
        <div class="d-flex justify-content-center">
            <label class="switch">
                <input type="checkbox" v-model="isNotification" @change="desactivar($event)">
                <span class="slider round"></span>
            </label>
        </div>
    </div>
</template>

<script>

export default {
  name: 'NavBarComponent',
  data(){
    return{
        idAula:localStorage.getItem('idAula'),
        isNotification:localStorage.getItem('notificacion'),
        idPerfil:localStorage.getItem('perfil'),
        listNotification:[]
    }
  },
  methods:{
    async traerInfo(){
        if(this.isNotification !=false){
            await this.axios.get(`notification?idAula=${this.idAula}`).then((res)=>{
                this.listNotification=res.data.data
            })
        }
    },
    async desactivar(){
        await this.axios.post(`notification/desactivate?idPerfil=${this.idPerfil}&isNotificacion=${this.isNotification}`).then((res)=>{
            console.log(res)
        }) 
        this.localStorage.setItem("notificacion",this.isNotification)
        this.traerInfo()
    }
  },
  created(){
      this.traerInfo()
  }
}
</script>

<style scoped>
    .card{
        height: 200px;
    }

    .notificacion{
        height: 90%;
        overflow-y: auto;
    }

    .notificacion::-webkit-scrollbar {
        display: none;
    }

    
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 25px;
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
        height: 22px;
        width: 22px;
        left: 4px;
        bottom: 1.5px;
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