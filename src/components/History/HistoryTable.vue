<template>
  <ul class="history__list">
    <HistoryItem v-for="(order, idx) in ordersList" :key="idx" :order="order" :index="idx + 1"/>
  </ul>
</template>

<script>
import HistoryItem from "./HistoryItem.vue";
export default {
  props: {
    ordersList: {
      type: Array,
      required: true,
    },
  },
  components: {
    HistoryItem,
  },
};
</script>
<style lang="scss" scoped>
.history__list {
  padding: 0;
}
</style>