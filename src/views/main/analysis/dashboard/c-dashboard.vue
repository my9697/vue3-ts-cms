<script setup lang="ts">
import { CountUp } from "countup.js"
import { ref, onMounted } from "vue"

interface Iprops {
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
  amount?: string
}
const props = withDefaults(defineProps<Iprops>(), {
  title: "商品总销量",
  tips: "所有商品总销量",
  number1: 509989,
  number2: 509989,
  subtitle: "商品总销量"
})
const countRef1 = ref<HTMLElement>()
const countRef2 = ref<HTMLElement>()
onMounted(() => {
  // 参数1是执行动画的元素
  // 参数2是执行的数字递增
  const countup1 = new CountUp(countRef1.value, props.number1, {})
  const countup2 = new CountUp(countRef2.value, props.number2, {})
  countup1.start()
  countup2.start()
})
</script>

<template>
  <div class="c-dashboard">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span v-if="amount === 'saleroom'">￥</span>
      <span ref="countRef1">{{ number1 }}</span>
    </div>
    <div class="fooder">
      <span>{{ subtitle }}</span>
      <span v-if="amount === 'saleroom'">￥</span>
      <span ref="countRef2">{{ number2 }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.c-dashboard {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-around;
    align-items: flex-end;
  }
  .content {
    padding-top: 10px;
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    align-items: center;

    align-items: flex-start;
  }
  .fooder {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
