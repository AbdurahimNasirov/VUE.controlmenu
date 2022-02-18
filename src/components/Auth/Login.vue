<template>
  <div class="auth-dialog">
    <h3 class="title--global">Registration</h3>
    <label for="name-user" class="name--global">Name user:</label>
    <input type="text" class="input--global" v-model="name" />
    <button type="btn" class="submit--global" @click="signIn">Sign in</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    name: "",
  }),
  methods: {
    ...mapActions(["setName"]),
    signIn() {
      this.name = this.name.trim()
      if(this.name) {
        this.setName(this.name)
        this.$router.push('/')
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-dialog {
  display: inline-block;
  background: rgb(133, 212, 58);
  width: 400px;
  font-size: 24px;
  box-shadow: 0 0 10px rgb(177, 112, 27);
  border-radius: 10px;
  padding: 15px;
  height: 200px;
  position: relative;
}
</style>