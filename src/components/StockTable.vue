<template>
  <div class="card">
    <DataTable
      :value="stocks"
      :rowStyle="getRowStyle"
      paginator
      :rows="7"
      tableStyle="min-width: 50rem"
    >
      <Column field="increaseSpeed" header="涨速" sortable style="width: 10%"></Column>
      <Column field="increaseRate" header="涨幅" sortable style="width: 10%"></Column>
      <Column field="name" header="名称" sortable style="width: 15%"></Column>
      <Column field="code" header="代码" sortable style="width: 10%"></Column>
      <Column field="current" header="现价" sortable style="width: 10%"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useStockStore } from '@/stores/stockStore'

const stockStore = useStockStore()
const stocks = ref(stockStore.stockCandletick)

// 返回行样式的方法
function getRowStyle(rowData) {
  if (rowData.increaseSpeed > 2) {
    return { background: 'pink' } // 如果年龄小于 18，设置背景色为红色
  }
  return {} // 其他情况不设置样式
}
watch(
  () => stockStore.stockCandletick,
  (newStocks) => {
    stocks.value = newStocks
  },
  { immediate: true }
)
</script>
