<template>
  <div class="card flex justify-center">
    <Toast />
    <Button label="ToastDemo" />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useStockListStore } from '@/stores/stockListStore'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const stockListStore = useStockListStore()

const toast = useToast()

// Watch for changes in alarmStock and trigger toast
watch(
  () => stockListStore.alarmStock,
  (newVal, oldVal) => {
    toast.add({
      severity: 'info',
      summary: 'Stock Price Alert',
      detail: 'price is now',
      life: 3000 // Toast display time
    })
    console.log('删除alarmStock')
    stockListStore.shiftAlarm()
  },
  { deep: true }
)
</script>
