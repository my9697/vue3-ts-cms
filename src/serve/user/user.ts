import myRequest from "../axios/index"

export function postUserList(info: Record<string, any>) {
  return myRequest.post({
    url: "/users/list",
    data: info
  })
}

export function deleteUserById(id: number) {
  return myRequest.delete({
    url: `/users/${id}`
  })
}
export function getAllRole() {
  return myRequest.post({
    url: "/role/list"
  })
}
export function getDepartmentId() {
  return myRequest.post({
    url: "/department/list"
  })
}
export function createUser(userInfo: any) {
  return myRequest.post({
    url: "/users",
    data: userInfo
  })
}
export function editData(id: number, userInfo: any) {
  return myRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
