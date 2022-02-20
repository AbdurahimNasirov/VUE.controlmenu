<template>
  <div v-click-outside="hide">
    <div class="btn--global plus" @click="dialogShowTrigger">
      <h2 class="category-name">
        <ion-icon name="add-circle-outline"></ion-icon>
      </h2>
    </div>
    <div class="auth-dialog" v-show="dialogShow">
      <h3 class="title--global">New-Product</h3>
      <form @submit.prevent="addProduct">
        <label for="name-product" class="name--global">Name Product :</label>
        <input
          type="text"
          class="input--global"
          v-model="titleItemProduct"
          autocomplete="off"
        />
        <label for="price-product" class="name--global">price Product :</label>
        <input
          type="number"
          class="input--global"
          v-model="priceItemProduct"
          autocomplete="off"
        />
        <label for="category-search" class="name--global"
          >Select Category :</label
        >
        <div v-click-outside="hideCategory">
          <input
            type="text"
            class="input--global"
            id="category-search"
            @click="categoriesList = !categoriesList"
            v-model="categoryProduct"
            autocomplete="off"
          />
          <ul class="search-list--global" v-show="categoriesList">
            <li
              class="search-item--global"
              v-for="category in getCategories"
              v-show="
                category.title
                  .toLowerCase()
                  .includes(categoryProduct.toLowerCase())
              "
              :key="category.id"
              @click="
                () => {
                  categoryProduct = category.title;
                  categoriesList = false;
                }
              "
            >
              {{ category.title }}
            </li>
          </ul>
        </div>
        <button type="submit" class="submit--global">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ClickOutside from "vue-click-outside";
export default {
  computed: {
    ...mapGetters(["getCategories"]),
  },
  data: () => ({
    dialogShow: false,
    categoriesList: false,
    categoryProduct: "",
    titleItemProduct: "",
    priceItemProduct: "",
  }),
  watch: {
    dialogShow(e) {
      if (e) {
        window.addEventListener("keydown", this.closeByEsc);
      } else {
        window.removeEventListener("keydown", this.closeByEsc);
      }
    },
  },
  methods: {
    ...mapActions(["addItem"]),
    hide() {
      this.dialogShow = false;
    },
    hideCategory() {
      this.categoriesList = false;
    },
    closeByEsc() {
      if (event.code.toLowerCase() === "escape") {
        this.hide();
      }
    },
    dialogShowTrigger() {
      this.dialogShow = !this.dialogShow;
    },
    categoryNameFormatter(name) {
      if (name.includes(" ")) {
        return name.toLowerCase().split(" ").join("_");
      } else {
        return name.toLowerCase();
      }
    },
    addProduct() {
      if (
        this.getCategories.some((category) =>
          category.title === this.categoryProduct
        ) && this.categoryProduct != '' &&
        this.titleItemProduct != "" &&
        this.priceItemProduct
      ) {
        this.addItem({
          name: this.titleItemProduct,
          price: this.priceItemProduct,
          category: this.categoryNameFormatter(this.categoryProduct),
        });
        this.dialogShow = false,
        this.titleItemProduct = '',
        this.categoryProduct = '',
        this.priceItemProduct = ''
      }
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
.plus {
  background: black;
  box-shadow: 0 5px 10px rgba(5, 5, 5, 0.123);
  h2 {
    color: white;
    ion-icon {
      transform: scale(2, 2);
    }
  }
}
.auth-dialog {
  display: inline-block;
  background: rgb(133, 212, 58);
  width: 400px;
  font-size: 24px;
  box-shadow: 0 0 10px rgb(177, 112, 27);
  border-radius: 10px;
  padding: 15px;
  height: 360px;
  position: absolute;
  top: 15%;
  right: 50%;
  margin-right: -200px;
}
.search-list--global {
  background: white;
  position: absolute;
  margin-top: 5px;
  width: 93%;
  z-index: 2;
  border-radius: 10px;
}
</style>