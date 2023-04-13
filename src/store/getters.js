// 通过根getters建立对子模块state里面的数据的快捷访问
const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    // visitedViews: state => state.app.visitedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    //用户权限列表按钮
    btnPermissionList: state => state.user.btnPermissionList,
    // introduction: state => state.user.introduction,
    // status: state => state.user.status,
    roles: state => state.user.roles,
    // resource: state => state.user.resource,
    // setting: state => state.user.setting,
    permission_routers: state => state.permission.routers, //筛选后的路由
    addRouters: state => state.permission.addRouters,
    // 锁屏
    isLock: state => state.user.isLock,
    lockPasswd: state => state.user.lockPasswd,
    //设置
    settings: state => state.settings.settings
  }
  export default getters
  