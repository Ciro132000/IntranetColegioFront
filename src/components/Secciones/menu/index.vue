<template>
        <ul class="list-group ">
          <li class="list-group-item d-flex justify-content-between align-items-start" v-for="item in itemsMenu" :key="item.index">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <router-link :to="{name:item.path, params:{idSeccion:$route.params.idSeccion}  }"> 
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
        {name:'Anuncios',path:'evaluaciones'}
      ]
    }
  },
  
}
</script>

<style scoped>



</style>