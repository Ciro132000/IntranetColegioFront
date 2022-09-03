<template>
 
  <ul class="nav flex-column">
    <li class="nav-item">
        <router-link class="nav-link active" :to="{name: 'principal'}">Inicio</router-link>
    </li>
    <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'estudiantes'}">Estudiantes</router-link>
    </li>
    <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'docentes'}">Docentes</router-link>
    </li>

  </ul>
</template>


<script>

export default {
  name: 'SideBarComponent',
}
</script>