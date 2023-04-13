// 全局路由守卫  //路由只请求一次，存储到vuex中,这是是存储到js-cookie里


import router from './router'
import store from "./store/index"
import { getToken } from './utils/auth' // get token from cookie
import cookie from 'js-cookie'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
NProgress.configure({ showSpinner: false }); // 显示右上角螺旋加载提示

// 不需要登录就可以访问的页面,白名单
const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
    NProgress.start() // 开启Progress
    // 获取token
    const hasToken = getToken()
    // 判断是否存在token,有, 表示已经登陆;没有,就重新登陆
    if ( hasToken ) {
    // if ( getToken() ) {
        if (store.getters.isLock && to.path !== '/lock') {
            next({ path: '/lock'})
            NProgress.done()
        } else if (to.path === '/login') { 
            // 如果已登录，则重定向到首页
            next({ path: '/' })  
            NProgress.done() // 进度条结束,// router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        } else {            
            // 确定用户是否通过getInfo获得了权限角色
            const hasRoles = store.getters.roles && store.getters.roles.length > 0 //这里指的是src/store/getters.js的roles
            //判断是否已经有角色权限roles了
            if (hasRoles) {
                next(); //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
                NProgress.done()
            } else {

                // store.dispatch('GetInfo').then(res => { // 访问后台拉取user_info
                //     const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
                //     store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
                //         router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                //         next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                //     })
                // }).catch((err) => {
                //     store.dispatch('FedLogOut').then(() => {
                //         Message.error(err)
                //         next({ path: '/' })
                //     })
                // })
                try {
                    // 注意: roles 角色必须是对象数组! 例如: ['admin'] 或 ,['developer','editor']
                    // 1. 获取roles,即用户信息
                    const { data } = await store.dispatch('GetInfo')
                    // 2. 根据用户的角色，动态生成路由，即获取通过权限验证的路由，这里的accessRoutes就是筛选之后的路由

                    //假的，后台数据模拟，等真的后台的时候删掉这句，用下面注释的
                    const accessRoutes = await store.dispatch('GenerateRoutes', data.anxun)
                    // const accessRoutes = await store.dispatch('GenerateRoutes', data)

                    // 3. 更新加载路由
                    router.options.routes = store.getters.permission_routers //第三步

                    // 添加这些路由至路由器
                    // 注意：动态添加可访问路由,新版本router.addRoutes(res)已废弃：使用 router.addRoute() 代替，两种写法多了一个s。
                    accessRoutes.forEach(res => {
                        router.addRoute(res);
                    })
                    //很多人在使用动态添加路由addRoutes()会遇到下面的情况：
                    //问题：在addRoutes()之后，第一次访问被添加的路由会白屏。
                    //原因：在addRoutes()之后，立刻访问被添加的路由时，addRoutes()没有执行结束，因而找不到刚刚被添加的路由导致白屏。
                    //解决方案：需要重新访问一次路由才行。
                    //该如何解决这个问题 ?
                    //此时就要使用next({ ...to, replace: true })来确保addRoutes()时动态添加的路由已经被完全加载上去
                    //参考：https://www.cnblogs.com/bydzhangxiaowei/p/16811566.html

                    // 继续路由切换,确保addRoutes完成 next({ ...to, replace: true })
                    // hack方法 确保addRoutes已完成，以确保地址是完整的
                    // 设置replace: true，这样导航就不会留下历史记录
                    next({ ...to, replace: true })
                } catch (error) {
                    // 出错需要重置token并重新登陆(令牌过期,网络错误等原因)
                    // // 重定向到登录页面重新登录
                    //await store.dispatch('user/resetToken')
                    next(`/login?redirect=${to.path}`)
                }
                
            }
        }
    } else {
        /* 没有token */
        if (whiteList.indexOf(to.path) !== -1) {
            // 如果在白名单中，则不需要进行任何校验，直接放行
            next()
        } else {
            // 如果不存在于白名单中，则重定向到登录页面
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done()
        }
    }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})