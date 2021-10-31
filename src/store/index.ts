import Vue from 'vue'
import Vuex from 'vuex'
import UsersModule from '@/store/modules/users'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    UsersModule,
  }
})

export default store