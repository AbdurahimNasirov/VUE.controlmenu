export default {
  // Add Product (+) to Orders (mutation)
  addProductToOrdersList(state, data) {
    const item = state.ordersList.find((item) => item.title === data.title);
    if (item) {
      ++item.amount;
      item.date = new Date().toLocaleDateString();
      item.setTotalPrice();
    } else {
      const orderData = {
        ...data,
        date: new Date().toLocaleDateString(),
        amount: 1,
        totalPrice: data.price,
        setTotalPrice: () => {
          orderData.totalPrice = +orderData.price * orderData.amount;
        },
      };
      state.ordersList.push(orderData);
    }
  },

  // Remove (-) Product amount from Orders (mutation)
  removeProductFromOrdersList(state, data) {
    const item = state.ordersList.find(item => item.title === data.title)
    if (item.amount > 1) {
      --item.amount;
      item.setTotalPrice();
    } else {
      this.commit("deleteProductFromOrdersListByTitle", data)
    }
  },

  // Delete Product from Orders (mutation)
  deleteProductFromOrdersListByTitle(state, data) {
    state.ordersList = state.ordersList.filter(
      (item) => item.title !== data.title
    );
  },

  // Clear Orders (mutation)
  resetOrdersList(state) {
    state.ordersList = [];
  },

};
