<template>
  <div class="flex-container">
    <StockUpload />
    <Button label="停止获取" @click="stockFetcher.stopFetching" />
    <Button label="继续获取" @click="stockFetcher.startFetching" />
    <ul v-if="stockStore.stockCandletick.length > 0">
      <p>正常获取股票数据中...</p>
    </ul>
    <p v-else>No stock data available.</p>
  </div>
  <div class="card flex flex-col md:flex-row gap-10">
    <InputGroup>
      <InputGroupAddon>数据更新频率(s)</InputGroupAddon>
      <InputText placeholder="10" v-model="fetchCycle" />
      <InputGroupAddon>异动计算周期(s)</InputGroupAddon>
      <InputText placeholder="60" v-model="calCycle" />
      <InputGroupAddon>涨速临界值(%)</InputGroupAddon>
      <InputText placeholder="3" v-model="speedLimit" />
    </InputGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getMultipleStockData } from '@/composables/useStockData'
import { useStockStore } from '@/stores/stockStore'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import StockUpload from '@/components/StockUpload.vue'

// 用pina状态替代symbols
// const symbols = ref([])
const stockStore = useStockStore()
const fetchCycle = ref(stockStore.fetchCycle)
const calCycle = ref(stockStore.calCycle)
const speedLimit = ref(stockStore.speedLimit)

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
  justify-content: space-between; /* 将子元素沿主轴等间距排列 */
  align-items: center; /* 垂直居中对齐子元素 */
}
</style>
