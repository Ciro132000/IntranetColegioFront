<template>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-start " v-for="item in itemsMenu" :key="item.index" :class="{ actived: $route.name == item.path }">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <router-link :to="{name:item.path, params:{idSeccion:$route.params.idSeccion} }" > 
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
        {name:'Contenido',path:'seccion'},
        {name:'Foros',path:'foros'},
        {name:'Evaluaciones',path:'evaluaciones'},
        {name:'Calificaciones',path:'notas'},
        {name:'Anuncios',path:'anuncios'},
        {name:'Grupos',path:'grupos'},
        {name:'Pendientes',path:'pendientes'}
      ]
    }
  },
  
}
</script>

<style scoped>

  a{
    color: rgba(126, 126, 126, 0.609);
  }

  .actived{
    border-left: 4px rgb(0,142,255) solid;;
  }

  .actived a{
    color: rgb(0,142,255) !important;
  }

</style>