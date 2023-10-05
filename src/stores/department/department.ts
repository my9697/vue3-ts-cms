import { postList, deleteById, createDepartment, editData } from "@/serve/common-list/common-list"
// import { postList } from "@/serve/department/department"
import { defineStore } from "pinia"

const useDepartmentStore = defineStore("department", {
  state: () => ({
    total: 0,
    list: []
  }),
  actions: {
    async postListAction(pageName: string, info: any) {
      const pageListResult = await postList(pageName, info)
      if (pageListResult.data) {
        const { totalCount, list } = pageListResult.data
        this.total = totalCount
        this.list = list
      }
    },
    async deleteByIdAction(pageName: string, id: number) {
      const deleteId = await deleteById(pageName, id)
      this.postListAction(pageName, { offset: 10, size: 0 })
    },
    async createDepartmentAction(pageName: string, Info: any) {
      const newResult = await createDepartment(pageName, Info)
      this.postListAction(pageName, { offset: 0, size: 10 })
    },
    async editDataAction(pageName: string, id: number, Info: any) {
      const editResult = await editData(pageName, id, Info)
      this.postListAction(pageName, { offset: 0, size: 10 })
    }
  }
})
export default useDepartmentStore
