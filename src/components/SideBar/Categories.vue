<template>
  <ol class="categories-items-list">
    <Category v-for="(category, idx) in categories" :key="idx" :category="category"/>
  </ol>
</template>

<script>
import Category from "@/components/SideBar/Category";
export default {
  name: "Categories-list",
  props: {
    categories: Array,
    required: true
  },
  components: {
    Category,
  },
};
</script>

<style lang="scss" scoped>
.categories-items-list {
  font-size: 16px;
}
</style>