import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import http from './plugins/http'
import './assets/index.css'

createApp(App)
    .use(router)
    .use(http, { baseURL: 'http://localhost:9999' })
    .mount('#app')
    