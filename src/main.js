import './assets/main.scss'
import 'light-icons/dist/light-icon.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import Home from './views/HomeView.vue'
import Quiz from './views/QuizView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/wien', component: Quiz },
  { path: '/graz', component: Quiz },
  { path: '/berlin', component: Quiz }
]

const router = createRouter({ history: createWebHistory(), routes })

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.mount('#app')
