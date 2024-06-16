<template>
  <div>
    <div class="card flex justify-center">
      <Button label="Stop" @click="stockFetcher.stopFetching" />
      <Button label="Start" @click="stockFetcher.startFetching" />
    </div>
    <input type="file" @change="handleFileChange" />
    <ul v-if="stockStore.stockCandletick.length > 0"></ul>
    <p v-else>No stock data available.</p>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { getMultipleStockData, parseSymbols, readFileAsText } from '@/composables/useStockData'
import { useStockStore } from '@/stores/stockStore'

// 用pina状态替代symbols
// const symbols = ref([])
const stockStore = useStockStore()

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input && input.files && input.files.length > 0) {
    try {
      const files: File[] = Array.from(input.files)
      const file = files[0]

      const content = await readFileAsText(file)
      const symbols = parseSymbols(content)

      // 保存symbols到pina状态
      stockStore.setStocks(symbols)

      // 调用获取股票数据的函数
      await getMultipleStockData(stockStore.formatStocks)
    } catch (error) {
      console.error('Failed to read file or fetch stock data:', error)
    }
  }
}

// 创建定时器闭包使用定时器定期获取股票数据
const stockFetcher = (() => {
  let fetchInterval: NodeJS.Timeout | null = null
  function startFetching() {
    if (fetchInterval !== null) {
      clearInterval(fetchInterval)
    }
    fetchInterval = setInterval(async () => {
      await getMultipleStockData(stockStore.formatStocks)
    }, stockStore.fetchCycle * 1000) // 每隔 10 秒获取一次数据
  }
  function stopFetching() {
    if (fetchInterval !== null) {
      clearInterval(fetchInterval)
      fetchInterval = null
    }
  }
  return { startFetching, stopFetching }
})() // 确保立即执行函数被正确调用

watch(
  // 使用pina管理stock列表
  () => stockStore.stocks,
  () => {
    stockFetcher.startFetching()
  }
)
function startFetch() {
  stockFetcher.startFetching()
  console.log('停止获取')
}
function stopFetch() {
  stockFetcher.stopFetching()
  console.log('停止获取')
}
</script>

<style>
/* 样式可以根据需求自行添加 */
</style>
@/stores/stockStore
