<template>
  <div class="container">
      <h1 class="text-center">Horario del docente</h1>
      <hr>
      
    <table class="cal">
		<thead>
			<tr>
				<th></th>
				<th>Lun</th>
				<th>Mar</th>
				<th>Mié</th>
				<th>Jue</th>
				<th>Vie</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in horarioItem" :key="item.index">
				<td class="horas">{{ item.inicio }} a {{ item.fin }}</td>
				<td v-for="i in item.dias" :key="i.index">
                    <div v-if="i.curso"> 
                        {{ i.curso }} <br/>
                        {{ i.seccion }}
                    </div>
                    <div v-else>
                        ----  
                    </div>
                </td>
			</tr>
		</tbody>
	</table>
  </div>
</template>

<script>

export default {
    name: 'horarioDocente',
    data(){   
        return{
            dataAula:[],
            horarioItem:[
                {
                    inicio:'08:00:00',
                    fin:'08:45:00',
                    dias:[1,2,3,4,5]
                },
                {
                    inicio:'08:45:00',
                    fin:'09:30:00',
                    dias:[1,2,3,4,5]
                },
                {
                    inicio:'09:30:00',
                    fin:'10:15:00',
                    dias:[1,2,3,4,5]
                },
                {
                    inicio:'10:30:00',
                    fin:'11:15:00',
                    dias:[1,2,3,4,5]
                },
                {
                    inicio:'11:15:00',
                    fin:'12:00:00',
                    dias:[1,2,3,4,5]
                },
                {
                    inicio:'12:00:00',
                    fin:'12:45:00',
                    dias:[1,2,3,4,5]
                }
            ]

        }
    },
    methods:{
        async horarios(){
            await this.axios.get(`teachers/schedule?idDocente=${localStorage.getItem('id_usuario')}`).then((res)=>{
                this.dataAula=res.data.data
                this.comprobar()
            })
        },

        comprobar(){
            this.horarioItem[0].dias[2] = 'hola'
            this.dataAula.map((aula)=>{
                this.horarioItem.map((horario,index)=>{
                    if( horario.inicio === aula.horaInicio && horario.fin === aula.horaFinal){
                        this.horarioItem[index].dias[aula.dia - 1] = aula
                    }
                })
            })
        }
    },
    created(){
        this.horarios();
    }
}
</script>

<style scoped>
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
}

input[type="checkbox"]:checked {
    background-color: #00f8365e;
}

thead> tr > th { 
    background-color:#29a6F6; 
	border: 1px solid  white;
	border-radius: 10px ; height:50px;
	text-align:center;
	vertical-align:center;
    font-size:25px;  
    margin: 1%; 
    padding:1%;
}

tr:nth-child(odd) {
	border-radius: 10px 10px 10px 10px;
	padding:1%;
	margin:1%;
}

tr:nth-child(even) {
	border-radius: 10px 10px 10px 10px;
	padding:1%;
	margin:1%;
}
tr:last-child {
	border-radius: 0 0 10px 10px;
	padding:1%;
	margin:1%;
}
tr:last-child > td:first-child {
	border-radius: 10px ;
	padding:1%;
	margin:1%;
}
tr:last-child > td:last-child {
	padding:1%;
	margin:1%;
	border-radius: 10px;
}

table.cal>tbody> th,td
 {
	display:in-line;	
	width:10%;margin: 2%;
	padding:2%;
	height:60px;
	border: 2px outset white;
	vertical-align:top;
	text-align: center;
	border-radius: 10px;
    position:relative;
}
th {
	text-align: center;
	background: #ffffff;
	border: 2px outset grey;
}

.horas{
	margin: 0;
	padding: 0;
	background-color:#FFD180 ;
}

.select{
    background-color: #00f8365e;
}
.notAvailable{
    background-color: #f8000c5e;
    color: white;
}


</style>