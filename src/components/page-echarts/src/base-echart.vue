<script setup lang="ts">
import * as echarts from "echarts"
import { ref, onMounted, watchEffect } from "vue"
import type { EChartsOption } from "echarts"
import ChinaJSON from "../data/china.json"

echarts.registerMap("China", ChinaJSON as any)

interface Iprops {
  option: EChartsOption
}
const props = defineProps<Iprops>()
const echartsRef = ref<HTMLElement>()
onMounted(() => {
  const echartsInstance = echarts.init(echartsRef.value, "light", { renderer: "canvas" })
  watchEffect(() => {
    echartsInstance.setOption(props.option)
  })
  window.addEventListener("resize", () => {
    echartsInstance.resize()
  })
})
</script>

<template>
  <div class="base-echarts">
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<style scoped lang="less">
.echarts {
  padding-top: 20px;
  height: 400px;
}
</style>
