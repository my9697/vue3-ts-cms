<script setup lang="ts">
import cLogin from "./c-login.vue"
</script>

<template>
  <div class="login">
    <cLogin />
  </div>
</template>

<style scoped lang="less">
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background: url("../../assets/img/login-bg.svg");
}
</style>
