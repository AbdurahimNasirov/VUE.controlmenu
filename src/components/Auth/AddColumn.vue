<template>
  <div v-click-outside="hide">
    <div class="btn--global plus" @click="dialogShowTrigger">
      <h2 class="category-name">
        <ion-icon name="add-circle-outline" />
      </h2>
    </div>
    <div 
      v-show="dialogShow" 
      class="auth-dialog"
    >
      <h3 class="title--global">
        New-Category
      </h3>
      <form @submit.prevent="newColumn">
        <label for="name-category" class="name--global">Name Category :</label>
        <input 
          v-model="nameCategory"
          type="text" 
          class="input--global" 
          autocomplete="off"
        >
        <button type="submit" class="submit--global">
          Create
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import {mapActions} from 'vuex'
export default {
  directives: {
    ClickOutside
  },
  data: () => ({
    dialogShow: false,
    nameCategory: ''
  }),
  watch: {
    dialogShow (e) {
      if (e) {
        window.addEventListener('keydown', this.closeByEsc)
      } else {
        window.removeEventListener('keydown', this.closeByEsc)
      }
    }
  },

  methods: {
    ...mapActions(['addCategories']),
    hide () {
      this.dialogShow = false
    },
    closeByEsc () {  
      if (event.code.toLowerCase() === 'escape') {
        this.hide() 
      }
    },
    dialogShowTrigger () {
      this.dialogShow = !this.dialogShow 
    },
    categoryNameFormatter (name) {
      if(name.includes(' ')) {
        return name.toLowerCase().split(' ').join('_')
      }else {
        return name.toLowerCase()
      }
    },
    newColumn () {
      if(this.nameCategory != '') {
        this.addCategories({
          title: this.nameCategory,
          categoryName: this.categoryNameFormatter(this.nameCategory)
        })
      }
      this.nameCategory = '',
      this.dialogShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.plus {
  background: black;
  box-shadow: 0 5px 10px rgba(5, 5, 5, 0.123);
  h2 {
    color: white;
    ion-icon {
      transform: scale(2, 2);
    }
  }
}
.auth-dialog {
  display: inline-block;
  background: rgb(133, 212, 58);
  width: 400px;
  font-size: 24px;
  box-shadow: 0 0 10px rgb(177, 112, 27);
  border-radius: 10px;
  padding: 15px;
  height: 280px;
  position: absolute;
  top: 15%;
}
</style>