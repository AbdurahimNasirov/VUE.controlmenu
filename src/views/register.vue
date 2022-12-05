<template>
  <form
    class="auth-form auth-form--register form"
    @submit.prevent="login"
  >
    <h3 class="form-title heading heading-3">
      Create account
    </h3>
    <div class="auth-form__field form__block">
      <label
        for="name-field"
        class="form-name heading heading-4"
      >Name:</label>
      <input
        id="name-field"
        v-model="$v.formFields.name.$model"
        type="text"
        class="form-input heading heading-5"
      >
      <p
        v-if="!$v.formFields.name.required"
        class="form-error heading heading-6"
      >
        This field is required
      </p>
      <p
        v-if="!$v.formFields.name.minLength"
        class="form-error heading heading-6"
      >
        This text's min length should be 5
      </p>
    </div>
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
      <p
        v-if="!$v.formFields.password.minLength"
        class="form-error heading heading-6"
      >
        This password's min length should be 8
      </p>
    </div>
    <div class="auth-form-actions form__actions">
      <p class="heading heading-6">
        If you already have a account
        <router-link
          :to="{ name: 'Login' }"
          class="heading-4"
        >
          Login
        </router-link>
      </p>
      <button
        type="submit"
        class="btn"
      >
        Register
      </button>
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "RegisterPage",

  mixin: [validationMixin],

  data: () => {
    return {
      formFields: {
        name: "",
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
          await this.$api.auth.register(this.formFields)
          this.$router.push('/')
        } catch (error) {
          console.log(error.code);
        } finally {
          this.$toast.open({
            message: `Your account successfully created!`,
            position: "top",
          });
        }
      }
    },
  },

  validations: {
    formFields: {
      name: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
};
</script>

<style></style>
