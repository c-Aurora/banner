// 暴露到全局
import btnPermission from './btnPermission'
const install = Vue => {
  Vue.directive('btnPermission', btnPermission)
}
if (window.Vue) {
  window['btnPermission'] = btnPermission
  Vue.use(install);
}

btnPermission.install = install
export default btnPermission