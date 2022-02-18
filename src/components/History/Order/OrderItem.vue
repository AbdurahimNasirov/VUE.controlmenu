<template>
  <li class="order__item">
    <span class="order__index">{{ index }}</span>
    <h3 class="order__name">{{ order[0].name }}</h3>
    <span class="order__prize">{{ order[0].price }}</span>
    <span class="order__controller">
      <span class="order__amount">{{ order.length }}</span>
    </span>
    <span class="order__basic-prize">{{ order.length * order[0].price }} </span>
  </li>
</template>

<script>
export default {
  props: ["order", "index"],
};
</script>

<style>
</style>