<!-- 设置页 -->
<template>
    <el-drawer :show-close="false" :visible.sync="drawer" :before-close="handleClose">
        <div class="setting-container">
            <div>
                <h3 class="setting-title">系统设置</h3>
                <div class="setting-item">
                    <span>开启视图页签</span>
                    <el-switch v-model="showViewsBar" class="setting-switch" />
                </div>
                <div class="setting-item">
                    <span>视图页签样式</span>
                    <el-radio-group v-model="viewBarType">
                        <el-radio label="tab">选项卡</el-radio>
                        <el-radio label="tag">标签</el-radio>
                    </el-radio-group>
                </div>
                <div class="setting-item">
                    <span>刷新保留其他视图</span>
                    <el-switch v-model="keepViewsByRefresh" class="setting-switch" />
                </div>
                <!-- <div class="setting-item">
                    <span>收缩菜单栏</span>
                    <el-switch v-model="collapseMenu" class="setting-switch" />
                </div> -->
                <div class="setting-item">
                    <span>保持一个子菜单展开</span>
                    <el-switch v-model="uniqueOpened" class="setting-switch" />
                </div>
                <div class="setting-item">
                    <span>开启面包屑</span>
                    <el-switch v-model="showBreadCrumb" class="setting-switch" />
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data () {
        return {};
    },
    computed: {
        ...mapGetters(['sidebar', 'settings']),
        //开启视图页签
        drawer: function () {
            return this.settings.openSetting;
        },
        //视图页签样式
        showViewsBar: {
            get () {
                return this.settings.showViewsBar;
            },
            set (value) {
                this.$store.dispatch("updateSettings", {
                    key: "showViewsBar",
                    value: value
                });
            }
        },
        //视图页签样式
        viewBarType: {
            get () {
                return this.settings.viewBarType;
            },
            set (value) {
                this.$store.dispatch("updateSettings", {
                    key: "viewBarType",
                    value: value
                });
            }
        },
        //刷新保留其他视图
        keepViewsByRefresh: {
            get () {
                return this.settings.keepViewsByRefresh;
            },
            set (value) {
                this.$store.dispatch("updateSettings", {
                    key: "keepViewsByRefresh",
                    value: value
                });
            }
        },
        //收缩菜单栏
        // collapseMenu: {
        //     get () {
        //         return this.settings.collapseMenu;
        //     },
        //     set (value) {
        //         this.$store.dispatch("updateSettings", {
        //             key: "collapseMenu",
        //             value: value
        //         });
        //     }
        // },
        //保持一个子菜单展开
        uniqueOpened: {
            get () {
                return this.settings.uniqueOpened;
            },
            set (value) {
                this.$store.dispatch("updateSettings", {
                    key: "uniqueOpened",
                    value: value
                });
            }
        },
        //开启面包屑
        showBreadCrumb: {
            get () {
                return this.settings.showBreadCrumb;
            },
            set (value) {
                this.$store.dispatch("updateSettings", {
                    key: "showBreadCrumb",
                    value: value
                });
            }
        }
    },
    methods: {
        //关闭前
        handleClose: function () {
            this.$store.dispatch("updateSettings", {
                key: "openSetting",
                value: false
            });
        }
    }
};
</script>

<style scoped>
  
  ::v-deep .el-drawer {
  background-color: #6aabc5 !important
}

.setting-container {
    padding: 25px;
    line-height: 1.5;
    word-wrap: break-word;
}
    .setting-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
    }

    .setting-item {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .setting-switch {
        float: right;
    }

</style>
