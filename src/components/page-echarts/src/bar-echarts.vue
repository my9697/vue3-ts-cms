<script setup lang="ts">
import baseEcharts from "./base-echart.vue"
import type { EChartsOption } from "echarts"
import { computed } from "vue"

const props = defineProps<{
  labels: string[]
  values: string[]
}>()

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
    xAxis: {
      data: props.labels
    },
    yAxis: {},
    series: [
      {
        label: { show: true },
        center: ["50%", "50%"],

        left: "5%",
        type: "bar",
        data: props.values
      }
    ]
  }
})
</script>

<template>
  <div class="bar">
    <baseEcharts :option="option" />
  </div>
</template>

<style scoped lang="less"></style>
