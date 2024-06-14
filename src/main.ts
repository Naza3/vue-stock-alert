import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'

import Aura from '@primevue/themes/aura'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

// PrimeVue
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
})
// Register PrimeVue components globally
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Listbox', Listbox)

app.mount('#app')
