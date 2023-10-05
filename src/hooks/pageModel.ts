import { ref } from "vue"
import type model from "../components/page-model.vue"

function useModel(newCallback?: (data?: any) => void, EditCallback?: (data?: any) => void) {
  const modelRef = ref<InstanceType<typeof model>>()
  function handleEdit(scope: any) {
    modelRef.value?.setModel(false, scope)

    if (EditCallback) {
      EditCallback(scope)
    }
    if (newCallback) newCallback()
  }
  function handleNew() {
    modelRef.value?.setModel()
  }
  return {
    modelRef,
    handleEdit,
    handleNew
  }
}
export default useModel
