<template>
  <div
    :class="
      fluid
        ? 'wrapper__inner wrapper__inner--history wrapper__inner--fluid'
        : 'wrapper__inner wrapper__inner--history'
    "
  >
    <h3 v-if="!user" class="loading">LOADING</h3>
    <div v-else>
      <h2>User Name: {{ user.name }}</h2>
      <h2>User Email: {{ user.email }}</h2>
    </div>
  </div>
</template>

<script>
import eventBus from "@/bus/eventBus";

export default {
  name: "ProfilePage",

  metaInfo: {
    title: `Profile | ${process.env.VUE_APP_TITLE}`
  },

  data: () => {
    return {
      fluid: false,
      user: null,
    };
  },

  created() {
    this.listenEventBus();
  },

  async mounted() {
    await this.getUserInfo();
  },

  methods: {
    // Listener Event bus
    listenEventBus() {
      eventBus.$on("sidebarTrigger", () => {
        this.fluid = !this.fluid;
      });
    },

    // Get user info
    async getUserInfo() {
      const data = await this.$api.auth.getUser(this.$api.auth.getUid());
      this.user = await data;
    },
  },
};
</script>

<style></style>
