<template>
  <li class="order__item">
    <span class="order__index">{{ index }}</span>
    <h3 class="order__name">
      {{ order[0].name }}
    </h3>
    <span class="order__price">{{ order[0].price }}</span>
    <span class="order__controller">
      <span class="order__amount">{{ order.length }}</span>
    </span>
    <span class="order__basic-price">{{ order.length * order[0].price }} </span>
  </li>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: {
    order: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>