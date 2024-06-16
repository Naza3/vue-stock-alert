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
    calCycle: 6 as number, // 表示计算涨速的周期，默认为6表示一分钟
    fetchCycle: 10 as number // 表示获取数据的间隔周期，默认为10s
  }),
  actions: {
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
      if (this.stockDataHistory.length > this.calCycle) {
        // 用大于号不用大于等于, 时间间隔是数据的个数减一
        this.stockDataHistory.shift()
      }
      this.stockDataHistory.push(CandleStickdata)
    },
    calIncreaseSpeed(currentCandlesticks: Candlestick[]) {
      // 通过涨幅计算涨速
      if (this.stockDataHistory.length >= this.calCycle) {
        // 存在6个历史数据，间隔50秒，第60秒更新涨速
        const firstData: Candlestick[] = this.stockDataHistory[0]
        const currentData: Candlestick[] = currentCandlesticks
        for (const index of currentData.keys()) {
          if (firstData[index].code === currentData[index].code) {
            const increaseSpeed = currentData[index].increaseRate - firstData[index].increaseRate
            currentData[index].increaseSpeed = increaseSpeed
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
      // 数据长度大于6再计算, 可以设置数据长度x, (x>=2). x * 获取数据的频率(初始设置为10s获取一次)即为时间间隔
      if (this.stockDataHistory.length > this.calCycle) {
        const currentData = this.stockDataHistory.slice(-1)[0]
        for (const index of currentData.keys()) {
          if (currentData[index].increaseSpeed > 2) {
            // if (currentData[index].increaseRate > 5) {
            // 测试用涨幅替代涨速
            this.alertStock.push(currentData[index])
          }
        }
      }
    }
  }
})
