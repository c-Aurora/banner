<template>
    <div class="steps">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-money"></i> Navigation相关</el-breadcrumb-item>
                <el-breadcrumb-item>步骤条</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-steps :active="2" align-center finish-status="success">
                <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
            </el-steps>

            <div style="height: 300px;margin-top: 100px;">
                <el-steps direction="vertical" :active="1">
                    <el-step title="已完成"></el-step>
                    <el-step title="进行中"></el-step>
                    <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
                </el-steps>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'steps',
        data() {
            return {
               
            }
        },
        methods: {
           
        },
        computed: {
           
        }
    }

</script>

<style>

</style>

