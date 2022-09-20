import { createStore } from 'vuex'

export default createStore({
  state: {
    dataUsuario:null
  },
  mutations: {
    setUser(state, payload){
      state.dataUsuario = payload
    }
  },
  actions: {
    fetchUser({commit}, data){
      try {
        commit('setUser',data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
