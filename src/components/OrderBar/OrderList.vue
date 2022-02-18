<template>
  <ul class="order__list">
    <OrderItem
      v-for="(product, name, index) in selectedProducts"
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
    ...mapGetters(["getSelectedProducts"]),
    selectedProducts() {
      return this.getSelectedProducts
    }
  },
  data:() => ({
    totalPrice: null
  }),
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>