<!--  -->
<template>
    <div class="wrapper">
         <el-aside :class="[isCollapse ? 'collpase' : 'expand']">
            <!-- siderbar -->
            <v-sidebar class="aside-menu" :is-collapse="isCollapse"></v-sidebar>
        </el-aside>
        <div class="content-box" :class="{'content-collapse': isCollapse }">
            <v-head></v-head>
            <!-- 标签页 -->
            <v-tags></v-tags>
            <vBreadcrumb></vBreadcrumb>
            <div class="content">
                <!-- 当transition下面有两个标签要切换的时候，会出现同时在动的情况，解决方式给transition加一个mode属性-->
                <!-- 如果想要动画一进来就有，那么就给transition加要给appear属性  -->
                <!-- out-in 当前元素先进行过渡，完成之后新元素过渡进入 -->
                <!-- 过渡动画写在main.css里面 -->
                <transition name="slide-fade" mode="out-in" appear>
                    <!-- keep-alive 动态判断缓存 name 为 tagsList 的组件 -->
                    <!-- 在组件切换过程中将状态保留在内存中，防止重复渲染DOM，减少加载时间及性能消耗，提高用户体验性 -->
                    <!-- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。-->
                    <!-- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。 -->
                    <!-- max - 数字。最多可以缓存多少组件实例 -->
                    <!-- https://blog.csdn.net/m0_45070460/article/details/107432685 -->
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
        <settings open="open"></settings>
    </div>
</template>

<script>
import vHead from './Header';     //引入Header组件
import vSidebar from './Sidebar'; //引入Sidebar组件
import vTags from './Tags';       //引入Tags组件
import vBreadcrumb from './Breadcrumb'; //引入面包屑组件
import Settings from "./settings"; //设置组件
import bus from './bus';
import { mapGetters } from 'vuex'
    
export default {
    data () {
        return {
            tagsList: []
        };
    },
    components: { //挂载组件     注意引入component是要带s的，配置路由的component不要带s
        vHead, 
        vSidebar, 
        vTags,
        vBreadcrumb,
        Settings
    },
    computed: {
        ...mapGetters(['settings']),
        isCollapse () {  //这里用到collapse是因为，侧边栏折叠后，页面也要跟着延伸，所以用到class选择器来判断
            // return this.$store.getters.sidebar.collapse;
            // 简便写法
            return this.settings.collapseMenu
        },
    },
    created () {
            
            //只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
       
        methods: {
            
        }
    }
</script>

<style scoped>

</style>