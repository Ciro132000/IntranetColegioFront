<template>
  <nav class="navbar navbar-light bg-light">
  <div class="container-fluid justify-content-end">
    <a class="navbar-brand" href="#">
      <img src="../../../assets/logo.png" alt="" width="30" height="24" class="d-inline-block align-text-top">
      Intranet educativa
    </a>
    <button class="singup" @click="singup">
      <i class="fas fa-power-off"></i>
    </button>
  </div>
</nav>
</template>

<script>

export default {
  name: 'NavBarComponent',
  methods:{
    singup(){
      localStorage.removeItem("access_token");
      localStorage.removeItem("rol_user");
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>

<style scoped>


.singup {
  color: rgba(255, 0, 0, 0.335);
  font-size: 1.5rem;
  border: none;
  background: none;
  transition: 1s;
}

.singup:hover{
  color: red;
  text-shadow: 0 0 30px rgb(255, 0, 0);
}

</style>