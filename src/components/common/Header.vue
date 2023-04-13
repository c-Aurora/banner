<!-- 头部 -->
<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
             <i :class="collapseMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 锁屏 -->
                    <div class="btn-bell">
                        <el-tooltip effect="dark" content="锁屏" placement="bottom">
                            <i class="el-icon-lock" @click="handleLock"></i>
                        </el-tooltip>
                         <el-dialog title="设置锁屏密码" :visible.sync="box" width="30%" append-to-body>
                            <el-form :model="form" ref="form" label-width="80px">
                                <el-form-item label="锁屏密码" prop="passwd" :rules="[{ required: true, message: '锁屏密码不能为空' }]">
                                    <el-input v-model="form.passwd" placeholder="请输入锁屏密码"></el-input>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="handleSetLock">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="static/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{name}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">

                        


                        <a href="#" target="_blank">
                            <el-dropdown-item>跳转链接1</el-dropdown-item>
                        </a>
                        <a href="#" target="_blank">
                            <el-dropdown-item>跳转链接2</el-dropdown-item>
                        </a>
                        <el-dropdown-item icon="el-icon-user-solid">基本信息</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-info">关于我们</el-dropdown-item>
                        <!-- <el-dropdown-item command="settings" icon="el-icon-s-tools">系统设置</el-dropdown-item> -->
                        <el-dropdown-item divided  command="loginout" icon="el-icon-error">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import { validatenull } from '@/utils/validate'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                fullscreen: false,
                message: 2,
                box: false, //锁屏密码弹窗显示与否
                form: {
                    passwd: '' //设置锁屏密码
                }
            }
        },
    computed: {
            ...mapGetters(['sidebar', 'name', 'lockPasswd', 'settings']),
        collapseMenu () {
                return this.settings.collapseMenu
            },
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    // console.log(this.$route)
                    this.$confirm("确定要退出登录么?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then( async () => {
                        await this.$store.dispatch('LogOut')
                        this.$router.push({ path: '/login' }, () => { })
                    //vue - router退出登录清空路由,router没有提供清空数据的方法。我们可以这样写
                        location.reload();
                    });
                    
                }
                // if (command == 'settings') {
                //     this.$store.dispatch("updateSettings", {
                //         key: "openSetting",
                //         value: true
                //     });   
                // }
            },
            // 侧边栏折叠
            collapseChage () {
                 this.$store.dispatch("updateSettings", {
                    key: "collapseMenu",
                    type: "toggle"
                });
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            //锁屏
            handleLock () {
                if (validatenull(this.lockPasswd)) {
                    this.box = true
                    return
                }
                this.$store.commit('SET_LOCK')
                setTimeout(() => {
                    this.$router.push({ path: '/lock' })
                }, 100)
            },
            //设置锁屏密码
             handleSetLock () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.$store.commit('SET_LOCK_PASSWD', this.form.passwd)
                        this.handleLock()
                    }
                })
            },
        },
        mounted(){
            //当前屏幕宽度小于1500，侧边栏折叠
            // if(document.body.clientWidth < 1500){
            //     this.collapseChage();
            // }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        font-size: 22px;
        color: #fff;
        background-color: #242f42;
    }
    .collapse-btn{
         background: none;
        border: none;
        font-size: 22px;
        margin-left: 20px;
        line-height: 56px;
        display: inline-block;
        cursor: pointer;

    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 56px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell{
        margin-top: 6px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
