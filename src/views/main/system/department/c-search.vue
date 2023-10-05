<script setup lang="ts">
import { reactive } from "vue"

const searchForm = reactive({
  name: "",
  leader: "",
  parentId: "",
  create: ""
})

const emit = defineEmits(["queryClick", "resetClick"])
function resetClick() {
  searchForm.name = ""
  emit("resetClick")
}
function queryClick() {
  emit("queryClick", searchForm)
}
</script>

<template>
  <div class="search">
    <el-form label-width="88px" size="large" v-model="searchForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称">
            <el-input placeholder="请输入查询的部门" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入部门领导" v-model="searchForm.leader" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="create">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.create"
            ></el-date-picker>
          </el-form-item>
        </el-col>
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
