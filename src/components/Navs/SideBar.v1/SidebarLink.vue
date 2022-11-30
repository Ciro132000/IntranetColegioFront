<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { collapsed } from './state'
import Cursos from '../../courses'

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true }
  },
  data(){
    return{
      curso:false
    }
  },
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    return { isActive, collapsed }
  },
  components:{
      Cursos
  },
  created(){
    const path = this.$route.path
    console.log(path.split('/'))
    const arr = path.split('/')
    if(arr[1] == 'secciones'){
      this.curso = true
    }
  },
  watch: { 
  '$route.path': {
    handler: function(path) {
      console.log(path)
      const arr = path.split('/')
      if(arr[1] == 'secciones'){
        this.curso = true
      }else{
        this.curso = false
      }
    },
    deep: true,
    immediate: true
  }
}
}
</script>

<template>
<div>
  <router-link v-if="to!='none'" :to="{name:to}" class="link" :class="{ active: $route.name === to, collap: collapsed }"> 
    <i class="icon" :class="icon" />
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
  <div v-else class="dropend">
    <a class="link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" :class="{ active: $route.name === to || curso, collap: collapsed }">
      <i class="icon" :class="icon" />
      <transition name="fade">
        <span v-if="!collapsed">
          <slot />
        </span>
      </transition>
    </a>
    <div class="dropdown-menu">
      <Cursos/>
    </div>
  </div>
</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
  margin: 0.5em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  color: white;
  text-decoration: none;
  font-size: 1rem;
}
.link:hover {
  background-color: var(--sidebar-item-hover);
}
.link.active {
  background-color: var(--sidebar-item-active);
}
.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
  font-size:1.6rem !important;
}
.collap .icon{
  width: 55px !important;
}
.dropdown-menu{
  padding: 1rem 0px;
  background: rgba(195, 195, 195, 0.527);
}
</style>