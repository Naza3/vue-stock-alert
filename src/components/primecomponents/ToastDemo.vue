<template>
  <div class="card flex justify-center">
    <Toast />
    <Button label="ToastDemo" />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useStockStore } from '@/stores/stockStore'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const stockStore = useStockStore()

const toast = useToast()

// Watch for changes in alarmStock and trigger toast
watch(
  () => stockStore.alarmStock,
  (newVal, oldVal) => {
    toast.add({
      severity: 'info',
      summary: 'Stock Price Alert',
      detail: 'price is now',
      life: 0 // Toast display time, 0表示不会自动关闭, 只有手动关闭
    })
    console.log('删除alarmStock')
    stockStore.shiftAlarm()
  },
  { deep: true }
)
</script>
@/stores/stockStore
