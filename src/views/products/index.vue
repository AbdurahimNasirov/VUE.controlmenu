<template>
  <MenuLayout
    ref="menuLayout"
    :get-items="getItems"
  >
    <template #title>
      {{ pageName }}
    </template>
    <template #content="{ items }">
      <div class="cards-actions">
        <p>Count: {{ items.length ? items.length : 0 }}</p>
        <button
          class="btn btn--black"
          @click="openModalCreateFormProduct"
        >
          Create
        </button>
      </div>
      <ul
        v-if="items.length"
        class="cards-list"
      >
        <li
          v-for="(item, i) in items"
          :key="i"
          class="cards-item"
        >
          <MenuItem
            :item="item"
            @itemClicked="cardClick"
            @deleteBtnClicked="openModalDeleteConfirmModal"
          />
        </li>
      </ul>
      <p v-else>
        No data to display
      </p>
      <MenuModal
        ref="productModal"
        :height="450"
        :name-modal="'modal-product'"
      >
        <template #modalContent>
          <FormProduct
            ref="formProduct"
            :categories="categoriesList"
            @submit="createProduct"
          >
            <template #actions>
              <button
                type="button"
                class="btn btn--danger"
                @click="closeModalFormProduct"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn"
              >
                Create
              </button>
            </template>
          </FormProduct>
        </template>
      </MenuModal>
      <MenuModal
        ref="deleteModal"
        confirm
        @delete="deleteProduct"
      />
    </template>
  </MenuLayout>
</template>

<script>
import MenuLayout from "@/components/menu/layout.vue";
import MenuItem from "@/components/menu/item.vue";
import MenuModal from "@/components/menu/modal.vue";
import FormProduct from "@/components/products/form-product.vue";
import eventBus from "@/bus/eventBus";
import { mapActions } from "vuex";

export default {
  name: "ProductsPage",

  components: {
    MenuLayout,
    MenuItem,
    MenuModal,
    FormProduct,
  },

  data: () => {
    return {
      pageName: "",
      categoriesList: [],
      item: {},
    };
  },

  created() {
    this.listenEventBus();
  },

  async mounted() {
    await this.getCategoriesList();
    await this.getPageName();
  },

  methods: {
    ...mapActions(["addProductToOrdersList", "deleteProductFromOrdersListByTitle"]),

    // Listener Event bus
    listenEventBus() {
      eventBus.$on("reloadProducts", async () => {
        await this.$refs.menuLayout.fetchItems();
        await this.getPageName();
      });
    },

    // Get Product List
    async getItems() {
      try {
        const requestData = {
          category: this.$route.params.category_name,
        };
        return await this.$api.products.getProductsList(requestData);
      } catch (error) {
        console.log(error);
      }
    },

    // Create Product
    async createProduct(requestData) {
      try {
        await this.$api.products.createProduct(requestData);
        await this.$refs.menuLayout.fetchItems();
      } catch (error) {
        console.log(error);
      } finally {
        this.closeModalFormProduct();
      }
    },

    // Delete Product
    async deleteProduct() {
      try {
        await this.$api.products.deleteProduct(this.item);
        this.deleteProductFromOrdersListByTitle(this.item)
        await this.$refs.menuLayout.fetchItems();
      } catch (error) {
        console.log(error);
      } finally {
        this.$refs.deleteModal.closeModal();
      }
    },

    // Get Category List
    async getCategoriesList() {
      const categoriesList = await this.$api.categories.getCategoriesList();
      this.categoriesList = await categoriesList;
    },

    // Get Product Page name
    async getPageName() {
      const item = await this.categoriesList.find(
        (item) => item.category_name === this.$route.params.category_name
      );
      this.pageName = await item.title;
    },

    // Product Item Clicked
    cardClick(data) {
      this.addProductToOrdersList(data);
    },

    // Modal control system
    openModalDeleteConfirmModal(data) {
      this.item = data;
      this.$refs.deleteModal.openModal();
    },

    openModalCreateFormProduct() {
      this.$refs.productModal.openModal();
    },

    closeModalFormProduct() {
      this.$refs.productModal.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
