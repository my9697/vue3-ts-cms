<script setup lang="ts">
import { computed } from "vue"
import useLoginStore from "../stores/login/login"
import { mapPathToBread } from "../utils/map-menus"
import { useRoute } from "vue-router"

const route = useRoute()
const loginStore = useLoginStore()
const userMenus =
  typeof loginStore.userMenus === "string" ? JSON.parse(loginStore.userMenus) : loginStore.userMenus
const breadcrumb = computed(() => {
  return mapPathToBread(route.path, userMenus)
})
</script>

<template>
  <div class="bread">
    <el-breadcrumb separator="|">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="less"></style>
