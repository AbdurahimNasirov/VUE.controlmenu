<template>
  <div v-click-outside="hide">
    <button class="history__list__order-btn" @click="dialogShowTrigger">
      Orders
    </button>
    <ul class="order__list list-order-history" v-show="showOrders">
      <h3 class="list-order-history__title">Orders:</h3>
      <button class="exit-order" @click="hide">
        <ion-icon name="close-outline"></ion-icon>
      </button>
      <OrderItem v-for="(order, name, idx) in orders" :key="idx" :order="order" :index="idx + 1"/>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import OrderItem from "./OrderItem.vue";
export default {
  props: {
    orders: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showOrders: false,
  }),
  watch: {
    showOrders(e) {
      if (e) {
        window.addEventListener("keydown", this.closeByEsc);
      } else {
        window.removeEventListener("keydown", this.closeByEsc);
      }
    },
  },
  methods: {
    hide() {
      this.showOrders = false;
    },
    closeByEsc() {
      if (event.code.toLowerCase() === "escape") {
        this.hide();
      }
    },
    dialogShowTrigger() {
      this.showOrders = !this.showOrders;
    },
  },
  components: {
    OrderItem,
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style lang="scss" scoped>
.list-order-history {
  width: 600px;
  background: rgb(243, 154, 36);
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  min-height: 30vh;
  top: 0;
  left: 180px;
  padding-top: 60px;
  z-index: 4;
  &__title {
    font-family: "Readex Pro";
    position: absolute;
    top: 15px;
    font-weight: 400;
    font-size: 22px;
  }
  .exit-order {
    position: absolute;
    background: none;
    border: none;
    top: 15px;
    right: 15px;
    transform: scale(1.6, 1.6);
    cursor: pointer;
    padding: 5px;
    padding-bottom: 0;
    border-radius: 8px;
    transition: 0.3s all ease;
    &:hover {
      background: black;
      color: white;
    }
  }
}
.history__list__order-btn {
  font-family: "Readex Pro";
  border: none;
  width: 132px;
  outline: none;
  font-size: 20px;
  transition: 0.2s all ease;
  background: none;
  &:hover {
    background: rgb(243, 154, 36);
  }
  border-radius: 7px;
  cursor: pointer;
}
</style>