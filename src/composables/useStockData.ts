import axios from 'axios'
// import { http } from '@tauri-apps/api'

import { useStockStore } from '@/stores/stockStore'

async function getMultipleStockData(symbols: string[]) {
  const stockStore = useStockStore()
  try {
    const secids = symbols.join(',')
    const url = `https://push2.eastmoney.com/api/qt/ulist.np/get?secids=${secids}`
    const response = await axios.get(url)
    // const response = await http.fetch(url, { method: 'GET', timeout: 1 })
    const data = response.data

    if (data && data.data && Array.isArray(data.data.diff)) {
      const candlestick = data.data.diff.map((stockInfo: any) => ({
        code: stockInfo.f12,
        name: stockInfo.f14,
        current: stockInfo.f2 / 100,
        open: stockInfo.f17 / 100,
        high: stockInfo.f15 / 100,
        low: stockInfo.f16 / 100,
        increaseRate: stockInfo.f3 / 100, // 涨幅
        increaseSpeed: 0, // 涨速
        volume: stockInfo.f5,
        amount: stockInfo.f6
      }))

      const calCandlestick = stockStore.calIncreaseSpeed(candlestick)
      console.log('history', stockStore.stockDataHistory)
      stockStore.setStocksCandlestick(calCandlestick)
      stockStore.pushAlert()

      // 更新股票列表
      return calCandlestick
    } else {
      console.error('No data returned from API or data format is incorrect')
      return []
    }
  } catch (error) {
    console.error('Error fetching stock data:', error)
    return []
  }
}
function parseSymbols(content: string) {
  return [
    ...new Set(
      content
        .trim()
        .split('\n')
        .map((line) => line.trim())
    )
  ]
}

function readFileAsText(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        resolve(result)
      }
    }

    reader.onerror = () => {
      reject(reader.error)
    }

    reader.readAsText(file)
  })
}
export { getMultipleStockData, parseSymbols, readFileAsText }
