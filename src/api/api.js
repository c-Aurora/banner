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
  export function getInfo(token) {
    return http({
      url: '/info',
      method: 'get',
      params: { token }
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