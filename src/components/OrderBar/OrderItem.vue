<template>
  <li class="order__item">
    <span class="order__index">{{ index }}</span>
    <h3 class="order__name">{{ product[0].name }}</h3>
    <span class="order__prize">{{ product[0].price }}</span>
    <span class="order__controller">
      <span class="order__remove" @click="minusItem">
        <ion-icon name="caret-back-outline"></ion-icon>
      </span>
      <span class="order__amount">{{ product.length }}</span>
      <span class="order__add" @click="plusItem">
        <ion-icon name="caret-forward-outline"></ion-icon>
      </span>
    </span>
    <span class="order__basic-prize">{{ totalPrice }}</span>
  </li>
</template>

<script>
import { mapActions } from "vuex";
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
  },
};
</script>

<style lang="scss" scoped>

</style>