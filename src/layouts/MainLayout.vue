<template>
  <main>
    <NavBar />
    <div class="main--content">
      <SideBar />
      <div class="basic-page">
        <Title />
        <router-view />
      </div>
    </div>
  </main>
</template>

<script>
import Title from "@/components/App/Title";
import SideBar from "@/components/App/SideBar";
import NavBar from "@/components/App/Navbar";
export default {
  components: {
    NavBar,
    SideBar,
    Title,
  },
};
</script>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  background: rgb(243, 154, 36);
  display: flex;
  flex-direction: column;
}
.main--content {
  margin-top: 50px;
  display: flex;
  background: rgb(133, 212, 58);
}
.basic-page {
  width: 100%;
}
</style>