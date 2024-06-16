<template>
  <div class="card">
    <DataTable :value="stocks" tableStyle="min-width: 50rem">
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useStockStore } from '@/stores/stockStore'

const stockStore = useStockStore()
const stocks = ref(stockStore.stockCandletick)
onMounted(() => {
  // ProductService.getProductsMini().then((data) => (products.value = data));
})

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'current', header: 'Current' }
]
watch(
  () => stockStore.stockCandletick,
  (newStocks) => {
    stocks.value = newStocks
  },
  { immediate: true }
)
</script>
