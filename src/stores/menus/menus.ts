import { defineStore } from "pinia"
import { postList } from "@/serve/common-list/common-list"

const useMenuStore = defineStore("menus", {
  state: () => ({
    menuList: []
  }),
  actions: {
    async postListAction(pageName: string, info: any) {
      const menuListResult = await postList(pageName, info)
      this.menuList = menuListResult.data?.list
    }
  }
})

export default useMenuStore
