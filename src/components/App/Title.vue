<template>
  <div class="title">
    <router-link class="previous--global" :to="'/'">
      <ion-icon name="home-outline"></ion-icon>
    </router-link>
    <h1>{{categoryName}}</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Title",
  computed: {
    ...mapGetters(["getCategories"]),
    categoryName() {
      return this.$route.name
    },
  },
  methods: {
    linkToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 100px;
  width: 65%;
  border-radius: 10px;
  background: black;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 130px;
  position: relative;
  h1 {
    font-family: "Readex Pro";
    color: white;
    padding: 20px;
    letter-spacing: 1px;
    font-size: 44px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.253);
    font-weight: 600;
  }
}
</style>