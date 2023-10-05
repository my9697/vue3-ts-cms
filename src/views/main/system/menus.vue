<script setup lang="ts">
import pageContent from "../../../components/page-content.vue"
import { contentConfig, modelConfig } from "./menu/menu-config"
import useModel from "../../../hooks/pageModel"
import usePageContent from "../../../hooks/page-content"
import pageModel from "../../../components/page-model.vue"

import { ref, nextTick } from "vue"

const { modelRef, handleEdit, handleNew } = useModel()
const { contentRef } = usePageContent()
</script>

<template>
  <div class="menus">
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @edit-click="handleEdit"
      @new-click="handleNew"
    />
  </div>
</template>

<style scoped lang="less"></style>
