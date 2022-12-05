<template>
  <header class="header">
    <span
      class="header__dropdownbtn"
      @click="sidebarTrigger"
    >
      <ion-icon name="menu" />
    </span>
    <div class="header__logout">
      <span
        class="header__logout-link"
        @click="signOut"
      >
        <ion-icon name="log-out-outline" />
      </span>
    </div>
  </header>
</template>

<script>
import eventBus from "@/bus/eventBus";
export default {
  name: "NavbarComponent",

  methods: {
    // Sign Out
    async signOut() {
      this.$api.auth.signOut();
      this.$router.push('/login')
      this.$toast.open({
        message: `You are logged out !`,
        position: "top",
      });
    },

    // Add Event bus Listener
    sidebarTrigger() {
      eventBus.$emit("sidebarTrigger");
    },
  },
};
</script>
