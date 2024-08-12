import './assets/main.scss'
import 'light-icons/dist/light-icon.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueConfetti from 'vue-confetti'

const app = createApp(App)

app.use(VueConfetti)
app.use(createPinia())

app.mount('#app')
