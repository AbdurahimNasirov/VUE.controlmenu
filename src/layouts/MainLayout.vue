<template>
  <div class="wrapper">
    <NavBar />
    <main>
      <SideBar />
      <router-view />
    </main>
  </div>
</template>

<script>
import SideBar from '@/components/app/side-bar.vue'
import NavBar from '@/components/app/nav-bar.vue'
export default {
  components: {
    NavBar,
    SideBar
  }
}
</script>

<style lang="scss" scoped>
</style>