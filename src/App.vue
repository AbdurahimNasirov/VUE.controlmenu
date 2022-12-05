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
@keyframes loading {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.loading {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  animation: loading 1s ease-in-out infinite;
  font-size: 30px;
}
</style>
