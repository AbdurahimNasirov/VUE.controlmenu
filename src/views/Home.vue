<template>
  <div class="category-and-order-block">
    <router-view />
    <OrderBar />
  </div>
</template>

<script>
import OrderBar from '../components/OrderBar/index.vue'
export default {
  name: 'HomePage',
  components: {
    OrderBar
  }
}
</script>
<style lang="scss" scoped>
.category-and-order-block {
  width: 65%;
  margin-left: 130px;
  display: flex;
  justify-content: space-between;
}
</style>
