import myRequest from "../axios/index"

export function postList(pageName: string, info: Record<string, any>) {
  return myRequest.post({
    url: `/${pageName}/list`,
    data: info
  })
}

export function deleteById(pageName: string, id: number) {
  return myRequest.delete({
    url: `/${pageName}/${id}`
  })
}
// export function getAllRole() {
//   return myRequest.post({
//     url: "/role/list"
//   })
// }
// export function getDepartmentId() {
//   return myRequest.post({
//     url: "/department/list"
//   })
// }
export function createDepartment(pageName: string, Info: any) {
  return myRequest.post({
    url: `/${pageName}`,
    data: Info
  })
}
export function editData(pageName: string, id: number, Info: any) {
  return myRequest.patch({
    url: `/${pageName}/${id}`,
    data: Info
  })
}
