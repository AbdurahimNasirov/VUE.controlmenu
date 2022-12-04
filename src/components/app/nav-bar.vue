<template>
  <header class="header">
    <span
      class="header__dropdownbtn"
      @click="sidebarTrigger"
    >
      <ion-icon name="menu" />
    </span>
    <div class="header__logout">
      <router-link
        class="header__logout-link"
        to="/login"
      >
        <ion-icon name="log-out-outline" />
      </router-link>
    </div>
  </header>
</template>

<script>
import eventBus from '@/bus/eventBus'
export default {
  name: 'NavbarComponent',

  methods: {
    // Add Event bus Listener
    sidebarTrigger() {
      eventBus.$emit('sidebarTrigger')
    }
  }
}
</script>