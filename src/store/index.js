import Vue from 'vue'
import Vuex from 'vuex'
import infoProducts from './infoProducts'
import infoCategories from './infoCategories'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    name: '',
    products: infoProducts,
    categories: infoCategories,
    selectedOrders: [],
    historyOrders: []
  },
  mutations: {
    addName (state, name) {
      state.name = name
    },
    setCategories (state, { title, categoryName }) {
      const id = state.categories[state.categories.length - 1].id + 1
      const body = {
        title,
        categoryName,
        id
      }
      state.categories.push(body)
    },
    setProducts (state, { name, category, price }) {
      const id = state.products[state.products.length - 1].id + 1
      const body = {
        name,
        category,
        price: Number(price),
        id: id
      }
      state.products.push(body)
    },
    addOrderToHistory (state, { orders, time }) {
      state.historyOrders.push({
        orders,
        time
      })
    },
    clearPriceAndOrders (state) {
      state.selectedOrders = []
    },
    removeHistoryOrder (state, id) {
      state.historyOrders.splice(id, 1)
    },
    deleteCategory (state, category) {
      state.products.forEach(product => {
        if (product.category === category.categoryName) {
          deleteProduct(state, product)
        }
      })

      state.categories = state.categories.filter(_category => _category.id !== category.id)
    },

    deleteProduct (state, product) {
      deleteProduct(state, product)
    },

    addtProductToOrders (state, product) {
      state.selectedOrders.push(product)
    },

    deleteProductFromOrdersProduct (state, product) {
      state.selectedOrders = state.selectedOrders.filter(_product => {
        return _product.orderProductId !== product.orderProductId
      })
    }
  },
  actions: {
    setName ({ commit }, name) {
      commit('addName', name)
    },
    addCategories ({ commit }, body) {
      commit('setCategories', body)
    },
    addItem ({ commit }, body) {
      commit('setProducts', body)
    },
    setOrdersToHistory ({ commit }, body) {
      commit('addOrderToHistory', body)
    },
    updatePriceAndOrders ({ commit }) {
      commit('clearPriceAndOrders')
    },
    deleteorderFromHistory ({ commit }, id) {
      commit('removeHistoryOrder', id)
    }
  },
  getters: {
    getName: state => state.name,
    getProducts: state => state.products,
    getCategories: state => state.categories,
    getHistoryInfo: state => state.historyOrders,
    getSelectedOrders: state => state.selectedOrders
  }
})

function deleteProduct (state, product) {
  state.products = state.products.filter(_product => _product.id !== product.id)
  state.selectedOrders = state.selectedOrders.filter(_product => {
    return _product.id !== product.id
  })
}