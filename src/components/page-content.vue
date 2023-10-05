<script setup lang="ts">
import useDepartmentStore from "../stores/department/department"
import { storeToRefs } from "pinia"
import { ref, defineProps } from "vue"
import { usepermissions } from "../hooks/usepermissions"

const props = defineProps<Iprops>()
const info = {}
const departmentStore = useDepartmentStore()
departmentStore.postListAction(props.contentConfig.pageName, info)
const { list, total } = storeToRefs(departmentStore)

const currentPage = ref(1)
const pageSize = ref(10)
departmentStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === "deleteByIdAction" ||
      name === "editDataAction" ||
      name === "createDepartmentAction"
    ) {
      currentPage.value = 1
    }
  })
})

function handleSizeChange() {
  fetchListData()
}

function handleCurrentChange() {
  fetchListData()
}

function fetchListData(data = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const Info = { ...pageInfo, ...data }

  departmentStore.postListAction(props.contentConfig.pageName, Info)
}
defineExpose({ fetchListData })

function deleteClick(id: number) {
  departmentStore.deleteByIdAction(props.contentConfig.pageName, id)
}

const emit = defineEmits(["newClick", "editClick"])
function newUserClick() {
  emit("newClick")
}

function editClick(scope: any) {
  emit("editClick", scope)
}
interface Iprops {
  contentConfig: {
    pageName?: string
    header?: string
    btn?: string
    dataItem: Array<{
      type?: string
      label?: string
      prop?: string
      slotName?: string
    }>
  }
}

const isCreate = usepermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usepermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usepermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usepermissions(`${props.contentConfig.pageName}:query`)
</script>

<template>
  <div class="content">
    <div class="header">
      <h3>{{ contentConfig.header }}</h3>
      <el-button v-if="isCreate" type="primary" @click="newUserClick">{{
        props.contentConfig.btn
      }}</el-button>
    </div>
    <div class="tabel">
      <el-table
        :data="list"
        border
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <template v-for="item in contentConfig.dataItem" :key="item.prop">
          <template v-if="item.type === 'normal'">
            <el-table-column :type="item?.type" :label="item?.label" :prop="item?.prop" />
          </template>
          <template v-if="item.type === 'operation'">
            <el-table-column :label="item.label">
              <template #default="scope">
                <el-button v-if="isUpdate" type="primary" icon="Edit" @click="editClick(scope.row)"
                  >编辑</el-button
                >

                <el-button
                  v-if="isDelete"
                  type="danger"
                  icon="Delete"
                  @click="deleteClick(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template
            v-if="item.type !== 'normal' && item.type !== 'operation' && item.type !== 'custom'"
          >
            <el-table-column :type="item?.type" :label="item?.label" :prop="item?.prop" />
          </template>
        </template>
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
