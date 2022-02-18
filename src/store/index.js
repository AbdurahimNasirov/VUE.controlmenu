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
    selectedOrders: {},
    totalPrice: 0,
    historyOrders: [],
  },
  mutations: {
    addName(s, name) {
      s.name = name
      console.log(s.name)
    },
    addSelectedOrder(s, body) {
      if (!s.selectedOrders[body.name]) this._vm.$set(s.selectedOrders, body.name, [])
      s.selectedOrders[body.name].push(body)
    },
    removeSelectedItem(s, body) {
      s.selectedOrders[body.name].pop()
      if (!s.selectedOrders[body.name].length) {
        delete s.selectedOrders[body.name]
        s.totalPrice -= body.price
      }
    },
    setCategories(s, { title, categoryName }) {
      const id = s.categories[s.categories.length - 1].id + 1
      const body = {
        title,
        categoryName,
        id
      }
      s.categories.push(body)
    },
    setProducts(s, { name, category, price }) {
      const id = s.products[s.products.length - 1].id + 1
      const body = {
        name,
        category,
        price: Number(price),
        id: id
      }
      s.products.push(body)
    },
    deleteProductFromProducts(s, { name, id }) {
      if (s.selectedOrders[name]) {
        s.totalPrice -= s.selectedOrders[name].length * s.selectedOrders[name][0].price
        this._vm.$set(s.selectedOrders, name, [])
        delete s.selectedOrders[name]
        s.products = s.products.filter(product => product.id != id)
      } else {
        s.products = s.products.filter(product => product.id != id)
      }
    },
    deleteCategoriesFromCategories(s, { categoryName, id }) {
      s.categories = s.categories.filter(category => category.id != id)
      s.products = s.products.filter(product => product.category != categoryName)
    },
    plusTotalPrice(s, price) {
      s.totalPrice += price
    },
    minusTotalPrice(s, price) {
      s.totalPrice -= price
    },
    addOrderToHistory(s, { totalPrice, orders, time }) {
      s.historyOrders.push({
        totalPrice,
        orders,
        time
      })
    },
    clearPriceAndOrders(s) {
      s.selectedOrders = {}
      s.totalPrice = 0
    },
    removeHistoryOrder(s, id) {
      s.historyOrders.splice(id, 1)
    }
  },
  actions: {
    setName({ commit }, name) {
      commit('addName', name)
    },
    addtSelectedOrder({ commit }, body) {
      commit('addSelectedOrder', body)
    },
    removeSelectedOrderItem({ commit }, body) {
      commit('removeSelectedItem', body)
    },
    addCategories({ commit }, body) {
      commit('setCategories', body)
    },
    addItem({ commit }, body) {
      commit('setProducts', body)
    },
    deleteProduct({ commit }, body) {
      commit('deleteProductFromProducts', body)
    },
    deleteCategories({ commit }, body) {
      commit('deleteCategoriesFromCategories', body)
    },
    plusPriceToTotalPrice({ commit }, price) {
      commit('plusTotalPrice', price)
    },
    minusPriceToTotalPrice({ commit }, price) {
      commit('minusTotalPrice', price)
    },
    setOrdersToHistory({ commit }, body) {
      commit('addOrderToHistory', body)
    },
    updatePriceAndOrders({ commit }) {
      commit('clearPriceAndOrders')
    },
    deleteorderFromHistory({ commit }, id) {
      commit('removeHistoryOrder', id)
    }
  },
  getters: {
    getName: s => s.name,
    getProducts: s => s.products,
    getCategories: s => s.categories,
    getSelectedProducts: s => s.selectedOrders,
    getTotalPrice: s => s.totalPrice,
    getHistoryInfo: s => s.historyOrders
  },
})
