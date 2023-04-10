<template>
    <div class="">
        <!-- 法二这个 <template v-for="item in routes"> 这一层不需要要了，法二还得要-->
        <template v-for="item in routes">
            <template  v-if="!item.hidden && item.children">
                <!-- 唯一显示子元素的情况显示为链接 -->  
                <router-link v-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow" :to="item.path + '/' + item.children[0].path" :key="item.children[0].name">
                    <!-- 坑：父组件的default-active和子组件index是一一对应的关系，两个相等才会触发高亮的效果 -->
                    <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{ 'submenu-title-noDropdown': !isNest }">
                        <template v-if="item.children[0].meta && item.children[0].meta.title">
                            <i :class="item.children[0].meta.icon"></i>
                            <span slot="title">{{ item.children[0].meta.title }}</span>
                        </template>
                    </el-menu-item>
                </router-link>
                <!-- 有子元素显示为菜单 -->
                <el-submenu v-else :index="item.name || item.path" :key="item.name">
                <!-- 标题 -->
                     <template slot="title" v-if="item.meta && item.meta.title">
                            <i :class="item.meta.icon"></i>
                            <span slot="title">{{ item.meta.title }}</span>
                    </template>
                    <!-- 子菜单 -->
                    <template v-for="child in item.children" v-if="!child.hidden">
                        <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length > 0" :routes="[child]" :key="child.path"></sidebar-item>

                        <router-link v-else :to="item.path + '/' + child.path" :key="child.name">
                            <el-menu-item :index="item.path + '/' + child.path">
                                <span v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
                            </el-menu-item>
                        </router-link>
                    </template>
                </el-submenu>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        },
        isNest: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {

  }
}
</script>
