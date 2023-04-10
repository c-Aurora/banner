// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import http from './utils/request'//使用封装的axios，在request.js
import ElementUI from "element-ui"; // 在main.js  中引入 Element
import 'element-ui/lib/theme-chalk/index.css';// 在main.js  引入 Element 样式
import store from "./store/index"
import cookie from 'js-cookie'
// import 'babel-polyfill' //一个转码器，可以将ES6代码转为ES5代码,解决浏览器兼容问题
import { getToken } from './utils/auth' // get token from cookie

import './permission'//全局路由守卫配置, 这里进行路由后台获取的模拟

Vue.use(ElementUI, {size: 'small'});

// 挂载到vue的全局(原型上),在每个组件都可以使用 ,prototype是固定的,$axios是自定义的
//Vue.prototype.$axios = axios;
// 指定默认的请求域名
//axios.defaults.baseURL = "http://dida100.com:8888"
Vue.prototype.http = http; //挂载到原型上
  
//Vue.config.productionTip = false 阻止启动生产消息
//开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。
//而在生产环境下，这些警告语句却没有用，反而会增加应用的体积
Vue.config.productionTip = false




new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})