<template>
  <div class="card flex justify-center">
    <Toast />
    <Button label="Show" @click="show()" />
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
const toast = useToast()

const show = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 0 })
}
</script>
