<template>
  <div>
    <Button label="播放提示音" @click="playSound" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Howl } from 'howler'

const sound = ref(null)

onMounted(() => {
  sound.value = new Howl({
    src: ['sounds/airport.mp3'], // 提示音文件的路径
    preload: true // 预加载音频文件
  })
})

const playSound = () => {
  if (sound.value) {
    sound.value.play()
  }
}
</script>
<style scoped>
/* 添加一些样式（可选） */
</style>
