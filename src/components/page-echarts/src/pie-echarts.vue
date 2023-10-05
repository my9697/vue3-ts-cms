<script setup lang="ts">
import baseEcharts from "./base-echart.vue"
import type { EChartsOption } from "echarts"
import { computed } from "vue"
import type { IData } from "../types/type.ts"

const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: "Referer of a Website",
      subtext: "Fake Date",
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      left: "left"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)"
          }
        }
      }
    ]
  }
})

interface Iprops {
  pieData: IData[]
}

const props = defineProps<Iprops>()
</script>

<template>
  <div class="pie"><baseEcharts :option="option" /></div>
</template>

<style scoped lang="less"></style>
