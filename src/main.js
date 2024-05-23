import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import axios from 'axios'
import "@/assets/Style.scss"
import "@/assets/icon/iconfont.css"
const instance = axios.create({
    baseURL:"https://localhost:7104",
    headers:{
        'Content-Type':'application/json'
    }
})

const app = createApp(App)
app.provide('axios',instance)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
