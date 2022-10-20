<template>
  <nav class="navbar navbar-light bg-light">
  <div class="container-fluid justify-content-between">
    <div class="perfil">
      <router-link :to="{name:'perfiluser'}"> 
        <img :src="img" class="img">
          {{ nombre }} {{ apellido }}
      </router-link>
    </div>
    <div class="d-flex">
      <div class="dropdown">
        <i class="fas fa-bell alert" data-bs-toggle="dropdown">
          <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
          <span class="visually-hidden">New alerts</span>
          </span>
        </i>
        <div class="dropdown-menu">
          <Notificaciones/>
        </div>
      </div>
      <a class="navbar-brand" href="#">
        <img src="../../../assets/logo.png" alt="" width="30" height="24" class="d-inline-block align-text-top">
        Intranet educativa
      </a>
      <button class="singup" @click="singup">
        <i class="fas fa-power-off"></i>
      </button>
    </div>
  </div>
</nav>
</template>

<script>

import Notificaciones from './notificacion'

export default {
  name: 'NavBarComponent',
  data(){
    return{
      img:localStorage.getItem('imagen'),
      nombre:localStorage.getItem('nombre_user'),
      apellido:localStorage.getItem('apellido_user'),
      idUser:localStorage.getItem('id_user')
    }
  },
  methods:{
    singup(){
      localStorage.clear();
      this.$router.push({ name: 'Login' });
    }
  },
  components:{
    Notificaciones
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

.alert{
  padding: 0;
  font-size: 25px;
  margin: 10px ;
  cursor: pointer;
  transition: 1s;
}

.alert:hover{
  color: rgba(0, 103, 172, 0.582);
}

.singup:hover{
  color: red;
  text-shadow: 0 0 30px rgb(255, 0, 0);
}

.img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 1px black;
}

.perfil{
  background: rgba(211, 211, 211, 0.294);
  padding: 5px;
  border-radius: 25px;
  cursor: pointer;
  transition: 1s;
}

.perfil:hover{
  background: rgba(0, 116, 161, 0.329);
}

a{
  text-decoration: none;
  color: black;
}
</style>