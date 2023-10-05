export const contentConfig: {
  pageName?: string
  header?: string
  btn?: string
  dataItem: Array<{
    type?: string
    label?: string
    prop?: string
    slotName?: string
  }>
} = {
  pageName: "menu",
  header: "菜单列表",
  btn: "新建菜单",
  dataItem: [
    {
      type: "index",
      label: "序号"
    },
    { prop: "name", label: "菜单名称" },
    { prop: "type", label: "级别" },
    { prop: "url", label: "菜单URL" },
    { prop: "icon", label: "菜单icon" },
    { prop: "sort", label: "排序" },
    { prop: "permission", label: "权限" },
    { prop: "createAt", label: "创建时间" },
    { prop: "updateAt", label: "更新时间" },
    {
      type: "operation",
      label: "操作"
    }
  ]
}
export const modelConfig: {
  pageName: string
  headerName: string[]
  modelItem: Array<{
    type?: string
    label?: string
    prop?: string
    placeholder?: string
    options?: string[]
    slotName?: string
  }>
} = {
  pageName: "department",
  headerName: ["新建菜单", "编辑菜单"],
  modelItem: [
    {
      type: "input",
      label: "菜单名称",
      prop: "name",
      placeholder: "请输入菜单名称"
    },
    {
      type: "input",
      label: "权限介绍",
      prop: "intro",
      placeholder: "请选择权限介绍"
    },
    {
      type: "custom",
      slotName: "menulist"
    }
  ]
}
