<template>
  <div class="p-4 bg-light rounded shadow col-12 col-sm-8 col-md-5 col-lg-3">
    <h3 class="fw-bolder text-black-50 mb-4 text-center">Register</h3>
    <div class="input-group mb-3">
      <span class="input-group-text">
        <i class="bi bi-person-fill"></i>
      </span>
      <input type="text"
             class="form-control"
             placeholder="Username"
             v-model="username"
      >
    </div>
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
    <div class="input-group mb-3">
      <span class="input-group-text">
        <i class="bi bi-arrows-angle-contract"></i>
      </span>
      <input type="password"
             class="form-control"
             placeholder="Confirm Password"
             v-model="confirm"
      >
    </div>
    <hr>
    <button class="btn btn-success fw-bolder mt-1 d-block w-100 py-2"
            @click="registerUser"
            :disabled="password !== confirm || password.length < 6"
    >
      <i class="bi bi-person-plus-fill me-1"></i>
      Sign Up
    </button>
    <ErrorAlert :message="msgError"
                :isError="isError"
                @hide = "hideError"
    />
  </div>
</template>

<script>
import ErrorAlert from "../components/ErrorAlert";
import firebase from "firebase";
export default {
  name: "Register",
  components: {ErrorAlert},
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirm: '',
      isError: false,
      msgError: ''
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
    registerUser() {
      firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
          .then(res => {
            this.isError = false
            this.msgError = ''

            res.user.updateProfile({
              displayName: this.username
            })
              .then(() => {
                this.$router.push('/account')
              })
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
