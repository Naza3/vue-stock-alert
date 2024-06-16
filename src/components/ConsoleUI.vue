<template>
  <div class="console">
    <div v-for="(entry, index) in consoleEntries" :key="index" :class="entry.type">
      <span>{{ entry.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 创建一个响应式数组，用于保存控制台条目
const consoleEntries = ref([])

// 添加控制台日志条目的方法
function log(message) {
  consoleEntries.value.push({ type: 'log', text: message })
}

// 添加控制台警告条目的方法
function warn(message) {
  consoleEntries.value.push({ type: 'warn', text: message })
}

// 添加控制台错误条目的方法
function error(message) {
  consoleEntries.value.push({ type: 'error', text: message })
}
</script>

<style scoped>
.console {
  background-color: #f1efef;
  color: #fff;
  padding: 10px;
}

.log {
  color: #252525;
}

.warn {
  color: #ff0;
}

.error {
  color: #f00;
}
</style>
