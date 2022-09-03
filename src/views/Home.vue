<template>
    <div class="container">
      <div class="row">
        <div class="col">
          <SideBar></SideBar>
        </div>
        <div class="col">
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
