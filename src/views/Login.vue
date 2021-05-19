<template>
  <div class="p-4 bg-light rounded shadow col-12 col-sm-8 col-md-5 col-lg-3">
    <h3 class="fw-bolder text-black-50 mb-4 text-center">Login</h3>
    <div class="input-group mb-3">
      <span class="input-group-text">
        <i class="bi bi-envelope-open-fill"></i>
      </span>
      <input type="email"
             class="form-control"
             placeholder="Email"
             v-model="email"
      >
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">
        <i class="bi bi-lock-fill"></i>
      </span>
      <input type="password"
             class="form-control"
             placeholder="Password"
             v-model="password"
      >
    </div>
    <hr>
    <button class="btn btn-primary fw-bolder mt-1 d-block w-100 py-2"
            @click="login"
    >
      <i class="bi bi-unlock-fill me-1"></i>
      Sign In
    </button>
    <ErrorAlert :message="msgError"
                :isError="isError"
                @hide = "hideError"
    />
    <div class="mt-3">
      <router-link to="/forgot-password">
        Forgot Password?
      </router-link>
    </div>
  </div>
</template>

<script>
import ErrorAlert from "../components/ErrorAlert";
import firebase from "firebase";
export default {
  name: "Login",
  components: {ErrorAlert},
  data() {
    return {
      email: '',
      password: '',
      isError: false,
      msgError: 'Error'
    }
  },
  created() {
    firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            this.$router.push('/account')
          }
        })
  },
  methods: {
    hideError() {
      this.isError = false
    },
    login() {
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push('/account')
          })
          .catch(err => {
            this.isError = true
            this.msgError = err.message
          })
    }
  }
}
</script>

<style scoped>

</style>
