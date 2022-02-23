<template>
  <div class="nav-bar">
    <span class="nav-bar__dropdownbtn">
      <ion-icon name="menu" />
    </span>
    <div class="nav-bar__logout">
      <router-link class="nav-bar__logout__logoutbtn" to="/login">
        <ion-icon name="log-out-outline" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarComponent'
}
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  background: rgb(243, 154, 36);
  position: fixed;
  display: flex;
  padding: 15px 10px;
  z-index: 2;
  align-items: center;
  justify-content: space-between;
  &__dropdownbtn {
    transform: scale(1.2, 1.2);
    height: 20px;
    width: 20px;
  }
  &__logout {
    background: white;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s all ease;
    border-left: 3px solid white;
    &__logoutbtn {
      ion-icon {
        color: rgb(243, 154, 36);
        transform: scale(2.5, 2.5);
        margin-right: -2px;
        cursor: pointer;
      }
    }
    &:hover {
      background: rgb(243, 154, 36);
      border-left: 3px solid white;
      .nav-bar__logout__logoutbtn {
        ion-icon {
          color: white;
        }
      }
    }
  }
}
</style>