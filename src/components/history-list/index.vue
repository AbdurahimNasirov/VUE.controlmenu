<template>
  <div class="form form--category history__orders">
    <h3>Orders:</h3>
    <ul class="history__orders-list">
      <slot name="actions" />
      <li
        v-for="(item, i) in items"
        :key="i"
        class="history__orders-item"
      >
        <span class="history__orders-length heading heading-6">{{ ++i }}</span>
        <h4 class="history__orders-name heading heading-6">
          {{ item.title }}
        </h4>
        <span class="history__orders-price heading heading-6">{{
          item.price
        }}</span>
        <span class="history__orders-amount heading heading-6">{{
          item.amount
        }}</span>
        <span class="history__orders-totalprice heading heading-6">{{
          item.totalPrice
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HistoryOrdersListComponent",

  props: {
    items: {
      type: Object,
      required: true,
    },
  },
};
</script>
