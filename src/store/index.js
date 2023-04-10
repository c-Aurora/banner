//组装模块(modules里的都是模块)并导出 store 的地方

//tips: modules里添加模块之后千万别忘了，这里添加，页面引用的时候找不到

import Vue from 'vue'
import Vuex from 'vuex'

// 导入modules里的模块
import app from './modules/app'// 设置的更换
import user from './modules/user'
import permission from './modules/permission'
import settings from './modules/settings' //设置
// 导入根getters
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 没有根state,mutation,action,全部都是采用模块化开发vuex
    // 注册模块
    modules: {
        app,
        user,
        permission,
        settings
    },
    // 根getters
    // getters: getters,
    getters
  
})

export default store