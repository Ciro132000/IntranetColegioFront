<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <div>
        <router-link class="nav-link" :to="{name: 'principal'}">
          <img class="logo" src="../../../assets/logo.png" alt="">
        </router-link>
    </div>

    <SidebarLink v-for="(item) in itemSideBar" :key="item.index" :to="item.path" :icon="item.icon" class="d-flex flex-column text-center" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" data-bs-content="Right popover">
        {{item.name}}
    </SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>


<script>
  import SidebarLink from './SidebarLink'
  import { collapsed, toggleSidebar, sidebarWidth } from './state'
  export default {
    props: {},
    components: { SidebarLink },
    setup() {
      return { collapsed, toggleSidebar, sidebarWidth }
    },
    data(){
        return{
            itemSideBar: [
                {name:'Inicio',path:'principal',icon:'fas fa-home'},
                {name:'Estudiantes',path:'estudiantes',icon:'fas fa-user-graduate'},
                {name:'Docentes',path:'docentes',icon:'fas fa-chalkboard-teacher'},
                {name:'Secciones',path:'secciones',icon:'fas fa-school'}
            ]
        }
    }
  }

</script>

<style>

    .logo{
        width: 100%;
    }
  :root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #3385a5;
  --sidebar-item-active: #265bd667;
  }
</style>
  
<style scoped>

.sidebar{
  color: white;
  background: rgb(0,142,255);
  background: linear-gradient(180deg, rgba(0,142,255,1) 9%, rgba(120,222,255,1) 60%, rgba(180,251,255,1) 100%);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;


  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(0, 100, 194, 0.7);
  transition: 0.2s linear;
  font-size: 1.5rem;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

</style>