<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
               
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table 
                :data="tableData" 
                border 
                class="table" 
                ref="multipleTable"
                 @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" fixed></el-table-column>
                <el-table-column prop="date" label="日期" sortable width="150"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="province" label="省份" width="120"></el-table-column>
                <el-table-column prop="city" label="市区" width="120"></el-table-column>
                <el-table-column prop="address" label="地址" width="300"></el-table-column>
                <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
                <el-table-column label="操作" width="180" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页导航 -->
            <!-- <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="省份">
                    <el-input v-model="form.province"></el-input>
                </el-form-item>
                <el-form-item label="市区">
                    <el-input v-model="form.city"></el-input>
                </el-form-item>
                <el-form-item label="邮编">
                    <el-input v-model="form.zip"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                
                tableData: [{//表格数据
                    date: '2016-05-05',
                    name: '王大虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    id:'1'
                    }, {
                    date: '2016-05-04',
                    name: '王二虎',
                    province: '杭州',
                    city: '江干区',
                    address: '杭州市江干区xx路 157号',
                    zip: 223422,
                    id:'2'
                    }, {
                    date: '2016-05-01',
                    name: '王三虎',
                    province: '北京',
                    city: '丰台区',
                    address: '北京市丰台区xx路 159 弄',
                    zip: 100333,
                    id:'3'
                    }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '深圳',
                    city: '南山区',
                    address: '深圳市南山区xx路 16 弄',
                    zip: 400318,
                    id:'4'
                }], 
                select_word: '', //关键词

                multipleSelection: [],//全选单选

                delVisible: false,//删除框显示隐藏

                idx: -1, //下标

                form: { //编辑form
                    date: '',
                    name: '',
                    province: '',
                    city: '',
                    zip: '',
                    address: ''
                },
                editVisible: false,//编辑框显示隐藏

                cur_page: 1,
                del_list: [],
              
            }
        },
        created() {
            //this.getData();获取数据
        },
        computed: {
            
        },
        methods: {
            //批量删除
            delAll(){
                //批量删除的两个方法
                //法一
                this.tableData = this.tableData.filter((item) => !this.multipleSelection.some((ele) => ele.id === item.id));
                //法二
                // 获取到multipleSelection的所有id集合
                // let arr1Ids = this.multipleSelection.map(item => item.id);
                // 过滤tableData中不包含arr1相同的id数组。
                // this.tableData = this.tableData.filter(item => !arr1Ids.includes(item.id));
                this.$message.error('删除了成功');
                this.multipleSelection = [];   
            },
          
            //搜索
            search (){

            },
            //全选，单选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //删除一行
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            //编辑
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    
                    date: item.date,
                    name: item.name,
                    province: item.province,
                    city: item.city,
                    zip: item.zip,
                    address: item.address
                }
                this.editVisible = true;
            },
             // 保存编辑
             saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },

            // 分页导航
            // handleCurrentChange(val) {
            //     this.cur_page = val;
            //     this.getData();//请求的数据
            // },
            //获取数据
            // getData() {
            //     this.$axios.post(this.url, {
            //         page: this.cur_page
            //     }).then((res) => {
            //         this.tableData = res.data.list;
            //     })
            // },
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>
