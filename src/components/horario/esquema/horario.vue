<template>
  <div>
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
                    Disponible
                    <input type="checkbox" v-model="op" :value="{dia:i,inicio:item.inicio,fin:item.fin}">
                </td>
			</tr>
		</tbody>
	</table>
    Horarios seleccionados: {{ op }}
  </div>
</template>

<script>

export default {
  name: 'PrincipalComponent',
  data(){   
        return{
            noDisponible:[{dia: 1, inicio: "8:00:00", fin: "8:45:00"}],
            op:[],
            horarioItem:[
                {
                    inicio:'8:00:00',
                    fin:'8:45:00',
                    dias:[1,2,3,4,5]
                },
                {
                    inicio:'8:45:00',
                    fin:'9:30:00',
                    dias:[1,2,3,4,5]
                },
                {
                    inicio:'9:30:00',
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
    color: transparent;
}


</style>