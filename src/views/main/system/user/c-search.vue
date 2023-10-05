<script setup lang="ts">
import { reactive } from "vue"

const searchForm = reactive({
  name: "",
  realName: "",
  cellphone: "",
  enable: 1,
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
          <el-form-item label="用户名">
            <el-input placeholder="请输入查询的用户名" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realName">
            <el-input placeholder="请输入用户名" v-model="searchForm.realName" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入号码" v-model="searchForm.cellphone" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select placeholder="请选择查询状态" style="width: 100%" v-model="searchForm.enable">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
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
