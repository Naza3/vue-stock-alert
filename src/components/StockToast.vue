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

// Watch for changes in alertStock and trigger toast
watch(
  () => stockStore.alertStock,
  (newVal) => {
    if (newVal.length > 0) {
      const currentDate = new Date()
      const hours = String(currentDate.getHours()).padStart(2, '0') // 将小时格式化为两位数
      const minutes = String(currentDate.getMinutes()).padStart(2, '0')
      for (const alertStock of newVal) {
        toast.add({
          severity: 'info',
          summary: 'Stock Price Alert',
          detail: `${hours}:${minutes} ${alertStock.name}`,
          life: 0 // Toast display time, 0表示不会自动关闭, 只有手动关闭
        })
        console.log(`异动股票${alertStock.name}`)
      }
      playSound()
      console.log('删除alertStock')
      stockStore.clearAlert()
    }
  },
  { deep: true }
)
</script>
@/stores/stockStore
