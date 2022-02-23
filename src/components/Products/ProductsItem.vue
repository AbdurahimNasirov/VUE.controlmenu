<template>
  <div class="btn--global">
    <div 
      class="cardItem"
      @click="addProduct" 
    >
      <h2 class="btn--global-link">
        {{ product.name }}
      </h2>
    </div>
    <button class="delete-btn--global" @click="deleteProductItem">
      <ion-icon name="trash-outline" />
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations([
      'addtProductToOrders',
      'deleteProduct'
    ]),

    addProduct () {
      this.addtProductToOrders({...this.product, orderProductId: new Date().getTime()})
    },

    deleteProductItem () {
      this.deleteProduct(this.product)
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