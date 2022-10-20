<template>
    <!-- <div class="container-fluid">
      <div class="row">
        <div class="col-md-1 ">
          <SideBar></SideBar>
        </div>
        <div class="col-md-11 ">
          <router-view/>
        </div>
      </div>
    </div> -->

    <SideBar />
    <div :style="{ 'margin-left': sidebarWidth }">
      <div class="container-fluid custom">
      <NavBar/>
      <router-view />
      </div>
    </div>

</template>

<script>

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
