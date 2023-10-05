import {
  deleteUserById,
  postUserList,
  getAllRole,
  getDepartmentId,
  createUser,
  editData
} from "@/serve/user/user"
import { defineStore } from "pinia"

const useUserStore = defineStore("user", {
  state: () => ({
    userList: [],
    userTotal: 0,
    allRole: [],
    allDepartment: []
  }),
  actions: {
    async postUserListAction(info: Record<string, any>) {
      const userListResult = await postUserList(info)
      if (userListResult.data) {
        const { totalCount, list } = userListResult.data
        this.userTotal = totalCount
        this.userList = list
      }
    },
    async deleteUserByIdAction(id: number) {
      const deleteId = await deleteUserById(id)
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async getAllRoleAction() {
      const roleResult = await getAllRole()
      this.allRole = roleResult.data?.list
    },
    async getDepartmentIdAction() {
      const departmentReasult = await getDepartmentId()
      this.allDepartment = departmentReasult.data?.list
    },
    async createUserAction(userInfo: any) {
      const newResult = await createUser(userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
      const userStore = useUserStore()
      userStore
    },
    async editDataAction(id: number, userInfo: any) {
      const editResult = await editData(id, userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
    }
  }
})

export default useUserStore
