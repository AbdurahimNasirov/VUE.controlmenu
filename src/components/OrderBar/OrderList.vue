<template>
  <ul class="order__list">
    <OrderItem
      v-for="(product, name, index) in products"
      :key="index"
      :product="product"
      :index="index + 1"
    />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderItem from '../../components/OrderBar/OrderItem.vue'
export default {
  components: {
    OrderItem
  },
  data:() => ({
    totalPrice: null
  }),

  computed: {
    ...mapGetters(['getSelectedOrders']),
    products () {
      const products = {}
      if (this.getSelectedOrders.length) {
        this.getSelectedOrders.forEach(orderedProduct => {
          if (!products[orderedProduct.id]) {
            this.$set(products, orderedProduct.id, [])
          }
          products[orderedProduct.id].push(orderedProduct)
        })
      }
      return products
    }
  }

}
</script>

<style lang="scss" scoped>
</style>