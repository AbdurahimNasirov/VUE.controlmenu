<template>
  <ul class="history__list">
    <HistoryItem 
      v-for="(order, idx) in ordersList" 
      :key="idx" 
      :order="order"
      :index="idx + 1" 
    />
  </ul>
</template>

<script>
import HistoryItem from './HistoryItem.vue'
export default {
  components: {
    HistoryItem
  },
  props: {
    ordersList: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.history__list {
  padding: 0;
}
</style>