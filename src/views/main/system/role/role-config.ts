export const searchConfig: {
  pageName: string
  formItem: Array<{
    type: string
    props: string
    label: string
    placeholder?: string
    initialValue?: string
  }>
} = {
  pageName: "role",
  formItem: [
    {
      type: "input",
      props: "name",
      label: "角色名称",
      placeholder: "请输入查询角色名称",
      initialValue: "qq"
    },
    {
      type: "input",
      props: "jurisdiction",
      label: "部门领导",
      placeholder: "请输入查询权限介绍"
    },
    {
      type: "date-picker",
      props: "creat",
      label: "创建时间"
    }
  ]
}

export const contentConfig: {
  pageName: string
  header: string
  btn: string
  dataItem: Array<{
    type?: string
    label?: string
    prop?: string
    slotName?: string
  }>
} = {
  pageName: "role",
  header: "角色列表",
  btn: "新建角色",
  dataItem: [
    {
      type: "selection"
    },
    {
      type: "index",
      label: "序号"
    },
    { type: "normal", prop: "name", label: "角色名称", slotName: "role" },
    { type: "custom", prop: "jurisdiction", label: "权限介绍", slotName: "jurisdiction" },

    { type: "normal", prop: "createAt", label: "创建时间" },
    { type: "normal", prop: "updateAt", label: "更新时间" },
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
    slotName?: string
    options?: string[]
  }>
} = {
  pageName: "role",
  headerName: ["新建角色", "编辑角色"],
  modelItem: [
    {
      type: "select",
      label: "选择角色",
      prop: "name",
      placeholder: "请选择角色"
    },
    {
      type: "select",
      label: "权限介绍",
      prop: "jurisdiction",
      placeholder: "请选择权限"
    },
    {
      type: "custom",
      slotName: "menulist"
    }
  ]
}
