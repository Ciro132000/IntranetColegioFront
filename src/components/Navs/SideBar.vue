<template>
  <div class="sideBar">
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'principal'}">
          <img class="logo" src="../../assets/logo.png" alt="">
        </router-link>
      </li>
      <li class="nav-item" v-for="(item,index) in itemSideBar" :key="index"  >
          <router-link class="nav-link" :to="{name: item.path}">
             <i :class="item.icon"></i>
             {{ item.name }}
          </router-link>
      </li>
    </ul>
  </div>
</template>


<script>

export default {
  name: 'SideBarComponent',
  data(){
    return{
      itemSideBar: [
        {name:'Inicio',path:'principal',icon:'fas fa-home'},
        {name:'Estudiantes',path:'estudiantes',icon:'fas fa-user-graduate'},
        {name:'Docentes',path:'docentes',icon:'fas fa-chalkboard-teacher'},
      ]
    }
  }
}
</script>

<style scoped>
.sideBar{
  background: rgb(0,142,255);
  background: linear-gradient(180deg, rgba(0,142,255,1) 9%, rgba(120,222,255,1) 60%, rgba(180,251,255,1) 100%);
  height: 100%;
  width: 100%;
}

a{
  text-decoration: none;
  color: white;
}

.logo{
  max-width: 100%;
}
</style>