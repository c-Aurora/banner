// 权限管理模块


// asyncRouterMap 后台返回的路由， constantRouterMap 基础路由
import { asyncRouterMap, constantRouterMap } from '@/router/index'
//Layout 是架构组件，不在后台返回，在文件里单独引入
import Layout from '../../components/common/Home'

//后端返回的component是字符串，我们要转成自己要的component
// 自己试了下 import(`@/views/${file}`)的import方式引入会报错，所以用了require
export const loadView = (file) => { // 路由懒加载
    // return () => import(`@/views/${file}`)
    return () => import("@/views/"+file)
}
/**
 * 根据路由meta.role 确定是否当前用户拥有访问权限
 * @roles 用户拥有角色,角色必须是对象数组! 例如: ['admin'] 或 ,['developer','editor']
 * @route 待判定路由
*/

function hasPermission (roles, route) {
    // 如果当前路由有roles 字段则需要判断用户访问权限
    if (route.meta && route.meta.roles) {
        // 只要meta.roles中存在与用户角色列表中相同的值，则说明具有访问权限
        return roles.some(role => route.meta.roles.includes(role) >= 0)
        //另一种写法 return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        // 不存在meta或者是不存在meta.roles，则说明是通用模块，直接放行
        return true
    }
}

/**
 * 递归过滤异步路由表，根据角色权限，过滤出符合他的路由,遍历后台传来的路由字符串
 * @asyncRouterMap 后台返回的路由
 * @roles 用户拥有角色,角色必须是对象数组! 例如: ['admin'] 或 ,['developer','editor']
*/

function filterAsyncRouter (asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        //console.log(route,route.component,'hu'),路由有问题，看这里
        //如果有权限
        // 相对路由数组的每一项进行访问权限的判断
        if (hasPermission(roles, route)) {
            //如果component存在
            if (route.component) {
                if (route.component === 'Layout') { //Layout组件特殊处理
                    //console.log('1')
                    route.component = Layout
                } else {
                    //后端传来的component是一个字符串
                    //实际前端需要的 component是 component: () => import('@/views/content/classify'),
                    route.component =loadView(route.component) 
                    //console.log(route.component,"打印出来二级菜单的component是空的，但是能用")
                }
                
            }
            if (route.children && route.children.length) {
                
                route.children = filterAsyncRouter(route.children, roles)
                //console.log(route.children,'3')
            }
            return true
        }
    })
    // console.log(accessedRouters,'1')
    return accessedRouters





    // //如果后台给的动态路由不是自己想要的，就要自己遍历，改成自己想要的
    // const accessedRouters = []
    // for (let i = 0; i < asyncRouterMap.length; i++) {
    //     accessedRouters.push({
    //         path: asyncRouterMap[i].content === 'Layout' ? `/${asyncRouterMap[i].path}` : asyncRouterMap[i].path,
    //         component: asyncRouterMap[i].content === 'Layout' ? Layout : _import(asyncRouterMap[i].content),
    //         name: asyncRouterMap[i].path,
    //         meta: {
    //             title: asyncRouterMap[i].menuname,
    //             icon: asyncRouterMap[i].icon
    //         },
    //         children: asyncRouterMap[i].children && asyncRouterMap[i].children.length ? filterAsyncRouter(asyncRouterMap[i].children) : []
    //     })
    // }
    // return accessedRouters

    //写法三，没验证
    // const accessedRouters = []
    // routes.forEach(route => {
    //     // 复制一份
    //     const tmp = { ...route }
    //     // 如果用户有访问权限则加入结果路由表
    //     if (hasPermission(roles, tmp)) {
    //         // 如果存在子路由则递归过滤之
    //         if (tmp.children) {
    //             tmp.children = filterAsyncRouter(tmp.children, roles)
    //         }
    //         accessedRouters.push(tmp)
    //     }
    // })
    // return accessedRouters
}

const permission = {
    state: {
        routers: constantRouterMap,  // 最终的路由列表,即完整路由表
        addRouters: [] // 根据权限得到的路由列表,即用户可访问路由表
    },
    mutations: {
        //拼接路由
        SET_ROUTERS: (state, routers) => {
            // routes 用户可以访问的权限
            state.addRouters = routers
            //把基础路由和过滤的路由(完整的路由表)合并在一起，存起来
            state.routers = constantRouterMap.concat(routers) 
            //console.log('state.routers-1111', state.routers)
        }
    },
    actions: {
        //筛选
        GenerateRoutes ({ commit }, data) {
            // 当前登录账号的角色数组
            return new Promise(resolve => {
                const { roles } = data
                let accessedRouters
                //根据用户角色roles和异步路由进行筛选(根据用户角色做过滤处理)
                /* asyncRouterMap 这里直接写在页面中了，实际应用中我们需要进行ajax请求获取*/
                // console.log(asyncRouterMap,12123)
                accessedRouters = filterAsyncRouter(asyncRouterMap, roles)

                // 最后添加，如果后端没有404重定向，这里就要加上，加到最后面，不然都会重定向到404
                // const unfound = { path: '*', redirect: '/404', hidden: true }
                // accessedRoutes.push(unfound)

                //通过SET_ROUTERS拼接基础路由
                // 将最终的结果存放到vuex中
                commit('SET_ROUTERS', accessedRouters)
                // resolve出去
                resolve(accessedRouters)
            })
        }
    }
}

export default permission
