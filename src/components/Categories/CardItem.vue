<template>
  <div class="btn--global">
    <div @click="linkToProduct" class="cardItem">
      <!-- это должен быть router-link -->
      <h2 class="btn--global-link">{{ category.title }}</h2>
    </div>
    <button class="delete-btn--global" @click="deleteCategoryRuslan">
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
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

    // Ruslan
    ...mapMutations({
      commitDeleteCategoryRuslan: "deleteCategoryRuslan"
    }),

    deleteCategoryRuslan () {
      this.commitDeleteCategoryRuslan(this.category)
    }
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