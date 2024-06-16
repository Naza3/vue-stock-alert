<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <!-- <ul v-if="stocks.length > 0">
      <li v-for="stock in stocks" :key="stock.name">
        <p>股票名称：{{ stock.name }}</p>
        <p>当前价格：{{ stock.current }}</p>
        <p>开盘价：{{ stock.open }}</p>
        <p>最高价：{{ stock.high }}</p>
        <p>最低价：{{ stock.low }}</p>
        <p>成交量：{{ stock.volume }}</p>
        <p>成交额：{{ stock.turnover }}</p>
      </li>
    </ul>
    <p v-else>No stock data available.</p> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getMultipleStockData, parseSymbols, readFileAsText } from '@/composables/useStockData'
import { useStockStore } from '@/stores/stockStore'

// 用pina状态替代symbols
// const symbols = ref([])
const stockStore = useStockStore()
const stocks = ref([])

async function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    try {
      const content = await readFileAsText(file)
      const symbols = parseSymbols(content)

      // 保存symbols到pina状态
      stockStore.setStocks(symbols)

      // 调用获取股票数据的函数
      stocks.value = await getMultipleStockData(stockStore.formatStocks)
    } catch (error) {
      console.error('Failed to read file or fetch stock data:', error)
    }
  }
}

// 使用定时器定期获取股票数据
function startFetching() {
  const interval = setInterval(async () => {
    await getMultipleStockData(stockStore.formatStocks)
  }, 10000) // 每隔 30 秒获取一次数据
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

watch(
  // 使用pina管理stock列表
  () => stockStore.stocks,
  () => {
    startFetching()
  }
)
</script>

<style>
/* 样式可以根据需求自行添加 */
</style>
@/stores/stockStore
