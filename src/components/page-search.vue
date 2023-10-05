<script setup lang="ts">
import { reactive } from "vue"
import { defineProps } from "vue"
import { usepermissions } from "../hooks/usepermissions"

interface Iprops {
  searchConfig: {
    pageName: string
    formItem: Array<{
      type: string
      props: string
      label: string
      placeholder?: string
      initialValue?: string
    }>
  }
}

const props = defineProps<Iprops>()
const initialForm: any = {}
for (let item of props.searchConfig.formItem) {
  initialForm[item.props] = item.initialValue ?? ""
}
const searchForm = reactive(initialForm)

const emit = defineEmits(["queryClick", "resetClick"])

function resetClick() {
  searchForm.name = ""
  emit("resetClick")
}
function queryClick() {
  emit("queryClick", searchForm)
}
const isQuery = usepermissions(`${props.searchConfig.pageName}:query`)
</script>

<template>
  <div class="search">
    <el-form label-width="88px" size="large" v-model="searchForm">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItem" :key="item.props">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.props">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.props]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.props]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button plain icon="Refresh" @click="resetClick">重置</el-button>
      <el-button primary plain icon="Search" @click="queryClick">查询</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  border-radius: 10px 10px 0px 0px;
  .el-form-item {
    padding: 20px 30px;
  }
  .btn {
    text-align: right;
    padding: 0 50px 10px 0;
    .el-button {
      height: 40px;
    }
  }
}
</style>
