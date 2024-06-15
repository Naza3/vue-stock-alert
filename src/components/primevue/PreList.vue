<script setup>
import { ref, computed } from 'vue'
import { useStockListStore } from '@/stores/stockListStore'

const stockListStore = useStockListStore()
const selectedCity = ref()
const stockOptions = computed(() => {
  return stockListStore.stocks.map((stock) => ({
    label: stock,
    value: stock
  }))
})
console.log('stockOption:', stockOptions)
</script>

<template>
  <div class="card flex justify-center">
    <Listbox
      v-model="selectedCity"
      :options="stockOptions"
      optionLabel="label"
      class="w-full md:w-56"
    />
  </div>
</template>
