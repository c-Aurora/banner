<template>
    
    <div class="sidebar">
        <!-- :default-active="activeMenu"  -->
        <el-menu 
            class="sidebar-el-menu" 
            :default-active="$route.path"
            :collapse="isCollapse" 
            :background-color="variables.menuBg"
            :text-color="variables.menuText" 
            :active-text-color="variables.menuActiveText" 
            unique-opened>

            <el-menu-item index="0" style="padding:0 12px;">
                <div class="logo">
                    <a v-if="isCollapse" href="#"><img style="width:25px;height: 25px;" src="../../../static/img/logo.png"></a>
                    <a v-else href="#">xxx管理系统</a>
                </div>
            </el-menu-item>


            <!-- 写法一for循环写里面 -->
            <SidebarItem :routes="permission_routers"></SidebarItem>
            <!-- 写法二 for循环写外面-->
            <!-- <SidebarItem v-for="route in permission_routes" :key="route.path" :routes='route' :base-path='route.path'></SidebarItem> -->
        </el-menu> 
    </div>
    
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
export default {
    components: { SidebarItem },
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        
        
        }
    },
    computed:{
        ...mapGetters(['sidebar', 'permission_routers']),
        //侧边栏颜色
        variables () {
            return {
                menuBg: "#242f42",
                menuText: "#bfcbd9",
                menuActiveText: "#20a0ff",
                
            }
        },
        
    },
    created(){
    },
    methods: {
    }
}
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom:0;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .logo{
        font-size: 20px;
        font-weight: bolder;
        text-align: center;
    }
    
    .logo a{
      color: #fff;
  }
    /* 语法:  E:not(s){sRules} 匹配不含有s选择符的元素E */
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
