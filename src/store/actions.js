export default {
  // Add Product (+) to Orders (action)
  addProductToOrdersList({ commit }, data) {
    commit("addProductToOrdersList", data);
  },

  // Remove (-) Product amount from Orders (action)
  removeProductFromOrdersList({ commit }, data) {
    commit("removeProductFromOrdersList", data);
  },

  // Delete Product from Orders (action)
  deleteProductFromOrdersListByTitle({ commit }, data) {
    commit("deleteProductFromOrdersListByTitle", data)
  },

  // Clear Orders (action)
  resetOrdersList({ commit }) {
    commit("resetOrdersList");
  },
};
