import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// Import mutation and action Functions
import mutations from '@/store/mutations'
import actions from '@/store/actions'


export default new Vuex.Store({
  state: {
    ordersList: [],
  },

  mutations: mutations,

  actions: actions,

  getters: {
    // Get Orders List
    ordersList: state => state.ordersList,
  }
})