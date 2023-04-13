//封装请求接口api
//使用方法：
//①在需要的页面引入 import { login, getInfo } from '@/api/api.js',用什么方法引入什么方法
//② login(this.username,this.password).then( res => {
//     if(res.data.code === 200 ){
//         ...
//     }
// } )

import http from '../utils/request'

// import http from '@/utils/request' @写法也可以

//登录
export function login(username, password) {
    return http({
        url: '/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
    //或者
  //   return http({
  //     url: '/user/login' + '?username=' + username,
  //     method: 'post'
  //   })
  }
  //获取token信息
  
  //假的rolesName，到时候删除，用下面注释的，假的，后台数据模拟，等真的后台的时候删掉，用下面注释的
//   export function getInfo(token) {
//     return http({
//       url: '/info',
//       method: 'get',
//       params: { token }
//     })
  export function getInfo(token,rolesName) {
    return http({
      url: '/info',
      method: 'get',
      params: { token,rolesName }
    })
  
    //或者
  //   return http({
  //     url: '/user/info' + '?username=' + token,
  //     method: 'get'
  //   })
  }
  //登出
  export function logout() {
    return http({
      url: '/logout',
      method: 'post'
    })
  }