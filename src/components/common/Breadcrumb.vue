<!-- 面包屑 -->
<template>
    <div class="crumbList">
        <el-breadcrumb class="breadcrumb" separator="/">
            <!-- 列表过渡，所以用transition-group  https://v2.cn.vuejs.org/v2/guide/transitions.html#CSS-%E5%8A%A8%E7%94%BB -->
            <!--  -->
            <transition-group name="breadC" tag="p">
                <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
                    <template v-if="breadcrumbData.length === 1">
                        <span class="no-redirect"><i :class="item.meta.icon"></i>{{ item.meta.title }}</span>
                    </template>
                    <template v-else>
                        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{ item.meta.title }}</span> 
                        <span class="redirect" v-else @click="onLinkClick(item)"><i :class="item.meta.icon"></i>{{ item.meta.title }}</span>
                    </template>
                    
                </el-breadcrumb-item>
            </transition-group>
            
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                breadcrumbData:[]
            };
        },
        computed: {
           
        },
        created(){
           
        },
       
        methods: {
            getBreadcrumbData() {
                 //console.log( this.$route.matched,'getBreadcrumbData')
                this.breadcrumbData = this.$route.matched.filter(item => item.meta && item.meta.title)
            },
            //点击面包屑跳转相应路由
            onLinkClick (item) {
                console.log(this.$route, item, 'onLinkClick')
                // console.log( this.$route,item,'onLinkClick')
                //this.$route.push(item.path)
            }
        },
        //获取路由数据-监听路由对象
        //对于获取路由数据，我们只需要对路由进行监听即可，从而来获取获取数据，
        //Vue为我们提供了具体的获取方法，只需要通过vue.$route.matched来获取与给定路由地址匹配的数据，
        watch: {
            $route: {
                immediate: true,
                handler(newValue ,oldValue){
                    // console.log(newValue,oldValue)
                    
                    this.getBreadcrumbData()
                }
            }
        }
    }
</script>

<style scoped>
    .crumbList {
        margin-top: 10px;
        height: 30px;
        padding: 0 10px;
    }
    .breadcrumb{
        line-height: 30px;
    }
    .breadC-enter-ctive,.breadC-leave-active{
        transition: all 0.5s;
    }
    .breadC-enter,.breadC-leave-active{
        opacity: 0;
        transform: translateX(20px);
    }
    .breadC-leave-active{
        position: absolute;
    }
</style>