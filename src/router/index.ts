import { localCatch } from "@/utils/catch"
import { firstMenus } from "@/utils/map-menus"
import { createRouter, createWebHashHistory } from "vue-router"

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main/main.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/not-found/not-found.vue")
    }
  ]
})

// 实现动态添加路由
// 1.获取所有路由
const localRoutes = [
  {
    path: "/main/analysis/overview",
    component: () => import("../views/main/analysis/overview.vue")
  },

  {
    path: "/main/analysis/dashboard",
    component: () => import("../views/main/analysis/dashboard.vue")
  },
  {
    path: "/main/system/user",
    component: () => import("../views/main/system/user.vue")
  },
  {
    path: "/main/system/role",
    component: () => import("../views/main/system/role.vue")
  },
  {
    path: "/main/system/department",
    component: () => import("../views/main/system/department-1.vue")
  },
  {
    path: "/main/system/menu",
    component: () => import("../views/main/system/menus.vue")
  }
]

// 2.动态添加路由
for (const [index, value] of Object.entries(localRoutes)) {
  router.addRoute("main", localRoutes[index as any])
}
// 导航守卫
// 两个参数，to（到哪里），from（哪里来）
// 返回值：决定导航路径
router.beforeEach((to, from) => {
  if (to.path.startsWith("/main")) {
    // 只有登录成功才能进入到main里面
    const token = localCatch.getCatch("token")
    if (!token) {
      return "/login"
    }

    // 如果进入到main当中
    if (to.path === "/main" && token) {
      return firstMenus?.url
    }
  }
})

export default router
