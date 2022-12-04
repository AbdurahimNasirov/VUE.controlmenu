<template>
  <div class="card">
    <div
      class="card-item"
      @click="itemClicked"
    >
      <h2 class="card-link">
        {{ item.title }}
      </h2>
    </div>
    <button
      class="card-delete-btn"
      @click="deleteBtnClicked"
    >
      <ion-icon name="trash-outline" />
    </button>
  </div>
</template>

<script>

export default {
  name: 'CardItemComponent',

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    itemClicked () {
      this.$emit('itemClicked', this.item)
    },

    deleteBtnClicked () {
      this.$emit('deleteBtnClicked', this.item)
    },
  }
}
</script>