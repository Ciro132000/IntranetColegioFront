<template>
        <ul class="list-group ">
          <li class="list-group-item d-flex justify-content-between align-items-start" v-for="item in itemsMenu" :key="item.index">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <router-link :to="{name:'foros', params:{idSeccion:$route.params.idSeccion}  }"> 
                {{ item.name }}
                </router-link>  
              </div>
            </div>
            <!-- <span class="badge bg-primary rounded-pill">14</span> -->
          </li>
        </ul>
</template>

<script>


export default {
  name: 'Cursos',
  data(){
    return{
      itemsMenu:[
        {name:'Foros',path:'foros',icon:'fas fa-home'},
      ]
    }
  },
  
}
</script>

<style scoped>



</style>