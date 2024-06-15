import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'

import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

// PrimeVue
app
  .use(PrimeVue, {
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
  .use(ToastService)

// Register PrimeVue components globally
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Listbox', Listbox)

// app.component('DataTable', DataTable)
// app.component('Column', Column)
// app.component('ColumnGroup', ColumnGroup)
// app.component('Row', Row)

app.mount('#app')
