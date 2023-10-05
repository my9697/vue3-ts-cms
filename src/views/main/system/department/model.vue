<script setup lang="ts">
import { ref, reactive } from "vue"
import useUserStore from "../../../../stores/user/user"
import useDepartmentStore from "../../../../stores/department/department"
import { storeToRefs } from "pinia"

const formData = reactive({
  name: "",
  leader: "",
  parentId: ""
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
const { allDepartment } = storeToRefs(mainStore)

const departmentStore = useDepartmentStore()

function confirmClick() {
  centerDialogVisible.value = false
  if (!isNewRef.value && edit.value) {
    departmentStore.editDataAction("department", edit.value.id, formData)
  } else {
    departmentStore.createDepartmentAction("department", formData)
  }
}
</script>

<template>
  <div class="model">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="100px">
        <div class="form">
          <el-form-item label="选择部门" prop="name">
            <el-select v-model="formData.name" placeholder="请选择部门">
              <template v-for="item in allDepartment" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="上级部门" prop="name">
            <el-select v-model="formData.parentId" placeholder="请选择上级部门">
              <template v-for="item in allDepartment" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="领导名字" prop="leader">
            <el-input v-model="formData.leader" placeholder="领导名字" />
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
