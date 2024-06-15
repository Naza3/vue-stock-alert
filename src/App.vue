<script setup lang="ts">
import StockInfo from '@/components/StockInfo.vue'
import PreTable from '@/components/primevue/PreTable.vue'
import PreList from './components/primevue/PreList.vue'
import PreToast from './components/primevue/PreToast.vue'
import ToastDemo from './components/ToastDemo.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <StockInfo />
    <PreList />
  </header>
  <div>
    <PreTable />
    <PreToast />
    <ToastDemo />
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
