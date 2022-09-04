<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1 ">
          <SideBar></SideBar>
        </div>
        <div class="col-md-11 ">
          <router-view/>
        </div>
      </div>
    </div>
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

<style scoped>

.row{
  height: 100vh;
  width: 100vw;
}

.container-fluid{
  margin: 0 !important;
  padding: 0 !important;
}

</style>
