<template>
  <MenuLayout
    ref="menuLayout"
    :get-items="getItems"
  >
    <template #title>
      Categories
    </template>
    <template #content="{ items }">
      <div class="cards-actions">
        <p>Count: {{ items.length ? items.length : 0 }}</p>
        <button
          class="btn btn--black"
          @click="openModalCreateFormCategory"
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
        ref="categoryModal"
        :height="280"
        :name-modal="'modal-category'"
      >
        <template #modalContent>
          <FormCategory
            ref="formCategory"
            @submit="createCategory"
          >
            <template #actions>
              <button
                type="button"
                class="btn btn--danger"
                @click="closeModalFormCategory"
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
          </FormCategory>
        </template>
      </MenuModal>
      <MenuModal
        ref="deleteModal"
        confirm
        @delete="deleteCategory"
      />
    </template>
  </MenuLayout>
</template>

<script>
import MenuLayout from "@/components/menu/layout.vue";
import MenuItem from "@/components/menu/item.vue";
import MenuModal from "@/components/menu/modal.vue";
import FormCategory from "@/components/categories/form-category.vue";
import eventBus from "@/bus/eventBus";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "CategoriesList",

  components: {
    MenuLayout,
    MenuItem,
    MenuModal,
    FormCategory,
  },

  data: () => {
    return {
      item: {},
    };
  },

  computed: {
    ...mapGetters(["getCategories"]),
  },

  methods: {
    ...mapMutations(["deleteCategory"]),
    ...mapActions(["addCategories"]),

    // Get Category List
    async getItems() {
      try {
        return await this.$api.categories.getCategoriesList();
      } catch (error) {
        console.log(error);
      }
    },

    // Delete category
    async deleteCategory() {
      try {
        await this.$api.categories.deleteCategory(this.item);
        await this.$refs.menuLayout.fetchItems();
      } catch (error) {
        console.log(error);
      } finally {
        this.addEventBusListener();
        this.$refs.deleteModal.closeModal();
      }
    },

    // Create category
    async createCategory(requestData) {
      try {
        await this.$api.categories.createCategory(requestData);
        await this.$refs.menuLayout.fetchItems();
      } catch (error) {
        console.log(error);
      } finally {
        this.addEventBusListener();
        this.closeModalFormCategory();
      }
    },

    // Category Item Clicked
    cardClick(item) {
      this.$router.push(`/category/${item.category_name}`);
    },

    // Add event listener to event bus
    addEventBusListener() {
      eventBus.$emit("deleteCategory");
    },

    // Modal control system
    openModalDeleteConfirmModal(data) {
      this.item = data;
      this.$refs.deleteModal.openModal();
    },

    openModalCreateFormCategory() {
      this.$refs.categoryModal.openModal();
    },

    closeModalFormCategory() {
      this.$refs.categoryModal.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped></style>
