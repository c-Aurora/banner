<!--  -->
<template>
     <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-s-custom"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" show-password v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <Vcode :show="isShow" @success="success('ruleForm')" @close="close" />
                    <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import Vcode from "vue-puzzle-vcode"; //人机验证插件
    import { isvalidUsername } from "../../utils/validate";//验证方法
    import { setToken } from "../../utils/auth"
    export default {
        name: 'Login',
       components: { Vcode }, 
        data() {
       
            const validateUsername = (rule, value, callback) => {
                if (!isvalidUsername(value)) {
                    callback(new Error("Please enter the correct user name"));
                } else {
                    callback();
                }
            };
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error("The password can not be less than 6 digits"));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    username: 'admin',
                    password: '123123'
                },
                rules: {
                    username: [
                        { required: true, validator: validateUsername,  trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator:  validatePassword, trigger: 'blur' }
                    ]
                },
                isShow: false, //人机验证是否显示
                loading: false,
                passwordType: "password",
                redirect: undefined,
            };
        },
        created(){
                
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect;
                },
                immediate: true,
            },
        },
        methods: {
            submitForm(formName){
                this.isShow = true;
            },
            success(formName) {
                this.isShow = false;
                this.$refs[formName].validate((valid) => {
                   
                    if (valid) {
                        this.loading = true;
                        //commit: 同步操作
                        //this.$store.commit('方法名',值) //存储
                        //this.$store.state.'方法名' //取值
                        //dispatch: 异步操作
                        //this.$store.dispatch('方法名',值) //存储
                        //this.$store.getters.'方法名' //取值
                        //当操作行为中含有异步操作,比如向后台发送请求获取数据,就需要使用action的dispatch去完成了,其他使用commit即可
                        //在组件中用dispatch调用action,用commit调用mutation

                        //this.$store.dispatch('Login', this.ruleForm)是来调取store里的user.js的action下的login方法
                        this.$store.dispatch('Login', this.ruleForm).then(() => {
                            // this.$router.push({ path: this.redirect || "/" });
                            // this.$router.push({ path: "/" })
                            //登录后，上面跳转首页控制台会报下面的错
                            //Error: Redirected when going from "/login" to "/home" via a navigation guard.
                            //原因： next({ ...to, replace: true })会被认为是一个失败的navigation（虽然能导航成功，但不再是原来的to），所以login里的repalce()返回一个rejected Promise。
                            //解决方案：在replace()后面接一个.catch(() => { })
                            this.$router.push({ path: '/' }, () => { })
                            // this.$router.push({ path: this.redirect || "/" });
                            console.log("走到这了")
                        }).catch(() => {
                            this.loading = false
                        })
                        // 模拟登录成功
                        // if (this.ruleForm.username == 'admin' && this.ruleForm.password == '123123') {
                        //     this.loading = false
                           
                        // } else {
                        //     console.log("用户名或密码错误");
                        // }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            close() {
                this.isShow = false;
            },
        }
    }
</script>

<style scoped>
 .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../../static/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>