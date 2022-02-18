<template>
  <div class="history__item">
    <span class="history__list__index">{{index}}</span>
    <HistoryOrderList :orders="order.orders" />
    <p class="history__list__order-time">
      at: <span>{{ order.time }}</span>
    </p>
    <span class="history__list__order-prize">{{ order.totalPrice }}</span>
    <span class="history__list__payment">
      <ion-icon name="checkmark-done-outline"></ion-icon>
    </span>
    <button class="history__list__order-delete-btn" @click="deleteOrder(index - 1)">
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import HistoryOrderList from "./Order/OrderList.vue";
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions(["deleteorderFromHistory"]),
    deleteOrder(i) {
      this.deleteorderFromHistory(i)
    }
  } ,
  components: {
    HistoryOrderList,
  },
};
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
  &__order-prize {
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