<template>
  <aside class="side-bar">
    <div :class="show ? 'side-bar__fixed--opened side-bar__fixed' : 'side-bar__fixed'">
      <h1 class="heading">
        LOGO
      </h1>
      <ul class="side-bar-list">
        <li class="side-bar-link">
          <a style="cursor: not-allowed">
            <ion-icon name="person-circle-outline" />
            Profile
          </a>
        </li>
        <li class="side-bar-link">
          <router-link
            :to="{ name: 'History' }"
            class="side-bar-link"
          >
            <ion-icon name="archive" />
            History
          </router-link>
        </li>
        <li class="side-bar-link">
          <router-link
            :to="{ name: 'Categories' }"
            class="link-conect"
          >
            <ion-icon name="list-outline" />
            Categories
          </router-link>
        </li>
        <ul class="side-bar-list side-bar-list--category">
          <li
            v-for="(item, i) in items"
            :key="i"
            class="side-bar-link side-bar-link--category"
          >
            <router-link
              :to="{
                name: 'Products',
                params: { category_name: item.category_name },
              }"
              @click.native="addEventBusListener"
            >
              <span> {{ ++i }}. </span>
              {{ item.title }}
            </router-link>
          </li>
        </ul>
        <li class="side-bar-link">
          <a style="cursor: not-allowed">
            <ion-icon name="log-out-outline" />
            Logout
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import eventBus from "@/bus/eventBus";

export default {
  name: "SideBarComponent",

  data: () => {
    return {
      show: true,
      items: [],
    };
  },

  created() {
    this.listenEventBus();
  },

  async mounted() {
    await this.getItems();
  },

  methods: {
    // Get Category List
    async getItems() {
      const data = await this.$api.categories.getCategoriesList();
      this.items = await data;
    },

    // Add event listener to event bus
    addEventBusListener() {
      eventBus.$emit("reloadProducts");
    },

    //Listener Event Bus
    listenEventBus() {
      eventBus.$on('sidebarTrigger', () => {
        this.show = !this.show
      })

      eventBus.$on("deleteCategory", async () => {
        await this.getItems();
      });
    },
  },
};
</script>