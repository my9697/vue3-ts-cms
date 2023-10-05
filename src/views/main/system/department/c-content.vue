<script setup lang="ts">
import useDepartmentStore from "../../../../stores/department/department"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const info = {}
const departmentStore = useDepartmentStore()
departmentStore.postListAction("department", info)
const { list, total } = storeToRefs(departmentStore)

const currentPage = ref(1)
const pageSize = ref(10)

function handleSizeChange() {
  fetchListData()
}

function handleCurrentChange() {
  fetchListData()
}

function fetchListData(data = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const Info = { ...pageInfo, ...data }

  departmentStore.postListAction("department", Info)
}
defineExpose({ fetchListData })

function deleteClick(id: number) {
  departmentStore.deleteByIdAction("department", id)
}

const emit = defineEmits(["newClick", "editClick"])
function newUserClick() {
  emit("newClick")
}

function editClick(scope: any) {
  emit("editClick", scope)
}
</script>

<template>
  <div class="content">
    <div class="header">
      <h3>部门列表</h3>
      <el-button type="primary" @click="newUserClick">新建部门</el-button>
    </div>
    <div class="tabel">
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" />
        <el-table-column prop="name" label="部门名称" />
        <el-table-column prop="leader" label="部门领导" />
        <el-table-column prop="parentId" label="上级部门" />
        <el-table-column prop="createAt" label="创建时间" />
        <el-table-column prop="updateAt" label="更新时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" icon="Edit" @click="editClick(scope.row)">编辑</el-button>
            <el-button type="danger" icon="Delete" @click="deleteClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fooder">
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          layout="sizes, prev, pager, next, jumper,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  h3 {
    margin-top: 20px;
    padding: 20px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
