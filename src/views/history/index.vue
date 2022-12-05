<template>
  <div :class="fluid ? 'wrapper__inner wrapper__inner--history wrapper__inner--fluid' :'wrapper__inner wrapper__inner--history'">
    <MenuLayout
      ref="menuLayout"
      :get-items="getHistoryOrdersList"
    >
      <template #title>
        History
      </template>
      <template #content="{ items }">
        <div class="history__fields">
          <span class="history__fields-length history__fields-item">№</span>
          <h3 class="history__fields-name history__fields-item">
            <ion-icon name="create-outline" /> Orders
          </h3>
          <h3 class="history__fields-time history__fields-item">
            <ion-icon name="time-outline" /> Time
          </h3>
          <h3 class="history__fields-price history__fields-item">
            <ion-icon name="cash-outline" /> Price
          </h3>
          <span class="history__fields-payed history__fields-item">
            <ion-icon name="wallet-outline" /> Payed
          </span>
          <span class="history__fields-delete history__fields-item">
            <ion-icon name="trash-outline" />
          </span>
        </div>
        <ul
          v-if="items.length"
          class="history__list"
        >
          <li
            v-for="(item, i) in items"
            :key="i"
            class="history__item"
          >
            <span class="history__item-length history__item-item">{{
              ++i
            }}</span>
            <button
              class="history__item-name history__item-item"
              @click="showModalOrdersModal(item)"
            >
              Orders
            </button>
            <p class="history__item-time history__item-item">
              <span>{{ item.time }}</span>
            </p>
            <span class="history__item-price history__item-item">{{
              item.totalPrice
            }}</span>
            <span class="history__item-payed history__item-item">
              <ion-icon name="checkmark-done-outline" />
            </span>
            <button
              class="history__item-delete history__item-item"
              @click="openModalDeleteConfirmModal(item)"
            >
              <ion-icon name="trash-outline" />
            </button>
          </li>
        </ul>
        <p v-else>
          No history is empty
        </p>
        <div class="history__bottom">
          <div class="history__bottom-content">
            <h2 class="history__bottom-name">
              Name of User
            </h2>
            <h3 class="history__bottom-totalprice">
              all collected money : <span>{{ totalPrice }}</span>
            </h3>
          </div>
        </div>
        <MenuModal
          ref="ordersModal"
          :height="200"
          :name-modal="'modal-orders'"
        >
          <template #modalContent>
            <HistoryOrdersList :items="item.ordersList">
              <template #actions>
                <button
                  class="history__orders-close"
                  @click="closeModalOrdersModal"
                >
                  <ion-icon name="close-outline" />
                </button>
              </template>
            </HistoryOrdersList>
          </template>
        </MenuModal>
        <MenuModal
          ref="deleteModal"
          confirm
          @delete="deleteHistoryOrder"
        />
      </template>
    </MenuLayout>
  </div>
</template>

<script>
import MenuLayout from "@/components/menu/layout.vue";
import MenuModal from "@/components/menu/modal.vue";
import HistoryOrdersList from "@/components/history-list/index.vue";
import eventBus from '@/bus/eventBus'


export default {
  name: "HistoryPage",

  metaInfo: {
    title: `History | ${process.env.VUE_APP_TITLE}`
  },

  components: {
    MenuLayout,
    MenuModal,
    HistoryOrdersList,
  },

  data() {
    return {
      item: {},
      totalPrice: 0,
      fluid: false
    };
  },

  created() {
    this.listenEventBus()
  },

  async mounted() {
    this.totalPrice = await this.getTotalPriceOrders();
  },

  methods: {
    // Listener Event bus
    listenEventBus() {
      eventBus.$on('sidebarTrigger', () => {
        this.fluid = !this.fluid
      })
    },

    // Get History Orders List
    async getHistoryOrdersList() {
      return await this.$api.history.getHistoryOrdersList(this.$api.auth.getUid());
    },

    // Get History Orders Total price
    async getTotalPriceOrders() {
      try {
        const data = await this.getHistoryOrdersList();
        return data.reduce((itemPrev, itemNext) => itemPrev + itemNext.totalPrice, 0);
      } catch (error) {
        return error
      }
    },

    // Delete History order
    async deleteHistoryOrder() {
      try {
        await this.$api.history.deleteHistoryOrder(this.item, this.$api.auth.getUid());
        this.$refs.menuLayout.fetchItems();
        this.totalPrice = 0
      } catch (error) {
        return error
      } finally {
        this.$refs.deleteModal.closeModal();
      }
    },

    // Modal control system
    showModalOrdersModal(item) {
      this.item = item;
      this.$refs.ordersModal.openModal();
    },

    closeModalOrdersModal() {
      this.$refs.ordersModal.closeModal();
    },

    openModalDeleteConfirmModal(item) {
      this.item = item;
      this.$refs.deleteModal.openModal();
    },

  },
};
</script>

<style lang="scss" scoped></style>
