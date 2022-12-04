<template>
  <form
    class="form form--category"
    @submit.prevent="submit"
  >
    <h3 class="form-title heading heading-3">
      New-Category
    </h3>

    <div class="form__block">
      <label
        for="name-category"
        class="form-name heading heading-4"
      >Name Category :</label>
      <input
        id="name-category"
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
    <div class="form__actions">
      <slot name="actions" />
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "FormCategory",

  mixin: [validationMixin],

  data: () => ({
    formFields: {
      name: "",
    },
  }),

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const requesData = {
          title: this.formFields.name,
          category_name: this.categoryNameFormater(this.formFields.name),
        };
        this.$emit("submit", requesData);
      }
    },

    resetCategory() {
      this.formFields.name = "";
    },

    categoryNameFormater(name) {
      return name.includes(" ")
        ? name.toLowerCase().trim().replace("_")
        : name.toLowerCase().trim();
    },
  },

  validations: {
    formFields: {
      name: {
        required,
        minLength: minLength(5),
      },
    },
  },
};
</script>

