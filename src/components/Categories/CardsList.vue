<template>
  <div class="cards">
    <ul class="cards-list">
      <li
        class="cards-item"
        v-for="(categories, idx) in getCategories"
        :key="idx"
      >
        <CardItem
          :category="categories"
        />
      </li>
      <li class="cards-item">
        <DialogAddColumn />
      </li>
    </ul>
  </div>
</template>

<script>

import DialogAddColumn from "@/components/Auth/AddColumn.vue";
import CardItem from "@/components/Categories/CardItem";
import { mapGetters } from "vuex";
export default {
  name: "Categories",
  computed: {
    ...mapGetters(["getCategories"]),
  },
  data: () => ({
  }),
  components: {
    CardItem,
    DialogAddColumn,
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.cards {
  width: 100%;
  &-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    list-style: none;
  }
  &-item {
    max-width: 24%;
    width: 100%;
  }
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
}
</style>