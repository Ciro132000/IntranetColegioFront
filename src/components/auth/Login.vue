<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-6 d-flex">
              <img class="img-login" src="../../assets/login/login2.jpg" alt="">
          </div>

          <div class="col-6 bg-login d-flex flex-column">
            <img class="logo-web " src="../../assets/logo.png" alt="">
            <div v-if="alert" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Credenciales incorrectas!</strong> intentelo denuevo.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <form class="form-login" @submit.prevent="singin">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Código institucional</label>
                    <input type="text" class="form-control input-border" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="admin" v-model="form.usuario">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Constraseña</label>
                    <input type="password" class="form-control input-border" id="exampleInputPassword1" placeholder="123456789" v-model="form.contraseña">
                </div>
                <button type="submit" class="btn-custom">Ingresar</button>
            </form>
            
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name:"Login",
    data() {
        return {
        form: {
            usuario: null,
            contraseña: null,
        },
        alert:false
        };
    },
    methods:{
        ...mapActions(['fetchUser']),

        async singin(){
            await this.axios.post("auth/login", this.form).then((res)=>{

            this.fetchUser(res.data.data)

            let authToken = res.data.data.token;
            let rol = res.data.data.user.idRol

            localStorage.setItem("rol_user", rol)
            localStorage.setItem("access_token", authToken);
            localStorage.setItem("id_usuario",res.data.data.dataUser.id)
            
            if(rol===3){
                localStorage.setItem("idAula", res.data.data.dataUser.idAula)
            }

            
            window.location.reload(true);
            }).catch( (error) => {
                this.alert = true
                setTimeout(() => {
                    this.alert = false
                }, "3000")
                console.log(error.response.status)
            });

            
        }
    }
}
</script>

<style scoped>
.row{
    height: 100vh;
}

.img-login{
    max-width:80%;
    display: block;
    margin:auto;
}

.alert{
    width: 50%;
    margin: auto;
    margin-bottom: 1rem;
    margin-top: 1rem;
}

.bg-login{
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(38,202,255,1) 36%, rgba(36,165,255,1) 100%);
}

.form-login{
    width: 50%;
    margin: auto;
    margin-top: 0;
}

.input-border{
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.513);
    border: none;
}

.btn-custom{
    padding: 2px 25px;
    background: rgba(0, 60, 224, 0.781);
    border: none;
    border-radius: 25px;
    color: white;
}

.logo-web{
    width: 20%;
    display: block;
    margin: auto;
    margin-bottom: 3rem;
}
</style>