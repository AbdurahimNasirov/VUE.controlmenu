<template>
  <div class="wrapper__content">
    <h3
      v-if="!items"
      class="loading"
    >
      LOADING
    </h3>
    <div v-else>
      <router-link
        class="page-home-btn"
        :to="{ name: 'Main' }"
      >
        <ion-icon name="home-outline" />
      </router-link>
      <div class="page-title">
        <h2 class="heading heading--white">
          <slot name="title" />
        </h2>
      </div>
      <div class="cards">
        <slot
          name="content"
          :items="items"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuLayout",

  props: {
    getItems: {
      type: Function,
      default: () => [],
    },
  },

  data: () => {
    return {
      items: null,
    };
  },

  async mounted() {
    await this.fetchItems();
  },

  methods: {
    // Get Items List with bind function
    async fetchItems() {
      try {
        const data = await this.getItems();
        this.items = await data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
