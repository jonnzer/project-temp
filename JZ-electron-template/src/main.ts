import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import 'element-plus/dist/index.css'
import './assets/style/iconfont.scss'
import Directive from '@/directives'

const app = createApp(App)

app.use(Directive)
app
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
