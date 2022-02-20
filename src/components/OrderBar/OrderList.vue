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
import { mapGetters } from "vuex";
import OrderItem from "../../components/OrderBar/OrderItem.vue";
export default {
  components: {
    OrderItem,
  },
  computed: {
    ...mapGetters(["getSelectedProducts", 'getSelectedOrdersRuslan']),
    selectedProducts() {
      return this.getSelectedProducts
    },

    // Ruslan
    products () {
      const products = {}
      if (this.getSelectedOrdersRuslan.length) {
        this.getSelectedOrdersRuslan.forEach(orderedProduct => {
          if (!products[orderedProduct.id]) {
            this.$set(products, orderedProduct.id, [])
          }
          products[orderedProduct.id].push(orderedProduct)
        });
      }
      return products
    }
  },
  data:() => ({
    totalPrice: null
  }),

  // если не используешь методы, не вызывай их...
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>