import './assets/main.css'

import { createApp } from 'vue'
import { router } from './router'
import { pinia } from '@/plugins/pinia.js'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
