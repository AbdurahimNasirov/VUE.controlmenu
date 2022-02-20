<template>
  <li class="order__item">
    <span class="order__index">{{ index }}</span>
    <h3 class="order__name">{{ product[0].name }}</h3>
    <span class="order__price">{{ product[0].price }}</span>
    <span class="order__controller">
      <span class="order__remove" @click="minusItemRuslan">
        <ion-icon name="caret-back-outline"></ion-icon>
      </span>
      <span class="order__amount">{{ product.length }}</span>
      <span class="order__add" @click="plusItemRuslan">
        <ion-icon name="caret-forward-outline"></ion-icon>
      </span>
    </span>
    <span class="order__basic-price">{{ totalPriceRuslan }}</span>
  </li>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  props: {
    product: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPrice() {
      this.price = this.product[0].price * this.product.length;
      return this.price;
    },
    // Ruslan
    totalPriceRuslan() {
      return this.product[0].price * this.product.length
    },
  },
  data: () => ({
    price: 0,
  }),
  mounted() {
    this.price = this.product[0].price;
  },
  methods: {
    ...mapActions([
      "addtSelectedOrder",
      "removeSelectedOrderItem",
      "plusPriceToTotalPrice",
      "minusPriceToTotalPrice",
    ]),
    plusItem() {
      this.addtSelectedOrder(this.product[0]);
      this.plusPriceToTotalPrice(this.product[0].price);
    },
    minusItem() {
      this.removeSelectedOrderItem(this.product[0]);
      if (this.product.length)
        this.minusPriceToTotalPrice(this.product[0].price);
    },

    // Ruslan
    ...mapMutations(['deleteProductFromOrdersProduct', 'addtProductToOrdersRuslan']),

    minusItemRuslan () {
      this.deleteProductFromOrdersProduct(this.product[this.product.length - 1])
    },

    plusItemRuslan () {
      this.addtProductToOrdersRuslan({...this.product[0], orderProductId: new Date().getTime()})
    }
  },
};
</script>

<style lang="scss" scoped>

</style>