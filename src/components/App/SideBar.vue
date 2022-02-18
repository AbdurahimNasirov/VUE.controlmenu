<template>
  <div class="side-bar">
    <div class="side-bar-fixed">
      <ul>
        <li class="link">
          <router-link :to="'/history'" class="link-conect"
            ><ion-icon name="archive"></ion-icon> History</router-link
          >
        </li>
        <li class="link">
          <router-link :to="'/'" class="link-conect"
            ><ion-icon name="folder"></ion-icon> Categories</router-link
          >
          <Categories :categories="getCategories"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Categories from "@/components/SideBar/Categories";
export default {
  computed: {
    ...mapGetters(["getCategories"]),
  },
  components: {
    Categories,
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  min-height: 100vh;
  width: 16%;
  &-fixed {
    border-top: 4px solid black;
    padding: 10px 0;
    position: fixed;
    background: rgb(243, 154, 36);
    height: 100%;
    width: 16%;
    ul {
      padding: 0 5px;
    }
    .link {
      list-style: none;
      cursor: pointer;
      &-conect {
        color: white;
        font-family: "Readex Pro";
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 10px;
        &:hover {
          color: rgba(255, 255, 255, 0.795);
        }
      }
    }
  }
}
</style>