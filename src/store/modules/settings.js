import commonUtil from '@/utils/commonUtil'
const settings = {
    state: {
        settings: {
            //语言
            lang: localStorage.getItem('lang') || 'zh-CN',
            //打开设置
            openSetting: commonUtil.getSettingStorage('openSetting'),
            //开启视图页签
            showViewsBar: commonUtil.getSettingStorage('showViewsBar'),
            //视图页签样式
            viewBarType: localStorage.getItem('viewBarType') || 'tab',
            //刷新保留其他视图
            keepViewsByRefresh: commonUtil.getSettingStorage('keepViewsByRefresh'),
            //收缩菜单栏
            collapseMenu: commonUtil.getSettingStorage('collapseMenu'),
            //保持一个子菜单展开
            // uniqueOpened: commonUtil.getSettingStorage('uniqueOpened'),
            //开启面包屑
            showBreadCrumb: commonUtil.getSettingStorage('showBreadCrumb')
        }
    },
    mutations: {
        UPDATE_SETTINGS: (state, { key, value, type }) => {
            if (type && type === 'toggle') {
                state.settings[key] = !state.settings[key]
                localStorage.setItem(key, state.settings[key])
                return
            }
            state.settings[key] = value
            localStorage.setItem(key, value)
        }
    },
    actions: {
        updateSettings: ({ commit }, param) => {
            commit('UPDATE_SETTINGS', param)
        }
    }
}
export default settings
