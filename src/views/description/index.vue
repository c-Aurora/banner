<!--  -->
<template>
   <div class="description">
        <div class="container">
            <el-descriptions title="垂直带边框列表" direction="vertical" :column="4" border>
                <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
                <el-descriptions-item label="备注">
                    <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            </el-descriptions>

            <el-descriptions class="margin-top" title="垂直无边框列表" :column="4" direction="vertical">
                <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
                <el-descriptions-item label="备注">
                    <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            </el-descriptions>
        </div>
   </div>
</template>

<script>
    export default {
        name: 'description',
        data() {
       
            return {
                
            };
        },
       
        methods: {
            
        }
    }
</script>

<style scoped>
  
</style>