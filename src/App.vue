<template>
  <div class="min-vh-100 bg-primary p-1 p-sm-2 p-lg-3 d-flex flex-column">
    <navigation />
    <div class="flex-grow-1 d-flex align-items-center justify-content-center pb-5">
      <transition name="custom-transition"
                  enter-active-class="animate__animated animate__fadeInDown animate__faster"
      >
        <router-view class="view"/>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
</style>
<script>
import Navigation from "./components/Navigation";
export default {
  components: {Navigation}
}
</script>
