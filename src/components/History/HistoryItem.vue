<template>
  <div class="history__item">
    <span class="history__list__index">{{ index }}</span>
    <HistoryOrderList :orders="orderedProducts" />
    <p class="history__list__order-time">
      at: <span>{{ order.time }}</span>
    </p>
    <span class="history__list__order-price">{{ price }}</span>
    <span class="history__list__payment">
      <ion-icon name="checkmark-done-outline" />
    </span>
    <button
      class="history__list__order-delete-btn"
      @click="deleteOrder(index - 1)"
    >
      <ion-icon name="trash-outline" />
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HistoryOrderList from './Order/OrderList.vue'
export default {
  components: {
    HistoryOrderList
  },
  props: {
    order: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    orderedProducts () {
      const products = {}
      if (this.order.orders.length) {
        this.order.orders.forEach(orderedProduct => {
          if (!products[orderedProduct.id]) {
            this.$set(products, orderedProduct.id, [])
          }
          products[orderedProduct.id].push(orderedProduct)
        })
      }
      return products
    },
    price () {
      let price = 0
      this.order.orders.forEach(item => {
        price += item.price
      })
      return price
    }
  },
  methods: {
    ...mapActions(['deleteorderFromHistory']),
    deleteOrder (i) {
      this.deleteorderFromHistory(i)
    }
  }
}
</script>

<style lang="scss" scoped>
.history__item {
  padding: 5px 0;
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
}
.history__list {
  &__index {
    width: 44px;
    display: flex;
    justify-content: center;
    &::after {
      content: ".";
    }
  }
  &__order-btn {
    font-family: "Readex Pro";
    border: none;
    width: 132px;
    outline: none;
    font-size: 20px;
    transition: 0.2s all ease;
    background: none;
    &:hover {
      background: rgb(243, 154, 36);
    }
    border-radius: 7px;
    cursor: pointer;
  }
  &__order-time {
    font-family: "Readex Pro";
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    span {
      padding-left: 5px;
      color: blue;
      font-size: 21px;
    }
  }
  &__order-price {
    width: 352px;
    font-family: "Readex Pro";
    font-weight: 600;
    display: flex;
    justify-content: center;
    font-size: 22px;
  }
  &__payment {
    width: 200px;
    display: flex;
    justify-content: center;
    color: yellow;
    font-size: 22px;
    font-weight: 600;
    transform: scale(1.1, 1.1);
  }
  &__order-delete-btn {
    flex: 1;
    background: none;
    border: none;
    font-size: 21px;
    cursor: pointer;
    ion-icon {
      &:hover {
        color: red;
      }
    }
  }
}
</style>