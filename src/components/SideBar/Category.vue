<template>
  <li>
    <router-link
      class="category-item"
      :to="`/category/${category.categoryName}`"
    >
      {{ category.title }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'CategoriesLinkItem',
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.category-item {
  font-family: "Readex Pro";
  font-size: 15px;
  text-decoration: none;
  color: rgb(0, 0, 0);

  &:hover {
    color: rgba(0, 0, 0, 0.76);
  }
}
</style>