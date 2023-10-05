<script setup lang="ts">
import { ref, reactive } from "vue"
import useUserStore from "../../../../stores/user/user"
import { storeToRefs } from "pinia"

const formData = reactive({
  name: "",

  realName: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
})

const centerDialogVisible = ref(false)
const edit = ref()

const isNewRef = ref(true)
function setModel(isNew: boolean = true, scope?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew

  if (!isNewRef.value && scope) {
    for (const key in formData) {
      formData[key] = scope[key]
    }
    edit.value = scope
  } else {
    for (const key in formData) {
      formData[key] = ""
    }
    edit.value = null
  }
}
defineExpose({ setModel })

const mainStore = useUserStore()
const { allDepartment, allRole } = storeToRefs(mainStore)

function confirmClick() {
  centerDialogVisible.value = false
  if (!isNewRef.value && edit.value) {
    mainStore.editDataAction(edit.value.id, formData)
  } else {
    mainStore.createUserAction(formData)
  }
}
</script>

<template>
  <div class="model">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="100px">
        <div class="form">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="formData.realName" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isNewRef">
            <el-input v-model="formData.password" placeholder="请输入密码" :show-password="true" />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号" />
          </el-form-item>

          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色">
              <template v-for="item in allRole" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请输入部门">
              <template v-for="item in allDepartment" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmClick"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
.el-select {
  width: 100%;
}
</style>
