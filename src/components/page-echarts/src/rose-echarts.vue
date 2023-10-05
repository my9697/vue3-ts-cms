<script setup lang="ts">
import { computed } from "vue"
import baseEchart from "./base-echart.vue"
import type { EChartsOption } from "echarts"
import type { IData } from "../types/type.ts"

interface Iprops {
  roseData: IData[]
}
const props = defineProps<Iprops>()

const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "访问来源",
        radius: [10, 160],
        center: ["50%", "50%"],
        bottom: "-20%",
        left: "5%",
        type: "pie",
        data: props.roseData,
        itemStyle: {
          borderRadius: 8
        },
        label: { show: true },
        roseType: "area"
      }
    ]
  }
})
</script>

<template>
  <div class="rose">
    <baseEchart :option="option" />
  </div>
</template>

<style scoped lang="less"></style>
