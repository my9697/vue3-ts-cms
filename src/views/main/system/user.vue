<script setup lang="ts">
import search from "./user/c-search.vue"
import content from "./user/c-content.vue"
import model from "./user/model.vue"
import { ref } from "vue"

const contentRef = ref<InstanceType<typeof content>>()
function handleQueryClick(searchForm) {
  contentRef.value?.fetchUserListData(searchForm)
}

function resetClick() {
  contentRef.value?.fetchUserListData()
}

const modelRef = ref<InstanceType<typeof model>>()

function handelNewClick() {
  modelRef.value.setModel()
}

function handleEditClick(scope: any) {
  const isNew = false
  modelRef.value?.setModel(isNew, scope)
}
</script>

<template>
  <div class="user">
    <div class="search">
      <search @queryClick="handleQueryClick" @resetClick="resetClick" />
    </div>
    <div class="content">
      <content ref="contentRef" @newClick="handelNewClick" @editClick="handleEditClick" />
    </div>
    <model ref="modelRef" />
  </div>
</template>

<style scoped lang="less"></style>
