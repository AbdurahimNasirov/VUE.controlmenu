<template>
  <div class="auth">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style lang="scss" scoped>
.auth {
  width: 100%;
  min-height: 100vh;
  background: rgb(243, 154, 36);
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
</style>