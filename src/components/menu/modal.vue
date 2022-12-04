<template>
  <modal
    :name="nameModal"
    :width="400"
    :height="height"
    :shift-y="0.2"
    @closed="closeModal"
  >
    <div
      v-if="confirm"
      class="form form--delete"
    >
      <h3 class="heading heading-3">
        Are you sure you want to delete the item?
      </h3>
      <div class="form__actions">
        <button
          type="button"
          class="btn"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn btn--danger"
          @click="deleteConfirmed"
        >
          Delete
        </button>
      </div>
    </div>
    <slot
      v-else
      name="modalContent"
    />
  </modal>
</template>

<script>

export default {
  name: 'ModalComponent',

  props: {
    nameModal: {
      type: String,
      default: 'delete-confirm'
    },
    height: {
      type: Number,
      default: 200
    },
    confirm: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    // Open this Modal component
    openModal () {
      this.$modal.show(this.nameModal)
    },

    // Close this Modal component
    closeModal () {
      this.$modal.hide(this.nameModal)
    },

    // Delete Modal confirmed
    deleteConfirmed () {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
