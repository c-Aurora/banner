<!-- 锁屏页面 -->
<template>
    <div class="lock-container pull-height">
        <div class="lock-form animated bounceInDown">
            <div class="animated" :class="{ 'shake': passwdError, 'bounceOut': pass }">
                <h3 class="text-white">{{ name }}</h3>
                <el-input 
                    placeholder="请输入登录密码" 
                    type="password" 
                    class="input-with-select animated"
                    v-model="passwd" 
                    @keyup.enter.native="handleLogin">
                    
                    <el-button 
                        slot="append" 
                        @click="handleLogin"
                        type="success">
                        <i class="el-icon-check el-icon--right"></i>
                    </el-button>

                    <el-button 
                        slot="append" 
                        @click="handleLogout" 
                        >
                       
                        <i class="el-icon-close el-icon--right"></i>
                    </el-button>
                </el-input>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'lock',
    data () {
        return {
            passwd: '',
            passwdError: false,
            pass: false
        }
    },
    created () { },
    mounted () { },
    computed: {
        ...mapState({name: state => state.user.name}),
        ...mapGetters(['lockPasswd',])
    },
    props: [],
    methods: {
        handleLogout () {
            this.$confirm('退出系统, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({ path: '/login' })
                    //vue - router退出登录清空路由,router没有提供清空数据的方法。我们可以这样写
                    location.reload();
                })
            }).catch(() => {
                return false
            })
        },
        handleLogin () {
            if (this.passwd !== this.lockPasswd) {
                this.passwd = ''
                this.$message({
                    message: '解锁密码错误,请重新输入',
                    type: 'error'
                })
                this.passwdError = true
                setTimeout(() => {
                    this.passwdError = false
                }, 1000)
                return
            }
            this.pass = true
            setTimeout(() => {
                this.$store.commit('CLEAR_LOCK')
                this.$router.push('/dashboard')
            }, 1000)
        }
    },
    components: {}
}
</script>

<style scoped>
h3{
    font-size: 35px;
    text-align: center;
    margin-bottom: 20px;
}
.lock-container {
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    position: relative;
}

.lock-container::before {
    z-index: -999;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/login-bg.jpg");
    background-size: cover;
}

.lock-form {
    width: 300px;
}
</style>