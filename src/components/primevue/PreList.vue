<script setup>
import { ref } from 'vue'
import { useStockListStore } from '@/stores/stockListStore'

const stockListStore = useStockListStore()

const selectedCity = ref()
const cities = ref([
  { name: stockListStore.stocks[0], code: 'NY' },
  { name: stockListStore.stocks[1], code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
])
</script>

<template>
  <div class="card flex justify-center">
    <Listbox v-model="selectedCity" :options="cities" optionLabel="name" class="w-full md:w-56" />
  </div>
</template>
