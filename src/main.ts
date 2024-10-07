import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:uno.css'
import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueQueryPlugin } from 'vue-query'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(VueQueryPlugin)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
