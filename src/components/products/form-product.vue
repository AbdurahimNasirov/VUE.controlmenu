<template>
  <form
    class="form form--product"
    @submit.prevent="submit"
  >
    <h3 class="form-title heading heading-3">
      New product
    </h3>

    <div class="form__block">
      <label
        for="category-product"
        class="form-name heading heading-4"
      >Select category</label>
      <v-select
        v-model="$v.formFields.category.$model"
        :options="productCategoryOptions"
        style="font-size: 0.7em; font-family: 'Readex Pro';"
      />
      <p
        v-if="!$v.formFields.category.required"
        class="form-error heading heading-6"
      >
        This field is required
      </p>
    </div>

    <div class="form__block">
      <label
        for="name-category"
        class="form-name heading heading-4"
      >Name product :</label>
      <input
        v-model="$v.formFields.name.$model"
        type="text"
        class="form-input heading heading-5"
        autocomplete="off"
      >
      <p
        v-if="!$v.formFields.name.required"
        class="form-error heading heading-6"
      >
        This field is required
      </p>
      <p
        v-else-if="!$v.formFields.name.minLength"
        class="form-error heading heading-6"
      >
        This text's min length should be more 5
      </p>
    </div>
    <div class="form__block">
      <label
        for="price-product"
        class="form-name heading heading-4"
      >Price product :</label>
      <input
        v-model="$v.formFields.price.$model"
        type="number"
        min="1000"
        class="form-input heading heading-5"
        autocomplete="off"
      >
      <p
        v-if="!$v.formFields.price.required"
        class="form-error heading heading-6"
      >
        This field is required
      </p>
      <p
        v-else-if="!$v.formFields.price.minValue"
        class="form-error heading heading-6"
      >
        This price must be more than 999
      </p>
    </div>
    <div class="form__actions">
      <slot name="actions" />
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, minValue } from "vuelidate/lib/validators";

import { mapActions } from "vuex";
export default {
  name: "FormProduct",

  mixin: [validationMixin],

  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    formFields: {
      name: "",
      price: "",
      category: "",
    },
    productCategoryOptions: [],
  }),

  mounted() {
    if (this.categories.length) {
      this.productCategoryOptions = this.categories.map((item) => {
        return { label: item.title, code: item.category_name };
      });
    }
  },

  methods: {
    ...mapActions(["addCategories"]),

    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const requesData = {
          title: this.formFields.name,
          price: this.formFields.price,
          category: this.formFields.category.code
        };
        this.$emit("submit", requesData);
      }
    },

    resetCategory() {
      this.formFields.name = "";
      this.formFields.price = "";
      this.formFields.category = "";
    },
  },

  validations: {
    formFields: {
      name: {
        required,
        minLength: minLength(5),
      },
      price: {
        required,
        minValue: minValue(1000),
      },
      category: {
        required,
      },
    },
  },
};
</script>
