<template>
    <div class="selector">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> from相关</el-breadcrumb-item>
                <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
                <el-breadcrumb-item>选择器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-card shadow="hover" class="mgb20" style="height:252px;">
                        <h5>Select选择器 可搜索</h5>
                        <el-select v-model="value" filterable placeholder="请选择">
                            <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-card>
                    <el-card shadow="hover" style="height:252px;">
                        <h5>Cascader 级联选择器</h5>
                        <el-cascader v-model="value2" :options="options2" @change="handleChange"></el-cascader>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" class="mgb20" style="height:252px;">
                        <h5>TimePicker 时间选择器</h5>
                        <el-time-picker
                            is-range
                            v-model="value3"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-card>
                    <el-card shadow="hover" style="height:252px;">
                        <h5>DatePicker 日期选择器</h5>
                        <el-date-picker
                            v-model="value4"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" class="mgb20" style="height:252px;">
                    
                    </el-card>
                    <el-card shadow="hover" style="height:252px;">
                    
                    </el-card>
                </el-col>
        </el-row>


            


            
           
           
           
        </div>
    </div>
</template>

<script>
    export default {
        name: 'selector',
        data() {
            return {
                options1: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶',
                    disabled: true
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',

                value2: [],
                options2: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [
                        {value: 'shejiyuanze',label: '设计原则',children: [{value: 'yizhi',label: '一致'}, {value: 'fankui',label: '反馈'}]}, 
                        {value: 'daohang',label: '导航',children: [{value: 'cexiangdaohang',label: '侧向导航'}]}
                    ]}, {
                    value: 'zujian',
                    label: '组件',
                    children: [
                        {value: 'basic',label: 'Basic',children: [{value: 'layout',label: 'Layout 布局'}, {value: 'color',label: 'Color 色彩'}]}, 
                        {value: 'form',label: 'Form',children: [{value: 'radio',label: 'Radio 单选框'},{value: 'rate',label: 'Rate 评分'}, {value: 'form',label: 'Form 表单'}]}, 
                        {value: 'data',label: 'Data',children: [{value: 'pagination',label: 'Pagination 分页'}, {value: 'badge',label: 'Badge 标记'}]}
                    ]}, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [
                        {value: 'axure',label: 'Axure Components'}, {value: 'sketch',label: 'Sketch Templates'}, {value: 'jiaohu',label: '组件交互文档'}
                    ]}
                ],
                value3: [new Date(2010, 9, 10, 8, 40), new Date(2010, 9, 10, 9, 40)],
                value4:'',
            }
        },
        methods: {
            handleChange(value) {
                console.log(value);
            }
        },
        computed: {
           
        }
    }

</script>

<style>

</style>

