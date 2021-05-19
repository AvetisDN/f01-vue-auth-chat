<template>
    <div class="alert alert-danger alert-dismissible mt-3" v-if="isError">
      {{ message }}
      <button class="btn-close"
              @click="$emit('hide')"
      ></button>
    </div>
</template>

<script>
export default {
  name: "ErrorAlert",
  props: {
    message: String,
    isError: Boolean
  },
}
</script>

<style scoped>

</style>
