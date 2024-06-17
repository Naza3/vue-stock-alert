<template>
  <div class="card flex justify-center">
    <FileUpload
      mode="basic"
      name="demo[]"
      url=""
      :maxFileSize="1000000"
      @select="handleFileChange"
      :auto="false"
      chooseLabel="上传股票列表"
    />
  </div>
</template>

<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import { useStockStore } from '@/stores/stockStore'
import { getMultipleStockData, parseSymbols, readFileAsText } from '@/composables/useStockData'

const stockStore = useStockStore()
async function handleFileChange(event: FileUploadSelectEvent) {
  const files = event.files
  if (files && files.length > 0) {
    try {
      const file = files[0]
      console.log(file)

      const content = await readFileAsText(file)
      const symbols = parseSymbols(content)

      // 保存symbols到pina状态
      stockStore.setStocks(symbols)

      // 调用获取股票数据的函数
      await getMultipleStockData(stockStore.formatStocks)
    } catch (error) {
      console.error('Failed to read file or fetch stock data:', error)
    }
  }
}
</script>
