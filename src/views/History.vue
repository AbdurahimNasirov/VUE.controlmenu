<template>
  <div class="history">
    <div class="history__control-order">
      <span class="history__number-icon">№</span>
      <h3 class="history__orders-icon">
        <ion-icon name="create-outline" /> Orders:
      </h3>
      <span class="history__time-icon">
        <ion-icon name="time-outline" />
      </span>
      <span class="history__cost-icon">
        <ion-icon name="cash-outline" />
      </span>
      <span class="history__payment-icon">
        <ion-icon name="wallet-outline" />
      </span>
      <span class="history__delete-icon">
        <ion-icon name="trash-outline" />
      </span>
    </div>
    <HistoryTable :orders-list="getHistoryInfo" />
    <div class="history__bottom-content">
      <div class="history__info">
        <h2 class="paymaster">
          {{ getName }}
        </h2>
        <h3 class="all-money">
          all collected money : <span id="all-money">{{ totalPrice }}</span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HistoryTable from '../components/History/HistoryTable.vue'
export default {
  name: 'HistoryPage',
  components: {
    HistoryTable
  },
  computed: {
    ...mapGetters(['getHistoryInfo', 'getName']),
    totalPrice () {
      let totalPrice = 0
      this.getHistoryInfo.forEach((order) => (totalPrice += order.totalPrice))
      return totalPrice
    }
  }

}
</script>

<style lang="scss" scoped>
.history {
  padding-left: 45px;
  &__control-order {
    margin-top: 40px;
    padding: 0 10px;
    display: flex;
    align-items: stretch;
    width: 100%;
    font-family: "Readex Pro";
    border-bottom: 3px solid rgba(0, 0, 0, 0.445);
  }
  &__number-icon {
    font-family: "Roboto";
    font-size: 24px;
    color: rgba(0, 0, 0, 0.644);
    padding-right: 10px;
    border-right: 3px solid rgba(0, 0, 0, 0.445);
  }
  &__orders-icon {
    font-size: 24px;
    font-weight: 400;
    font-family: "Roboto";
    display: flex;
    align-items: center;
    column-gap: 3px;
    padding: 0 10px;
    color: rgba(0, 0, 0, 0.705);
    border-right: 3px solid rgba(0, 0, 0, 0.445);
    ion-icon {
      margin-bottom: 3px;
    }
  }
  &__time-icon {
    padding: 0 140px;
  }
  &__cost-icon {
    padding: 0 160px;
  }
  &__payment-icon {
    padding: 0 100px;
  }
  &__delete-icon {
    flex: 1;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.705);
    display: flex;
    justify-content: center;
  }
  &__bottom-content {
    width: 100%;
    border-top: 3px solid rgba(0, 0, 0, 0.445);
  }
  &__info {
    margin-top: 20px;
    width: 650px;
    height: 100px;
    background: black;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.253);
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    .paymaster {
      background: none;
      color: white;
      font-size: 25px;
      font-family: "Readex Pro";
      font-weight: 400;
    }
    .all-money {
      color: white;
      font-family: "Readex Pro";
      font-weight: 300;
      font-size: 18px;
      display: flex;
      align-items: center;
      text-transform: capitalize;
      span {
        padding-left: 15px;
        font-size: 25px;
        font-weight: 500;
        color: blue;
      }
    }
  }
}
</style>