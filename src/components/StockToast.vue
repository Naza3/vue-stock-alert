<template>
  <div class="card flex justify-center">
    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Howl } from 'howler'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { useStockStore } from '@/stores/stockStore'

/*播放音乐逻辑*/
const sound = ref(null)
onMounted(() => {
  sound.value = new Howl({
    src: ['sounds/dili.mp3'], // 提示音文件的路径
    preload: true // 预加载音频文件
  })
})
const playSound = () => {
  if (sound.value) {
    sound.value.play()
  }
}
/* Toast 组件逻辑*/
const stockStore = useStockStore()
const toast = useToast()

// Watch for changes in alarmStock and trigger toast
watch(
  () => stockStore.alarmStock,
  (newVal, oldVal) => {
    if (newVal.length > 0) {
      for (const alarmStock of newVal) {
        toast.add({
          severity: 'info',
          summary: 'Stock Price Alert',
          detail: `${alarmStock.name}`,
          life: 5000 // Toast display time, 0表示不会自动关闭, 只有手动关闭
        })
        console.log(`异动股票${alarmStock.name}`)
      }
      playSound()
      console.log('删除alarmStock')
      stockStore.clearAlarm()
    }
  },
  { deep: true }
)
</script>
@/stores/stockStore
