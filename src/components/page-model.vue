<script setup lang="ts">
import { ref, reactive, defineProps } from "vue"

import useDepartmentStore from "../stores/department/department"

interface Iprops {
  modelConfig: {
    pageName: string
    headerName: string[]
    modelItem: any[]
  }
  otherMenu?: any
}
const props = defineProps<Iprops>()
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

const departmentStore = useDepartmentStore()

function confirmClick() {
  centerDialogVisible.value = false
  let infodata = { ...formData }
  if (props.otherMenu) {
    infodata = { ...infodata, ...props.otherMenu }
  }
  if (!isNewRef.value && edit.value) {
    departmentStore.editDataAction(props.modelConfig.pageName, edit.value.id, infodata)
  } else {
    departmentStore.createDepartmentAction(props.modelConfig.pageName, infodata)
  }
}
</script>

<template>
  <div class="model">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? props.modelConfig.headerName[0] : props.modelConfig.headerName[1]"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="100px">
        <div class="form">
          <template v-for="item in props.modelConfig.modelItem" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder">
                  <template v-for="iten in item.options" :key="iten.value">
                    <el-option :label="iten.label" :value="iten.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'input'">
                <el-input v-model="formData.leader" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
