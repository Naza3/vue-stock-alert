<template>
  <div class="card flex justify-center">
    <FloatLabel>
      <Textarea v-model="formattedTextareaValue" rows="5" cols="30" />
      <label>Username</label>
    </FloatLabel>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import Textarea from 'primevue/textarea'
import { useStockStore } from '@/stores/stockStore'
const stockStore = useStockStore()
const formattedTextareaValue = ref('')
watch(
  () => stockStore.stocks,
  (newvalue) => {
    formattedTextareaValue.value = newvalue.join('\n')
  }
)

watch(
  formattedTextareaValue,
  (newValue) => {
    setTimeout(() => {
      if (newValue) {
        const newArray = newValue.split('\n').map((item) => item.trim())
        stockStore.setStocks(newArray)
      }
    }, 3000)
  },
  { immediate: false }
)
</script>
