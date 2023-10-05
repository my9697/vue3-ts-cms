<script setup lang="ts">
import baseEchart from "./base-echart.vue"
import type { EChartsOption } from "echarts"
import { computed } from "vue"

const props = defineProps<{ labels: string[]; values: string[] }>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.labels
    },
    yAxis: {
      type: "value"
    },

    series: [
      {
        data: props.values,
        stack: "总量",
        center: ["50%", "50%"],
        label: { show: true },
        emphasis: {
          focus: "series"
        },
        type: "line"
      }
    ]
  }
})
</script>

<template>
  <div class="line">
    <baseEchart :option="option" />
  </div>
</template>

<style scoped lang="less"></style>
