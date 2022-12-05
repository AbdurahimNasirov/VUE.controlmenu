<template>
  <form
    class="auth-form auth-form--login form"
    @submit.prevent="login"
  >
    <h3 class="form-title heading heading-3">
      Login to your account
    </h3>
    <div class="auth-form__field form__block">
      <label
        for="email-field"
        class="form-name heading heading-4"
      >Email:</label>
      <input
        id="email-field"
        v-model="$v.formFields.email.$model"
        type="text"
        class="form-input heading heading-5"
      >
      <p
        v-if="!$v.formFields.email.required"
        class="form-error heading heading-6"
      >
        This field is required
      </p>
      <p
        v-else-if="!$v.formFields.email.email"
        class="form-error heading heading-6"
      >
        This field must be email
      </p>
    </div>
    <div class="auth-form__field">
      <label
        for="password-field"
        class="form-name heading heading-4"
      >Password:</label>
      <input
        id="password-field"
        v-model="$v.formFields.password.$model"
        type="text"
        class="form-input heading heading-5"
      >
      <p
        v-if="!$v.formFields.password.required"
        class="form-error heading heading-6"
      >
        This field is required
      </p>
    </div>
    <div class="auth-form-actions form__actions">
      <p class="heading heading-6">
        If you don't have a account
        <router-link
          :to="{ name: 'Register' }"
          class="heading-4"
        >
          Register
        </router-link>
      </p>
      <button
        type="submit"
        class="btn"
      >
        Login
      </button>
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "LoginPage",

  mixin: [validationMixin],

  data: () => {
    return {
      formFields: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          await this.$api.auth.login(this.formFields);
          this.$toast.open({
            message: `Authorization has been passed successfully !`,
            position: "top",
          });
          this.$router.push('/')
        } catch (error) {            
          this.$toast.open({
            message: `The passowrd ${error.code} incorrect !`,
            type: "error",
            position: "top",
          });
        }
      }
    },
  },

  validations: {
    formFields: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
};
</script>

<style></style>
