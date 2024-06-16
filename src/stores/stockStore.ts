import { defineStore } from 'pinia'
import { formatStockStrings } from '@/utils/convert'
import type { Candlestick } from '@/utils/types'

export const useStockStore = defineStore('stockStore', {
  state: () => ({
    stocks: [] as string[],
    formatStocks: [] as string[],
    stockCandletick: [] as Candlestick[],
    stockDataHistory: [] as Candlestick[][],
    alarmStock: [] as Candlestick[]
  }),
  actions: {
    shiftAlarm() {
      if (this.alarmStock.length > 6) {
        console.log('长度大于十')
        this.alarmStock.shift()
        console.log(`长度：${this.alarmStock.length}`)
      }
    },
    setStocks(stocksList: string[]) {
      this.stocks = stocksList
      this.formatStocks = formatStockStrings(stocksList)
      // 股票列表更新后，重置历史数据
      this.stockDataHistory = []
    },
    setStocksCandlestick(CandleStickdata: Candlestick[]) {
      this.stockCandletick = CandleStickdata
      if (this.stockDataHistory.length >= 10) {
        this.stockDataHistory.shift()
      }
      this.stockDataHistory.push(CandleStickdata)
    },
    calculatePercentageChange() {
      // 数据长度大于10再计算, 可以设置数据长度x, (x>=2). x * 获取数据的频率(初始设置为10s获取一次)即为时间间隔
      if (this.stockDataHistory.length >= 6) {
        const currentData: Candlestick[] = this.stockDataHistory.slice(-1)[0]
        const firstData: Candlestick[] = this.stockDataHistory[0]
        if (currentData.length === firstData.length) {
          for (const index of currentData.keys()) {
            const currentPrice = currentData[index].current
            const firstPrice = firstData[index].current
            // if ((100 * (currentPrice - firstPrice)) / firstPrice > 2) {
            if (currentPrice > 10) {
              this.alarmStock.push(currentData[index])
              console.log('弹出预警框')
              console.log('预警框')
            }
          }
        }
      }
    }
  }
})
