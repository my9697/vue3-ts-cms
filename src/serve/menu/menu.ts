import myRequest from "../axios"

export function getMenus() {
  return myRequest.post({
    url: "/menu/list"
  })
}
