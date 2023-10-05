import myRequest from "../axios"
import type { Iaccount } from "../../types/type"
// import { localCatch } from "@/utils/catch"

export function accountLogin(account: Iaccount) {
  return myRequest.post({
    url: "/login",
    data: account
  })
}

export function getUserInfoById(id: string) {
  return myRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: localCatch.getCatch("token")
    // }
  })
}

export function getUserMenusByRoleId(id: number) {
  return myRequest.get({
    url: `/role/${id}/menu`
  })
}
