import { createApp } from 'vue'
import App from './App.vue'

import router from './routers/index.js'

createApp(App).use(router).mount('#app')
