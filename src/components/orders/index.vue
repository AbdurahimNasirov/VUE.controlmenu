<template>
  <aside class="order">
    <div class="order__fixed">
      <h3 class="heading heading-3 heading--center">
        Orders
      </h3>
      <ul class="order__list">
        <li
          v-for="(item, i) in ordersList"
          :key="i"
          class="order__item"
        >
          <span class="order__index heading heading-6">{{ ++i }}</span>
          <h3 class="order__name heading heading-6">
            {{ item.title }}
          </h3>
          <span class="order__price heading heading-6">{{ item.price }}</span>
          <span class="order__controller">
            <span
              class="order__remove"
              @click="removeProductFromOrdersList(item)"
            >
              <ion-icon name="caret-back-outline" />
            </span>
            <span class="order__amount heading heading-6">{{
              item.amount
            }}</span>
            <span
              class="order__add"
              @click="addProductToOrdersList(item)"
            >
              <ion-icon name="caret-forward-outline" />
            </span>
          </span>
          <span class="order__total-price heading heading-6">{{
            item.totalPrice
          }}</span>
        </li>
      </ul>
      <p
        v-if="!ordersList.length"
        class="heading heading-4 heading--center order__warning"
      >
        Your orders is empty !
      </p>
      <div class="order__total">
        <h2 class="heading heading-2 heading--center">
          {{ getTotalPrice }}<span class="heading heading-4">sum</span>
        </h2>
        <button
          class="order__total-pay-btn btn btn--white"
          @click="completeOrder"
        >
          Pay
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OrdersComponent",

  data: () => {
    return {
      totalPrice: 0,
    };
  },

  computed: {
    ...mapGetters(["ordersList"]),

    // Get Total Price of Orders
    getTotalPrice() {
      return this.ordersList.reduce(
        (itemPrevious, itemNext) => itemPrevious + +itemNext.totalPrice,
        0
      );
    },
  },
  methods: {
    ...mapActions([
      "addProductToOrdersList",
      "removeProductFromOrdersList",
      "resetOrdersList",
    ]),

    // Add Order to History List
    async completeOrder() {
      if (this.ordersList.length) {
        try {
          const requestData = {
            time: new Date().toLocaleTimeString(),
            totalPrice: this.getTotalPrice,
            ordersList: this.ordersList,
          };
          await this.$api.history.createHistoryOrder(requestData);
          this.resetOrdersList();
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
