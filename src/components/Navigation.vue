<template>
  <nav class="navbar container bg-light rounded shadow sticky-top">
    <router-link to="/"
                 class="navbar-brand fw-bolder"
    >
      <i class="bi bi-dice-5-fill"></i>
      FiveDice
    </router-link>
    <div class="nav navbar-nav flex-row">
      <router-link to="/"
                   class="nav-link"
                   v-if="!user"
      >
        Register
      </router-link>
      <router-link to="/login"
                   class="nav-link"
                   v-if="!user"
      >
        Login
      </router-link>
      <router-link to="/account"
                   class="nav-link"
                   v-if="user"
      >
        Account
      </router-link>
      <router-link to="/chat"
                   class="nav-link"
                   v-if="user"
      >
        Chat
      </router-link>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navigation",
  data() {
    return {
      user: null
    }
  },
  created() {
    firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            this.user = user
          } else {
            this.user = null
          }
        })
  },
}
</script>

<style scoped lang="scss">
  .nav-link {
    color: #aaa;
    padding-right: 1rem !important;
    &.router-link-exact-active {
      color: #6447b4;
    }
  }
</style>
