<template>
  <li class="order__item">
    <span class="order__index">{{ index }}</span>
    <h3 class="order__name">
      {{ product[0].name }}
    </h3>
    <span class="order__price">{{ product[0].price }}</span>
    <span class="order__controller">
      <span class="order__remove" @click="minusItem">
        <ion-icon name="caret-back-outline" />
      </span>
      <span class="order__amount">{{ product.length }}</span>
      <span class="order__add" @click="plusItem">
        <ion-icon name="caret-forward-outline" />
      </span>
    </span>
    <span class="order__basic-price">{{ totalPrice }}</span>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    product: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    price: 0
  }),
  computed: {

    totalPrice () {
      return this.product[0].price * this.product.length
    }
  },
  mounted () {
    this.price = this.product[0].price
  },
  methods: {
    ...mapMutations(['deleteProductFromOrdersProduct', 'addtProductToOrders']),

    minusItem () {
      this.deleteProductFromOrdersProduct(this.product[this.product.length - 1])
    },

    plusItem () {
      this.addtProductToOrders({...this.product[0], orderProductId: new Date().getTime()})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>