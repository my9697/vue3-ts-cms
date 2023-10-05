<script setup lang="ts">
import cDashboard from "./dashboard/c-dashboard.vue"
import useDashboardStore from "../../../stores/dashboard/dashboard"
import { storeToRefs } from "pinia"
import pie from "../../../components/page-echarts/src/pie-echarts.vue"
import Line from "../../../components/page-echarts/src/line-echarts.vue"
import Rose from "../../../components/page-echarts/src/rose-echarts.vue"
import Bar from "../../../components/page-echarts/src/bar-echarts.vue"
import Map from "../../../components/page-echarts/src/map-echarts.vue"
import { computed } from "vue"
import type { IData } from "../../../components/page-echarts/types/type"

const dashboardStore = useDashboardStore()
dashboardStore.fetchDashboardAction()
dashboardStore.fetchGoodsCategoryCountAction()
dashboardStore.fetchGoodsCategorySaleAction()
dashboardStore.fetchGoodsCategoryFavorAction()
dashboardStore.fetchGoodsAddressSaleAction()

const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(dashboardStore)

const showGoodsCount = computed<IData[]>(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsSale = computed<IData[]>(() => {
  return goodsCategorySale.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsFavor = computed<{
  labels: string[]
  values: string[]
}>(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)

  return { labels, values }
})

const labels = computed(() => goodsCategorySale.value.map((item) => item.name))
const values = computed(() => goodsCategorySale.value.map((item) => item.goodsCount))

const showGoodsAddress = computed<IData[]>(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6"> <cDashboard v-bind="item" /></el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <pie :pie-data="showGoodsCount" />
      </el-col>
      <el-col :span="7">
        <Map :map-data="showGoodsAddress" />
      </el-col>
      <el-col :span="7">
        <Line :values="values" :labels="labels" />
      </el-col>
      <el-col :span="10">
        <Rose :rose-data="showGoodsSale" />
      </el-col>
      <el-col :span="10">
        <Bar v-bind="showGoodsFavor" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less"></style>
