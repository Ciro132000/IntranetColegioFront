<template>
  <div id="nav">
    <SideBar></SideBar>
  </div>
  <router-view/>
</template>

<script>

import SideBar from '@/components/Navs/SideBar.vue'

export default {
  name: 'Home',
  components:{
    SideBar
  }
}
</script>
