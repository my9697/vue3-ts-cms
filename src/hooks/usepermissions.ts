import useLoginStore from "@/stores/login/login"

export function usepermissions(permissionId: string) {
  const logineStore = useLoginStore()
  const { permissions } = logineStore

  return !!permissions.find((item) => {
    item.includes(permissionId)
  })
}
