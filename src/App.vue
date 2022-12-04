<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
export default {
  components: {
    AuthLayout,
    MainLayout,
  },

  computed: {
    layout() {
      return `${this.$route.meta.layout || "Main"}Layout`;
    },
  },
};
</script>

<style lang="scss">


.auth {
  width: 100%;
  min-height: 100vh;
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
