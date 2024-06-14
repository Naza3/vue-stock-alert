import { defineStore } from 'pinia'
import { formatStockStrings } from '@/utils/convert'

export const useStockListStore = defineStore('stockListStore', {
  state: () => ({
    stocks: [] as string[],
    formatStocks: [] as string[]
  }),
  actions: {
    setStocks(stocks: string[]) {
      this.stocks = stocks
      this.formatStocks = formatStockStrings(stocks)
    }
  }
})
