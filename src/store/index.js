import Vue from 'vue'
import Vuex from 'vuex'
import infoProducts from './infoProducts'
import infoCategories from './infoCategories'
Vue.use(Vuex)

// пиши не просто s, а лучше state

export default new Vuex.Store({
  state: {
    name: '',
    products: infoProducts,
    categories: infoCategories,
    selectedOrders: {},
    selectedOrdersRuslan: [],
    totalPrice: 0,
    historyOrders: [],
  },
  mutations: {
    addName(state, name) {
      state.name = name
      console.log(state.name)
    },
    addSelectedOrder(state, body) {
      if (!state.selectedOrders[body.name]) this._vm.$set(state.selectedOrders, body.name, [])
      state.selectedOrders[body.name].push(body)
    },
    removeSelectedItem(state, body) {
      state.selectedOrders[body.name].pop()
      if (!state.selectedOrders[body.name].length) {
        delete state.selectedOrders[body.name]
        state.totalPrice -= body.price
      }
    },
    setCategories(state, { title, categoryName }) {
      const id = state.categories[state.categories.length - 1].id + 1
      const body = {
        title,
        categoryName,
        id
      }
      state.categories.push(body)
    },
    setProducts(state, { name, category, price }) {
      const id = state.products[state.products.length - 1].id + 1
      const body = {
        name,
        category,
        price: Number(price),
        id: id
      }
      state.products.push(body)
    },
    deleteProductFromProducts(state, { name, id }) {
      if (state.selectedOrders[name]) {
        state.totalPrice -= state.selectedOrders[name].length * state.selectedOrders[name][0].price
        this._vm.$set(state.selectedOrders, name, [])
        delete state.selectedOrders[name]
        state.products = state.products.filter(product => product.id != id)
      } else {
        state.products = state.products.filter(product => product.id != id)
      }
    },
    deleteCategoriesFromCategories(state, { categoryName, id }) {
      // не чистишь selectedOrders
      state.categories = state.categories.filter(category => category.id != id)
      state.products = state.products.filter(product => product.category != categoryName)
      
    },
    plusTotalPrice(state, price) {
      state.totalPrice += price
    },
    minusTotalPrice(state, price) {
      state.totalPrice -= price
    },
    addOrderToHistory(state, { totalPrice, orders, time }) {
      state.historyOrders.push({
        totalPrice,
        orders,
        time
      })
    },
    clearPriceAndOrders(state) {
      state.selectedOrders = {}
      state.totalPrice = 0
    },
    removeHistoryOrder(state, id) {
      state.historyOrders.splice(id, 1)
    },

    // Ruslan
    deleteCategoryRuslan (state, category) {
      state.products.forEach(product => {
        if (product.category === category.categoryName) {
          deleteProduct(state, product)
        }
      });

      state.categories = state.categories.filter(_category => _category.id !== category.id)
    },

    deleteProductRuslan (state, product) {
      deleteProduct(state, product)
    },

    addtProductToOrdersRuslan (state, product) {
      state.selectedOrdersRuslan.push(product)
    },

    deleteProductFromOrdersProduct (state, product) {
      state.selectedOrdersRuslan = state.selectedOrdersRuslan.filter(_product => {
        return _product.orderProductId !== product.orderProductId
      })
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
    getHistoryInfo: s => s.historyOrders,

    // Ruslan
    getSelectedOrdersRuslan: state => state.selectedOrdersRuslan
  },
})

function deleteProduct (state, product) {
  state.products = state.products.filter(_product => _product.id !== product.id)
  state.selectedOrdersRuslan = state.selectedOrdersRuslan.filter(_product => {
    return _product.id !== product.id
  })
}