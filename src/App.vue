<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  components: {
    AuthLayout,
    MainLayout
  },

  computed: {
    layout () {
      return `${this.$route.meta.layout || 'Main'}Layout`
    }
  }
}
</script>

<style lang="scss">
$global-orange: rgb(243, 154, 36);
$global-green: rgb(133, 212, 58);
$pro: "Readex Pro";
* {
  margin: 0;
  margin: 0;
  box-sizing: border-box;
  user-select: none;
}
ul {
  padding: 0;
}
li {
  padding: 0;
  list-style: none;
}
body {
  min-height: 100vh;
}

//////roots/////

/////globl-styles///////
.order__list {
  row-gap: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 70%;
  overflow-x: auto;
}
.order__item {
  display: flex;
  background: white;
  align-items: center;
  border-radius: 8px;
  padding: 0 5px;
  font-family: $pro;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.158);
}
.order__index {
  font-size: 0.7em;
  width: 22px;
  font-weight: 500;
  .order::after {
    content: ".";
  }
}
.order__name {
  font-size: 0.78em;
  font-weight: 500;
  text-transform: lowercase;
  margin-bottom: 2px;
  flex: 1;
}
.order__price {
  font-size: 0.7em;
  font-weight: 600;
  width: 60px;
  display: flex;
  padding-right: 5px;
  justify-content: flex-end;
}
.order__controller {
  display: flex;
  align-items: center;
  border: 2px solid black;
  align-items: stretch;
}
.order__remove {
  display: flex;
  align-items: center;
  padding: 0 2px;
  border-right: 2px solid black;
  cursor: pointer;
  ion-icon {
    font-size: 0.7em;
  }
}
.order__amount {
  font-size: 0.8em;
  padding: 0 5px;
}
.order__add {
  display: flex;
  align-items: center;
  padding: 0 2px;
  border-left: 2px solid black;
  cursor: pointer;
  ion-icon {
    font-size: 0.7em;
  }
}
.order__basic-price {
  font-size: 0.8em;
  width: 65px;
  margin-left: 5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.list--global {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
  margin: 0 -10px;
}
.btn--global {
  position: relative;
  overflow: hidden;
  height: 120px;
  border-radius: 10px;
  background: rgb(243, 154, 36);
  box-shadow: 0 5px 10px rgba(5, 5, 5, 0.123);
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &-link {
    font-family: $pro;
    letter-spacing: 1px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
}

.input--global {
  border: 1.8px solid black;
  outline: none;
  background: none;
  width: 100%;
  padding: 5px;
  font-family: "Readex Pro";
  font-size: 0.7em;
  font-weight: 500;
  border-radius: 6px;
  position: relative;
  &:focus {
    outline: none;
    border: 1.8px solid black;
  }
}

.submit--global {
  display: block;
  border: none;
  position: absolute;
  bottom: 15px;
  right: 15px;
  border-radius: 5px;
  font-family: "Readex Pro";
  font-weight: 400;
  padding: 7px 8px 8px 8px;
  font-size: 0.82em;
  background: rgb(243, 154, 36);
  cursor: pointer;
}

.search-item--global {
  cursor: pointer;
  padding: 4px;
}

.name--global {
  font-family: "Readex Pro";
  font-weight: 400;
  font-size: 0.75em;
  display: block;
  position: relative;
  padding-left: 12px;
  margin-bottom: 5px;
  margin-top: 20px;
  &::before {
    content: "*";
    color: red;
    position: absolute;
    top: -2.5px;
    left: 0;
    font-size: 1.1em;
  }
}

.title--global {
  font-family: "Readex Pro";
  font-weight: 400;
  font-size: 1em;
  letter-spacing: 0.03em;
}

.delete-btn--global {
  position: absolute;
  top: 7px;
  right: 5px;
  background: none;
  border: none;
  transform: scale(1.5, 1.5);
  cursor: pointer;
  padding: 3px 3px;
  transition: 0.25s;
  outline: none;
  &:hover {
    ion-icon {
      color: red;
    }
  }
}

.previous--global {
  border: none;
  background: black;
  border-radius: 10px;
  padding: 15px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(5, 5, 5, 0.123);
  position: absolute;
  z-index: 1;
  left: -75px;
  cursor: pointer;
}
.previous--global ion-icon {
  transform: scale(1.5, 1.5);
}
</style>
