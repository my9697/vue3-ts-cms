<script setup lang="ts">
import baseEchart from "./base-echart.vue"
import type { IData } from "../types/type"
import type { EChartsOption } from "echarts"
import { computed } from "vue"
import { convertData } from "../utils/convertData"

const props = defineProps<{ mapData: IData[] }>()
const option = computed<EChartsOption>(() => {
  return {
    backgroundColor: "#fff",
    title: {
      text: "全国销量统计",
      left: "center",
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return params.name + ":" + params.value[2]
      }
    },
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      inRange: {
        color: ["rgb(70,240,252)", "rgb(250,220,46)", "rgb(245,38,186)"]
      },
      textStyle: {
        color: "#fff"
      }
    },
    geo: {
      map: "China",
      roam: "scale",
      emphasis: {
        areaColor: "#f4cccc",
        borderColor: "rgb(9,54,95)",
        itemStyle: {
          areaColor: "#f4cccc"
        }
      }
    },
    series: [
      {
        name: "销量",
        type: "scatter",
        coordinateSystem: "geo",
        data: convertData(props.mapData),
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1
          }
        }
      }
    ]
  }
})
</script>

<template>
  <div class="map">
    <baseEchart :option="option" />
  </div>
</template>

<style scoped lang="less"></style>
