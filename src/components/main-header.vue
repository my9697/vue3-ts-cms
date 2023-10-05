<script setup lang="ts">
import { ref } from "vue"
import infoMessage from "./info-message.vue"
import breadcrumb from "./breadcrumb.vue"

const emit = defineEmits(["foldChange"])

const flag = ref(false)
function foldClick() {
  flag.value = !flag.value
  emit("foldChange", flag.value)
}
</script>

<template>
  <div class="header">
    <div class="menu-icon" @click="foldClick">
      <template v-if="flag"></template>
      <el-icon>
        <component :is="flag ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <breadcrumb />
      </div>
      <div class="info">
        <infoMessage />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  display: flex;
  flex-direction: row;
  .menu-icon {
    flex: 1;
    font-size: 20px;
    margin: 8px 13px;
  }
  .content {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    position: relative;
    flex: 50;
    .info {
      margin-left: 100px;
      position: absolute;
      right: 18px;
      top: 0px;
    }
  }
}
</style>
