import { accountLogin, getUserMenusByRoleId } from "@/serve/login/login"
import { defineStore } from "pinia"
import type { Iaccount } from "../../types/type"
import { localCatch } from "@/utils/catch"
import { getUserInfoById } from "../../serve/login/login"
import { mapMenusToRoutes, mapmenuListToPermissions } from "../../utils/map-menus"
import { router } from "@/router/index"
import useUserStore from "../user/user"

// 如何指定stata的类型
interface ILoginStata {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}
const useLoginStore = defineStore("login", {
  state: (): ILoginStata => ({
    token: "",
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    // 登录逻辑
    async accountLoginAction(account: Iaccount) {
      // 帐号登录，获取token等信息
      const logineRef = await accountLogin(account)
      const id = logineRef.data.id
      this.token = logineRef.data.token

      // 将后端返回的token存到storage
      localCatch.setCatch("token", this.token)

      // 获取用户的角色信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 根据角色请求用户权限
      // (同时这也是动态添加路由里面的获取菜单)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusResult.data
      const userMenus = this.userMenus

      // 获取登录用户所有按钮的权限
      const permission = mapmenuListToPermissions(userMenus)
      this.permissions = permission

      // 进行本地缓存
      localCatch.setCatch("userInfo", JSON.stringify(userInfoResult.data))
      localCatch.setCatch("userMenus", JSON.stringify(userMenusResult.data))

      const mainStore = useUserStore()
      mainStore.getAllRoleAction()
      mainStore.getDepartmentIdAction()

      // 获取登录用户所有按钮的权限
      this.permissions = mapmenuListToPermissions(userMenus)

      // 动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute("main", route)
      })
    },
    loadLocalCatchAction() {
      // 用户刷新默认加载数据
      const token = localCatch.getCatch("token")
      const userInfo = localCatch.getCatch("userInfo")
      const userMenus = localCatch.getCatch("userMenus")
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        const mainStore = useUserStore()
        mainStore.getAllRoleAction()
        mainStore.getDepartmentIdAction()

        // 动态添加路由
        const routes = mapMenusToRoutes(JSON.parse(userMenus))
        routes.forEach((route) => {
          router.addRoute("main", route)
        })
      }
    }
  }
})

export default useLoginStore
