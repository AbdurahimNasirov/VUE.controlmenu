<template>
  <div class="cards">
    <ul class="cards-list">
      <li 
        v-for="product in products" 
        :key="product.id"
        class="cards-item" 
      >
        <ProductItem :product="product" />
      </li>
      <li class="cards-item">
        <AddProduct />
      </li>
    </ul>
  </div>
</template>

<script>
import AddProduct from '@/components/Auth/AddItem.vue'
import ProductItem from '@/components/Products/ProductsItem.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductsList',
  components: {
    ProductItem,
    AddProduct
  },
  computed: {
    ...mapGetters(['getProducts']),
    products () {
      let products = []
      products = this.getProducts.filter(
        (product) => product.category === this.$route.params.categoryName
      )
      return products
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  width: 100%;
  &-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    list-style: none;
  }
  &-item {
    max-width: 24%;
    width: 100%;
    font-size: 16px;
  }
}
</style>