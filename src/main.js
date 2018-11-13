// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//集成element-ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//集成v-echarts图表库
import VCharts from 'v-charts'
Vue.use(VCharts)

//导入 store
import store from '@/store/index.js'

Vue.config.productionTip = false
//全局的样式文件
import '@/styles/index.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
