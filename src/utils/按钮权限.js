//基本用法
{/* <div v-permission="['admin','editor']"></div> */}
// import store from '@/store'

// function checkPermission(el, binding) {
//     const { value } = binding
//     // 从store中拿到我们访问接口后，取到用户角色信息
//     const roles = store.getters && store.getters.roles
//     if (value && value instanceof Array) { // 判断传入的值是不是数组，规范化传值
//         if (value.length > 0) {   
//             const permissionRoles = value
//             // 只要传入的permissionRoles中，包含了roles其中的一个值即可，则代表有权限
//             const hasPermission = roles.some(role => {
//                 return permissionRoles.includes(role)
//             })
//             // 没有权限则进行删除，不展示。
//             // v-permission具体实现可以根据业务场景进行修改
//             if (!hasPermission) {
//                 el.parentNode && el.parentNode.removeChild(el)
//             }
//         }
//     } else {
//         throw new Error(`need roles! Like v-permission="['admin','editor']"`)
//     }
// }
// export default {
//     inserted (el, binding) {
//         checkPermission(el, binding)
//     },
//     update (el, binding) {
//         checkPermission(el, binding)
//     }
// }