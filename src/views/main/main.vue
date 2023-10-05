<script setup lang="ts">
import mainMenus from "../../components/main-menus.vue"
import mianHeader from "../../components/main-header.vue"
import { ref } from "vue"

const isCollapse = ref(false)
function foldChange(flag: boolean) {
  isCollapse.value = flag
}
</script>

<template>
  <div class="main">
    <el-container class="content">
      <el-aside class="aside" :width="isCollapse ? '50px' : '180px'">
        <mainMenus />
      </el-aside>
      <el-container>
        <el-header>
          <mianHeader @foldChange="foldChange" />
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.main {
  height: 100%;
  .content {
    height: 100%;
    .aside {
      height: 100%;
      background-color: #001529;
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-width: none;
      cursor: pointer;
      transition: all 0.5s;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-header {
      padding: 0px;
      height: 35px;
    }
  }
}
</style>
