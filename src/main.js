import 'bootstrap/dist/css/bootstrap.css'
import 'mdb-vue-ui-kit/css/mdb.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'https://intranetapi.herokuapp.com/api'
// axios.defaults.baseURL = 'http://localhost:3000/api'

import 'bootstrap/dist/js/bootstrap.js'

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
