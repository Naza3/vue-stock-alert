import axios from 'axios'
async function getMultipleStockData(symbols: []) {
  try {
    const secids = symbols.join(',')
    const url = `http://push2.eastmoney.com/api/qt/ulist.np/get?secids=${secids}`
    const response = await axios.get(url)
    const data = response.data

    if (data && data.data && Array.isArray(data.data.diff)) {
      data.data.diff.forEach((stockInfo: any) => {
        // 打印股票信息到控制台
        console.log({
          name: stockInfo.f14,
          current: stockInfo.f2 / 100,
          open: stockInfo.f17 / 100,
          high: stockInfo.f15 / 100,
          low: stockInfo.f16 / 100,
          volume: stockInfo.f5,
          turnover: stockInfo.f6
        })
      })

      // 更新股票列表
      return data.data.diff.map((stockInfo: any) => ({
        name: stockInfo.f14,
        current: stockInfo.f2 / 100,
        open: stockInfo.f17 / 100,
        high: stockInfo.f15 / 100,
        low: stockInfo.f16 / 100,
        volume: stockInfo.f5,
        turnover: stockInfo.f6
      }))
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
  return content
    .trim()
    .split('\n')
    .map((line) => line.trim())
}

function readFileAsText(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = () => {
      reject(reader.error)
    }

    reader.readAsText(file)
  })
}
export { getMultipleStockData, parseSymbols, readFileAsText }
