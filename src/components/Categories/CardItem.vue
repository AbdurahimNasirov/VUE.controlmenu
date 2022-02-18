<template>
  <div class="btn--global">
    <div @click="linkToProduct" class="cardItem">
      <h2 class="btn--global-link">{{ category.title }}</h2>
    </div>
    <button class="delete-btn--global" @click="deleteCategoryBtn">
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Category",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteCategories"]),
    linkToProduct() {
      this.$router.push(`/category/${this.category.categoryName}`);
    },
    deleteCategoryBtn() {
      this.deleteCategories({
        categoryName: this.category.categoryName,
        id: this.category.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cardItem {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>