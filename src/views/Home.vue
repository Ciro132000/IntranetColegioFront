<template >
    <SideBar data-intro="La barra de tareas te permite navegar por las opciones que tienes" />
    <div :style="{ 'margin-left': sidebarWidth }">
      <div class="container-fluid custom" v-bind:style="styleObject">
      <NavBar />
      <div class="d-flex justify-content-end" data-intro="Puedes cambiar los colores de la web según tu preferencia">
        <input type="color" class="form-control form-control-color" id="exampleColorInput" v-model="styleObject.background" title="Choose your color">
        <input type="color" class="form-control form-control-color" id="exampleColorInput" v-model="styleObject.color" title="Choose your color">
      </div>
      <router-view data-intro="Acá podras observar el contenido de tus cursos"  />
      </div>
    </div>

</template>

<script>
import "intro.js/minified/introjs.min.css";
import SideBar from '@/components/Navs/SideBar.v1/SideBar.vue' // Navs/SideBar.v1/SideBar.vue
import NavBar from '@/components/Navs/NavBar/NavBar.vue'
import { sidebarWidth } from '@/components/Navs/SideBar.v1/state'

export default {
  name: 'Home',
  components:{
    SideBar,
    NavBar
  },
  setup() {
    return { sidebarWidth }
  },
  data(){
    return{
      styleObject: {
        background: '#ffffff',
        color:'#000000'
      }
    }
  },
  
  mounted() {
    let sesiones = localStorage.getItem("sesiones")
    if(sesiones==1){
      const introJS = require('intro.js');
      introJS.introJs().start();
      localStorage.removeItem("sesiones")
    }
  }
}
</script>

<style scoped>

.container-fluid{
  height: 100vh;
}

.row{
  height: 100vh;
  width: 100vw;
}

.container-fluid{
  margin: 0 !important;
  padding: 0 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

</style>

<style>

</style>
