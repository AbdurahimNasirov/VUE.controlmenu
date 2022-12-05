<template>
  <div :class="fluid ? 'wrapper__inner wrapper__inner--fluid': 'wrapper__inner'">
    <router-view />
    <OrderBar />
  </div>
</template>

<script>
import OrderBar from '@/components/orders/index.vue'
import eventBus from '@/bus/eventBus'

export default {
  name: 'HomePage',

  metaInfo: {
    title: `Home | ${process.env.VUE_APP_TITLE}`
  },

  components: {
    OrderBar
  },

  middleware: [
    function ({redirect}) {
      redirect(this.$router.push({name: 'Categories'}))
    }
  ],

  data() {
    return {
      fluid: false
    }
  },

  created() {
    this.listenEventBus()
  },

  methods: {
    // Listener Event bus
    listenEventBus() {
      eventBus.$on('sidebarTrigger', () => {
        this.fluid = !this.fluid
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
