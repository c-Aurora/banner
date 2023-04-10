<template>
    <div class="transfer">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> from相关</el-breadcrumb-item>
                <el-breadcrumb-item>三级菜单</el-breadcrumb-item>
                <el-breadcrumb-item>穿梭框</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <p style="text-align: center; margin: 0 0 20px">使用 render-content 自定义数据项</p>
  <div style="text-align: center">
    <el-transfer
      style="text-align: left; display: inline-block"
      v-model="value"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['Source', 'Target']"
      :button-texts="['到左边', '到右边']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="data">
      <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
      <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
    </el-transfer>
  </div>
 
        </div>
    </div>
</template>

<script>
    export default {
        name: 'transfer',
        data() {
            return {   
                data: [],
                value: [1],
                value4: [1],
                renderFunc(h, option) {
                    return <span>{ option.key } - { option.label }</span>;
                }
               
            }
        },
        created(){
           this.generateData()
        },
        methods: {
            generateData(){
                for (let i = 1; i <= 15; i++) {
                    this.data.push({
                        key: i,
                        label: `备选项 ${ i }`,
                        disabled: i % 4 === 0
                    });
                }
            },
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
            }
        },
        computed: {
           
        }
    }

</script>

<style scoped>
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>

