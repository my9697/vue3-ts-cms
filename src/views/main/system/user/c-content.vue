<script setup lang="ts">
import useUserStore from "../../../../stores/user/user"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const info = {}
const UserStore = useUserStore()
UserStore.postUserListAction(info)
const { userList, userTotal } = storeToRefs(UserStore)

const currentPage = ref(1)
const pageSize = ref(10)

function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

function fetchUserListData(data = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...data }

  UserStore.postUserListAction(queryInfo)
}
defineExpose({ fetchUserListData })

function deleteClick(id: number) {
  UserStore.deleteUserByIdAction(id)
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
      <h3>用户列表</h3>
      <el-button type="primary" @click="newUserClick">新建用户</el-button>
    </div>
    <div class="tabel">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="realName" label="真实姓名" />
        <el-table-column prop="cellphone" label="手机号" />
        <el-table-column prop="enable" label="状态">
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'primary' : 'danger'">{{
              scope.row.enable ? "启用" : "禁用"
            }}</el-button>
          </template>
        </el-table-column>
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
          :total="userTotal"
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
