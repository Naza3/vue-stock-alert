<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <h2>股票数据列表</h2>
    <ul v-if="stocks.length > 0">
      <li v-for="stock in stocks" :key="stock.name">
        <p>股票名称：{{ stock.name }}</p>
        <p>当前价格：{{ stock.current }}</p>
        <p>开盘价：{{ stock.open }}</p>
        <p>最高价：{{ stock.high }}</p>
        <p>最低价：{{ stock.low }}</p>
        <p>成交量：{{ stock.volume }}</p>
        <p>成交额：{{ stock.turnover }}</p>
      </li>
      <div>
        <h2>股票列表</h2>
        <ul>
          <li v-for="(symbol, index) in stockListStore.stocks" :key="index">
            {{ symbol }}
          </li>
        </ul>
      </div>
    </ul>
    <p v-else>No stock data available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getMultipleStockData, parseSymbols, readFileAsText } from '@/composables/useStockData'
import { useStockListStore } from '@/stores/stockListStore'

// 用pina状态替代symbols
// const symbols = ref([])
const stockListStore = useStockListStore()
const stocks = ref([])

async function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    try {
      const content = await readFileAsText(file)
      const symbols = parseSymbols(content)

      // 保存symbols到pina状态
      stockListStore.setStocks(symbols)

      // 调用获取股票数据的函数
      stocks.value = await getMultipleStockData(stockListStore.formatStocks)
    } catch (error) {
      console.error('Failed to read file or fetch stock data:', error)
    }
  }
}

// 使用定时器定期获取股票数据
function startFetching() {
  const interval = setInterval(async () => {
    // await getMultipleStockData(symbols.value)
    await getMultipleStockData(stockListStore.formatStocks)
  }, 30000) // 每隔 30 秒获取一次数据
  onMounted(() => {
    // 组件销毁时停止定时器
    watch(
      () => stocks.value,
      () => {
        clearInterval(interval)
      },
      { immediate: true }
    )
  })
}

// 组件加载时开始获取股票数据
// onMounted(() => {})
// 组件加载时，可以根据需要初始化 symbols 和启动定时获取数据
watch(
  // () => symbols.value,
  // 使用pina管理stock列表
  () => stockListStore.stocks,
  () => {
    startFetching()
  }
)
</script>

<style>
/* 样式可以根据需求自行添加 */
</style>
@/stores/stockListStore
