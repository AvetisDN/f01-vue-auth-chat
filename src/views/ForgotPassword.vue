<template>
  <div class="p-4 bg-light rounded shadow col-12 col-sm-8 col-md-5 col-lg-3">
    <h3 class="fw-bolder text-black-50 mb-4 text-center">Reset Password</h3>
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
    <hr>
    <button class="btn btn-danger fw-bolder mt-1 d-block w-100 py-2" @click="resetPassword">
      <i class="bi bi-arrow-clockwise me-1"></i>
      Reset
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
  name: "ForgotPassword",
  components: {ErrorAlert},
  data() {
    return {
      email: '',
      isError: false,
      msgError: 'Error'
    }
  },
  methods: {
    hideError() {
      this.isError = false
    },
    resetPassword() {
      firebase
      .auth()
      .sendPasswordResetEmail(this.email)
          .then(() => {
            alert('Check your email for further instructions')
            this.email = ''
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
