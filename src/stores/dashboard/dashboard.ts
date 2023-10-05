import { defineStore } from "pinia"
import {
  getAmountListData,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale
} from "@/serve/dashboard/dashboarrd"

interface IState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}
const useDashboardStore = defineStore("dashboard", {
  state: (): IState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchDashboardAction() {
      const amountResult = await getAmountListData()
      this.amountList = amountResult.data
    },
    async fetchGoodsCategoryCountAction() {
      const countResult = await getGoodsCategoryCount()
      this.goodsCategoryCount = countResult.data
    },

    async fetchGoodsCategorySaleAction() {
      const saleResult = await getGoodsCategorySale()
      this.goodsCategorySale = saleResult.data
    },
    async fetchGoodsCategoryFavorAction() {
      const favorResult = await getGoodsCategoryFavor()
      this.goodsCategoryFavor = favorResult.data
    },
    async fetchGoodsAddressSaleAction() {
      const addressResult = await getGoodsAddressSale()
      this.goodsAddressSale = addressResult.data
    }
  }
})

export default useDashboardStore
