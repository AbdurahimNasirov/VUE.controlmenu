<template>
  <div class="order-bar">
    <h3 class="order-bar__title">Orders</h3>
    <OrderList />
    <div class="total">
      <h2 class="total-price">
        {{ totalPrice }}<span class="currency">sum</span>
      </h2>
      <button class="total-pay-btn" @click="orderAddToHistory">Pay</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OrderList from "@/components/OrderBar/OrderList";

// между import и export тоже ставь отступы
export default {
  components: {
    OrderList,
  },

  // не правильно высчитываешь total price, так не правильно!
  computed: {
    ...mapGetters([
      "getTotalPrice", 
      "getSelectedProducts",
      'getSelectedOrdersRuslan'
    ]),

    totalPrice () {
      let price = 0
      if (this.getSelectedOrdersRuslan.length) {
        this.getSelectedOrdersRuslan.forEach(product => {
          price += product.price
        });
      }
      return price
    }
  },

  methods: {
    ...mapActions(["setOrdersToHistory", "updatePriceAndOrders"]),

    orderAddToHistory() {
      if (this.getTotalPrice) {
        this.setOrdersToHistory({
          totalPrice: this.getTotalPrice,
          orders: this.getSelectedProducts,
          time: new Date().toLocaleTimeString([], { timeStyle: "short" }),
        });
        this.updatePriceAndOrders();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// делай отступы
.order-bar {
  width: 20%;
  background: rgb(243, 154, 36);
  display: block;
  position: fixed;
  border-top: 4px solid black;
  right: 0;
  height: 100vh;
  top: 50px;

  &__title {
    font-family: "Readex Pro";
    font-weight: 400;
    text-align: center;
    color: black;
  }
}

.total {
  padding: 10px 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 4px solid black;

  &-price {
    font-family: "Readex Pro";
    font-size: 36px;

    .currency {
      font-size: 18px;
      margin-left: 10px;
    }
  }

  &-pay-btn {
    font-size: 24px;
    font-family: "Readex Pro";
    padding: 8px 12px;
    border: none;
    outline: none;
    margin-top: 15px;
    border-radius: 15px;
  }
}
</style>