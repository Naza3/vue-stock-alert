import { defineStore } from 'pinia'
import { formatStockStrings } from '@/utils/convert'
interface CandleStick {
  name: string
  current: number
  open: number
  high: number
  low: number
  volume: number
  turnover: number
}

export const useStockListStore = defineStore('stockListStore', {
  state: () => ({
    stocks: [] as string[],
    formatStocks: [] as string[],
    stockCandletick: [] as CandleStick[],
    stockDataHistory: [] as CandleStick[][],
    alarmStock: [] as CandleStick[]
  }),
  actions: {
    shiftAlarm() {
      if (this.alarmStock.length > 10) {
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
    setStocksCandlestick(CandleStickdata: CandleStick[]) {
      this.stockCandletick = CandleStickdata
      if (this.stockDataHistory.length >= 10) {
        this.stockDataHistory.shift()
      }
      this.stockDataHistory.push(CandleStickdata)
    },
    calculatePercentageChange() {
      // 数据长度大于10再计算
      if (this.stockDataHistory.length >= 1) {
        const currentData: CandleStick[] = this.stockDataHistory.slice(-1)[0]
        const firstData: CandleStick[] = this.stockDataHistory[0]
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
