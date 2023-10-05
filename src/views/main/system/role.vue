<script setup lang="ts">
import pageSearch from "../../../components/page-search.vue"
import { searchConfig, contentConfig, modelConfig } from "./role/role-config"
import pageContent from "../../../components/page-content.vue"
import pageModel from "../../../components/page-model.vue"
import usePageContent from "../../../hooks/page-content"
import useModel from "../../../hooks/pageModel"
import { ref, nextTick } from "vue"
import useMenuStore from "../../../stores/menus/menus"
import { storeToRefs } from "pinia"
import type { ElTree } from "element-plus"
import { mapMenuListToIds } from "../../../utils/map-menus"

const { contentRef, handleQuery, handleReset } = usePageContent()
const { modelRef, handleEdit, handleNew } = useModel(newCallback, EditCallback)
const list = ref([])
const menuStore = useMenuStore()
menuStore.postListAction("menu", list)
const { menuList } = storeToRefs(menuStore)
const otherMenu = ref({})
function handleCheck(data1: any, data2: any) {
  const menulist = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherMenu.value = { menulist }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function EditCallback(scope) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(scope.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
</script>

<template>
  <div class="role">
    <div class="header">
      <pageSearch
        :search-config="searchConfig"
        @query-click="handleQuery"
        @reset-click="handleReset"
      />
    </div>
    <div class="content">
      <pageContent
        :content-config="contentConfig"
        ref="contentRef"
        @edit-click="handleEdit"
        @new-click="handleNew"
      />
    </div>
    <pageModel :model-config="modelConfig" :other-menu="otherMenu" ref="modelRef">
      <template #menulist>
        <el-tree
          ref="treeRef"
          @check="handleCheck"
          :data="menuList"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </pageModel>
  </div>
</template>

<style scoped lang="less"></style>
