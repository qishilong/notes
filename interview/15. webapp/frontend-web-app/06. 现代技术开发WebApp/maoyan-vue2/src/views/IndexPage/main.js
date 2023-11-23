import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index.js'

// 阻止默认事件
document.addEventListener("touchstart", e=>{
    e.preventDefault();
},{
    passive: false
})

const app = createApp(App);

app.use(router).mount('#app');
