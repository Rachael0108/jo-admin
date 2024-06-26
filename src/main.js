import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router/index'
import { Dialog } from 'vant';
import * as Icons from '@element-plus/icons-vue'
import Particles from 'particles.vue3';
import * as XLSX from 'xlsx';
import {Slider, Popup} from "vant";
import dayjs from "dayjs";

const app = createApp(App)
for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
}
app.use(Dialog)
app.use(Particles)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)
app.use(Slider).use(Popup)

// 挂载格式化日期到全局
app.config.globalProperties.$filters = {
    formatTime(value) {
        if(!value) return "无";
        return dayjs(value).format("YYYY-MM-DD HH:mm")
    }
}
app.mount('#app')

app.config.errorHandler = function (err, vm, info) {
    console.log('errorHandle', err)
}
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。

