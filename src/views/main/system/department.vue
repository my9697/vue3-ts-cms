<script setup lang="ts">
import search from "./department/c-search.vue"
import content from "./department/c-content.vue"
import model from "./department/model.vue"
import { ref } from "vue"

const contentRef = ref<InstanceType<typeof content>>()
function handleQuery(searchForm) {
  contentRef.value?.fetchListData(searchForm)
}
function handleReset() {
  contentRef.value?.fetchListData()
}
const modelRef = ref<InstanceType<typeof model>>()
function handleEdit(scope) {
  modelRef.value?.setModel(false, scope)
}
function handleNew() {
  modelRef.value?.setModel()
}
</script>

<template>
  <div class="department">
    <search @query-click="handleQuery" @reset-click="handleReset" />
    <content ref="contentRef" @edit-click="handleEdit" @new-click="handleNew" />
    <model ref="modelRef" />
  </div>
</template>

<style scoped lang="less"></style>
