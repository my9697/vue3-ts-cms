import { useRouter } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

function loadLocalRoutes() {
  // 2.动态获取所有路由对象，放到数组中
  // *路由对象都在独立文件中
  // *从文件中将所有路由对象先读取到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob("../router/main/**/*.ts", {
    eager: true
  })

  // 1.2将加载到的对象加载到localRoutes里面
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenus: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.获取菜单（userMessage）
  // *代码写在的位置
  //  2.加载本地路由
  const localRoutes = loadLocalRoutes()
  // 3.根据菜单去匹配正确的路由
  // *router.addRouter('main',xxx)
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => {
        item.path === submenu.url
        return true
      })

      if (route) {
        if (!routes.find((item) => item.path === menu.url))
          routes.push({ path: menu.url, redirect: route.path })
      }
      // 第一个被匹配到的菜单
      if (!firstMenus && route) {
        firstMenus = submenu
      }
    }
  }
  return routes
}

/**
 * 根据路径匹配所有菜单
 * @param path 要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBread(path: string, userMenus: any[]) {
  const breadcrum: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrum.push({ name: menu.name, path: menu.url })
        breadcrum.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrum
}
/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  function recurseGetId(menuList: any[]) {
    for (const item of menuList) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}
/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单列表
 * @returns 权限的数组
 */
export function mapmenuListToPermissions(menuList: any[]) {
  const permission: string[] = []
  function recursetGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permission.push(item.permission)
      } else {
        recursetGetPermission(item.children ?? [])
      }
    }
  }
  recursetGetPermission(menuList)
  return permission
}
