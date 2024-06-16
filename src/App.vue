<script setup lang="ts">
import StockInfo from '@/components/StockInfo.vue'
import AudioDemo from '@/components/AudioDemo.vue'
import StockTable from '@/components/StockTable.vue'
import PreToast from '@/components/primecomponents/PreToast.vue'
// import PreTextArea from '@/components/primecomponents/PreTextArea.vue'
import StockToast from '@/components/StockToast.vue'
import ConsoleUI from '@/components/ConsoleUI.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <StockInfo />
  </header>
  <div>
    <StockTable />
    <StockToast />
    <PreTextArea />
    <!-- <ToastDemo /> -->
    <!-- <AudioDemo /> -->
    <!-- <ConsoleUI /> -->
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
