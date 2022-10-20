<template>
    <ul class="list-group ">
          <li class="list-group-item d-flex justify-content-between align-items-start" v-for="item in dataMenu" :key="item.index">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <router-link :to="{name:'asistencia', query: {seccion: item.id}  }"> 
                {{ item.curso }} {{ item.codigo}}
                </router-link>  
              </div>
            </div>
          </li>
    </ul>
</template>

<script>
export default {
  name: 'Foros',
  data(){
    return{
      rol_user:localStorage.getItem('rol_user'),
      dataMenu:[]
    }
  },
  
  methods:{
      async traerInfo(){
        await this.axios.get(`teachers/sections?idDocente=${localStorage.getItem('id_usuario')}`).then((res)=>{
            this.dataMenu=res.data.data
        })
      }
  },
  created(){
      this.traerInfo()
  }
}
</script>