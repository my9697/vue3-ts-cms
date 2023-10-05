<script setup lang="ts">
import search from "../../../components/page-search.vue"
import content from "../../../components/page-content.vue"
import model from "../../../components/page-model.vue"
// import model from "./department/model.vue"
import { computed } from "vue"
import { searchConfig, contentConfig, modelConfig } from "./department/config"
import useUserStore from "../../../stores/user/user"
import usePageContent from "../../../hooks/page-content"
import useModel from "../../../hooks/pageModel"

const { contentRef, handleQuery, handleReset } = usePageContent()
const { modelRef, handleEdit, handleNew } = useModel()

const modelConfigRef = computed(() => {
  modelConfig.modelItem.forEach((item) => {
    const mainStore = useUserStore()
    const department = mainStore.allDepartment?.map((item) => {
      return { label: item.name, value: item.id }
    })
    if (department) {
      if (item.prop === "name" || item.prop === "parentId") {
        item.options = [...department]
      }
    }
  })
  return modelConfig
})
</script>

<template>
  <div class="department">
    <search @query-click="handleQuery" @reset-click="handleReset" :search-config="searchConfig" />
    <content
      ref="contentRef"
      @edit-click="handleEdit"
      @new-click="handleNew"
      :content-config="contentConfig"
    >
      <template #leader="scope"> {{ scope.row.leader }} </template>
    </content>
    <model ref="modelRef" :model-config="modelConfigRef" />
  </div>
</template>

<style scoped lang="less"></style>
