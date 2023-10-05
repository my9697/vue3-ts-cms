export const searchConfig = {
  pageName: "department",
  formItem: [
    {
      type: "input",
      props: "name",
      label: "部门名称",
      placeholder: "请输入查询部门名称",
      initialValue: "qq"
    },
    {
      type: "input",
      props: "leader",
      label: "部门领导",
      placeholder: "请输入查询部门领导"
    },
    {
      type: "date-picker",
      props: "creat",
      label: "创建时间"
    }
  ]
}
export const contentConfig = {
  pageName: "department",
  header: "部门列表",
  btn: "新建部门",

  dataItem: [
    {
      type: "selection"
    },
    {
      type: "index",
      label: "序号"
    },
    { type: "normal", prop: "name", label: "部门名称", slotName: "department" },
    { type: "custom", prop: "leader", label: "部门领导", slotName: "leader" },
    { type: "normal", prop: "parentId", label: "上级部门" },
    { type: "normal", prop: "createAt", label: "创建时间" },
    { type: "normal", prop: "updateAt", label: "更新时间" },
    {
      type: "operation",
      label: "操作"
    }
  ]
}
export const modelConfig = {
  pageName: "department",
  headerName: ["新建部门", "编辑部门"],
  modelItem: [
    {
      type: "select",
      label: "选择部门",
      prop: "name",
      placeholder: "请选择部门",
      options: []
    },
    {
      type: "select",
      label: "上级部门",
      prop: "parentId",
      placeholder: "请选择上级部门",
      options: []
    },
    {
      type: "input",
      label: "部门领导",
      prop: "leader",
      placeholder: "请输入部门领导"
    }
  ]
}
