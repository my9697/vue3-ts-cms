<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
</script>

<template>
  <div class="App">
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<style scoped lang="less">
.App {
  width: 100vw;
  height: 100vh;
}
</style>
