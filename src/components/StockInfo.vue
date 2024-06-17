<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <ul v-if="stockStore.stockCandletick.length > 0">
      <p>正常获取股票数据中...</p>
    </ul>
    <p v-else>No stock data available.</p>
    <div class="card flex justify-center">
      <Button label="停止获取" @click="stockFetcher.stopFetching" />
      <Button label="继续获取" @click="stockFetcher.startFetching" />
    </div>
  </div>
  <div class="card flex flex-col md:flex-row gap-10">
    <InputGroup>
      <InputGroupAddon>数据更新频率(s)</InputGroupAddon>
      <InputText placeholder="10" v-model="fetchCycle" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>异动计算周期(s)</InputGroupAddon>
      <InputText placeholder="60" v-model="calCycle" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>涨速临界值</InputGroupAddon>
      <InputText placeholder="3" v-model="speedLimit" />
    </InputGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getMultipleStockData, parseSymbols, readFileAsText } from '@/composables/useStockData'
import { useStockStore } from '@/stores/stockStore'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

// 用pina状态替代symbols
// const symbols = ref([])
const stockStore = useStockStore()
const fetchCycle = ref(stockStore.fetchCycle)
const calCycle = ref(stockStore.calCycle)
const speedLimit = ref(stockStore.speedLimit)

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
    stopFetching()
    fetchInterval = setInterval(async () => {
      await getMultipleStockData(stockStore.formatStocks)
    }, stockStore.fetchCycle * 1000) // 每隔 10 秒获取一次数据
  }
  function stopFetching() {
    if (fetchInterval !== null) {
      clearInterval(fetchInterval)
      fetchInterval = null
      stockStore.reset()
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
watch(fetchCycle, (newValue) => {
  stockStore.setFetchCycle(newValue)
  console.log(`当前频率:${stockStore.fetchCycle}`)
  stockFetcher.startFetching()
})
watch(calCycle, (newValue) => {
  stockStore.setCalCycle(newValue)
  console.log(`当前计算间隔:${stockStore.calCycle}`)
  stockFetcher.startFetching()
})
watch(speedLimit, (newValue) => {
  stockStore.setSpeedLimit(newValue)
  console.log(`当前涨速移动条件:${stockStore.speedLimit}`)
  stockFetcher.startFetching()
})
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  gap: 1rem; /* 调整间距 */
}
</style>
@/stores/stockStore
