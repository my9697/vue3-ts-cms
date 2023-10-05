import myRequest from "../axios/index"

export function postList(info: Record<string, any>) {
  return myRequest.post({
    url: "/department/list",
    data: info
  })
}
