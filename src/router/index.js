import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//Layout 是架构组件(home)，不在后台返回，在文件里单独引入，布局页面

import Layout from '../components/common/Home'
import Lock from '../components/common/lock'

//constantRoutes 通用页面, 这里的配置不需要权限
export const constantRouterMap =[
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index'),
        hidden: true, //导航菜单忽略选项
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true,
    },
    // 锁屏
    {
        path: '/lock',
        name: '锁屏页',
        component: Lock,
        hidden: true
    },
    {
        path: "",
        component: Layout,  //应用布局页
        redirect: "/dashboard",
        children: [{
            path: "dashboard",
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: {
                title: "首页",   //导航菜单项标题
                icon: "el-icon-s-shop"  //导航菜单图标
            }
        }]
    },

]

//asyncRoutes 异步挂载的路由-从后台请求的路由，动态需要根据权限加载的路由表
export const asyncRouterMap = [{
    "path": "/example", //坑：根节点path 加 /  ，子节点不加 /
    "component": "Layout", //坑：注意这里Layout,跟上面不同，上面是使用，这里是字符串，不是引用
    "redirect": "/example/table",
    "name": "Example",
    "meta": {
        "title": "data相关",
        "icon": "el-icon-s-order",
        "roles": ["admin"]  //角色权限配置
    },
    "children": [{
        "path": "table",
        "name": "Table",
        "component": "table/index",
        "meta": {
            "title": "基础表格",
            "icon": "el-icon-mic",
            "roles": ["admin"]
        }
    },
    {
        "path": "description",
        "name": "Description",
        "component": "description/index",
        "meta": {
            "title": "描述列表",
            "icon": "el-icon-mic",
            "roles": ["admin"]
        }
    }]
},
{
    "path": "/drag",
    "component": "Layout",
    "children": [{
        "path": "drag",
        "name": "Drag",
        "component": "drag/index",
        "meta": {
            "title": "拖拽列表",
            "icon": "el-icon-rank",
            "roles": ["admin","editor"]
        }
    }]
},
// 如果需要配置重定向404页面的话，需要配置在asyncRoutes的最后
{
    "path": "*",
    "redirect": "/404",
    "hidden": true
}]

// 实例化vue的时候只挂载基础路由constantRoutes
const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
//路由重复
//出现原因: 路由设置是通过router.addRoutes(xxx)来添加的，退出时，并没有清空，再次登陆，又加了一次，所以有重复
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重新设置路由的可匹配路径
}
export default router



