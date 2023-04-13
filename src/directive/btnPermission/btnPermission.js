// 按钮权限自定义指令

 import store from '@/store/index'

/*
*新增 v-btnPermission指令
*el 元素权限点(<button>添加</button>)
*binding 所有权限点
*/

 //
function checkPermission (el, binding) {
   
    //从binding中获取dom元素的value值(当前按钮传递的值，即： v-btnPermission="'add'" 中的值)
    const { value } = binding
    // console.log(value,11)
    // 从store中拿到该用户所有按钮的权限
    const btnlist = store.getters && store.getters.btnPermissionList
    // console.log(btnlist,22)
    // 判断传入的值是不是数组，规范化传值
    // if (value && value instanceof Array) { 
        if (value.length > 0) {  
            //存放value值
            const permissionRoles = value
            // 判断按钮列表里是否有这个权限字段
            const hasPermission = btnlist.includes(permissionRoles)
// console.log(hasPermission,33)
            // 没有权限则进行删除，不展示。
            // v-btnPermission具体实现可以根据业务场景进行修改
            if (!hasPermission) {
                // console.log(el.parentNode.removeChild(el),44 )
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    // } else {
        // throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    // }
}
export default {
    inserted (el, binding) {
        checkPermission(el, binding)
    },
    update (el, binding) {
        checkPermission(el, binding)
    }
}

// 指令提供的钩子函数：

// bind（绑定到元素时调用）
// unbind（解绑时调用）
// inserted（被绑定元素插入到父节点时调用）
// update（被绑定元素所在的模版更新时调用）
// componentUpdate（被绑定元素所在模版完成一次更新周期时调用）

// 这几个钩子函数的参数：el（指令绑定的元素）、binding、vnode、oldVnode，其中binding是个很有意思的参数。

// binding 参数是一个对象，包含如下属性：

// name：指令名，不包括 v- 前缀。
// value：指令的绑定值。
// oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用，无论值是否改变都可用。
// expression：绑定值的字符串形式。 例如 v-my-directive=”1 + 1″ ， expression 的值是 “1 + 1″。
// arg：传给指令的参数。例如 v-my-directive:foo， arg 的值是 “foo”。
// modifiers：一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。





  
