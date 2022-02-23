<template>
  <div class="btn--global">
    <div 
      class="cardItem"
      @click="linkToProduct" 
    >
      <h2 class="btn--global-link">
        {{ category.title }}
      </h2>
    </div>
    <button class="delete-btn--global" @click="deleteCategory">
      <ion-icon name="trash-outline" />
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'CategoryItem',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    linkToProduct () {
      this.$router.push(`/category/${this.category.categoryName}`)
    },

    ...mapMutations({
      commitDeleteCategory: 'deleteCategory'
    }),

    deleteCategory () {
      this.commitDeleteCategory(this.category)
    }
  }
}
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