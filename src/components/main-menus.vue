<script setup lang="ts">
import useLoginStore from "../stores/login/login"
import { useRouter, useRoute } from "vue-router"
import { computed } from "vue"
import { mapPathToMenu } from "../utils/map-menus"

// 获取动态菜单
const loginStore = useLoginStore()
const userMenus =
  typeof loginStore.userMenus === "string" ? JSON.parse(loginStore.userMenus) : loginStore.userMenus

// 监听点击
const router = useRouter()
function itemClick(subitem: any) {
  const url = subitem.url
  router.push(url)
}

// 默认菜单
const route = useRoute()

const defaltActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ""
})
</script>

<template>
  <div class="menus">
    <div class="logo">
      <div class="img">
        <img src="../../public/favicon.ico" alt="" />
        <div class="text">MYu-CMS</div>
      </div>
    </div>
    <div class="content">
      <el-menu background-color="#001529" :default-active="defaltActive">
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <div class="icon">
                <el-icon>
                  <component :is="item.icon?.split('-icon-')[1]"></component>
                </el-icon>
              </div>
              <div class="ti-tle">{{ item.name }}</div>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id + ''">
              <el-menu-item class="active" @click="itemClick(subitem)">{{
                subitem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.logo {
  .img {
    display: flex;
    flex-direction: row;

    margin: 10px 20px;
    width: 25px;
    height: 25px;
    img {
      width: 100%;
    }
    .text {
      font-size: 16px;
      font-weight: 700;
      color: white;
      margin-left: 10px;
      text-align: center;
      white-space: nowrap;
      height: 25px;
      line-height: 25px;
    }
  }
}
.ti-tle {
  color: white;
}
.icon {
  color: white;
}
.el-menu {
  background-color: #001529;
}
.el-menu-item {
  background-color: #0c2135;
  color: #fff;
}
.active:hover {
  background-color: #0a60bd;
}
</style>
