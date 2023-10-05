import { ref } from "vue"
import type content from "../components/page-content.vue"

function usePageContent() {
  const contentRef = ref<InstanceType<typeof content>>()

  function handleQuery(searchForm: Record<string, any>) {
    contentRef.value?.fetchListData(searchForm)
  }
  function handleReset() {
    contentRef.value?.fetchListData()
  }
  return {
    contentRef,
    handleQuery,
    handleReset
  }
}
export default usePageContent
