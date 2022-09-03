<template>
  <div id="nav">
    <router-link :to="{name: 'principal'}">Home</router-link> |
    <router-link :to="{name: 'estudiantes'}">est</router-link> |
    <router-link :to="{name: 'docentes'}">sdsa</router-link> |
  </div>
</template>

<script>

export default {
  name: 'SideBarComponent',
}
</script>