<template>
  <div class="btn--global">
    <div @click="addOrder" class="cardItem">
      <h2 class="btn--global-link">{{ product.name }}</h2>
    </div>
    <button class="delete-btn--global" @click="deleteProductItem">
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Product-Item",
  props: ["product"],
  methods: {
    ...mapActions(["addtSelectedOrder", "deleteProduct", "plusPriceToTotalPrice"]),
    addOrder() {
      this.addtSelectedOrder(this.product);
      this.plusPriceToTotalPrice(this.product.price)
    },
    deleteProductItem() {
      this.deleteProduct({
        name: this.product.name,
        id: this.product.id,
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