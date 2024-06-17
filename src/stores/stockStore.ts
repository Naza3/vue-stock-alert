import { defineStore } from 'pinia'
import { formatStockStrings } from '@/utils/convert'
import type { Candlestick } from '@/utils/types'

export const useStockStore = defineStore('stockStore', {
  state: () => ({
    stocks: [] as string[],
    formatStocks: [] as string[],
    stockCandletick: [] as Candlestick[],
    stockDataHistory: [] as Candlestick[][],
    alertStock: [] as Candlestick[],
    calCycle: 60 as number, // 表示计算涨速的周期，单位秒。
    fetchCycle: 10 as number, // 表示获取数据的间隔周期，默认为10s
    speedLimit: 3 as number // 表示获取数据的间隔周期，默认为10s
  }),
  actions: {
    reset() {
      // 重置数据为默认值
      this.stockCandletick = [] as Candlestick[]
      this.stockDataHistory = [] as Candlestick[][]
      this.alertStock = [] as Candlestick[]
    },
    setCalCycle(value: number) {
      this.calCycle = value
    },
    setFetchCycle(value: number) {
      this.fetchCycle = value
    },
    setSpeedLimit(value: number) {
      this.speedLimit = value
    },
    clearAlert() {
      this.alertStock = [] as Candlestick[]
    },
    setStocks(stocksList: string[]) {
      this.stocks = stocksList
      this.formatStocks = formatStockStrings(stocksList)
      // 股票列表更新后，重置历史数据
      this.stockDataHistory = []
    },
    setStocksCandlestick(CandleStickdata: Candlestick[]) {
      this.stockCandletick = CandleStickdata
      if (this.stockDataHistory.length > this.calCycle / this.fetchCycle) {
        // 用大于号不用大于等于, 时间间隔是数据的个数减一
        this.stockDataHistory.shift()
      }
      this.stockDataHistory.push(CandleStickdata)
    },
    calIncreaseSpeed(currentCandlesticks: Candlestick[]) {
      // 通过涨幅计算涨速
      if (this.stockDataHistory.length >= this.calCycle / this.fetchCycle) {
        // 存在6个历史数据，间隔50秒，第60秒更新涨速(只是举例说明,具体数字可自定义)
        const firstData: Candlestick[] = this.stockDataHistory[0]
        const currentData: Candlestick[] = currentCandlesticks
        for (const index of currentData.keys()) {
          if (firstData[index].code === currentData[index].code) {
            const increaseSpeed = currentData[index].increaseRate - firstData[index].increaseRate
            currentData[index].increaseSpeed = Math.round(increaseSpeed * 100) / 100
            console.log('更新涨速')
            console.log(currentData[index])
          }
        }
        return currentData
      } else {
        return currentCandlesticks
      }
    },
    pushAlert() {
      if (this.stockDataHistory.length > this.calCycle / this.fetchCycle) {
        const currentData = this.stockDataHistory.slice(-1)[0]
        for (const index of currentData.keys()) {
          if (currentData[index].increaseSpeed > this.speedLimit) {
            this.alertStock.push(currentData[index])
          }
        }
      }
    }
  }
})
