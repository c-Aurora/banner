//表格的 增删改查封装复用----utils文件是公共js封装，components/common是公共页面的封装
//引用 import { getData, changeInfo, delData } from '@/utils/table.js'

// 获取表格数据
//初始化时，在created调用一下获取数据
//  created() {
//    getData(this, '/info')
//  }
export function getData(root, url, params) {
    root.http.get(url, { params: params || {} }).then(res => {
      if (res.data.status) {
        root.tableData = res.data.data
        root.total = res.data.total
      }
    })
      .catch(err => {
        throw err
      })
  }
  
  
  // 新增和修改方法的封装
  // 用时可这么写
  // let methods = ''
  // this.state ? (methods = 'post') : (methods = 'put')
  // changeInfo(this, methods, '/info', this.form, getData)
  export function changeInfo(root, method, url, form, callback) {
    root.http[method](url, form)
      .then(res => {
        if (res.data.status === 200) {
          callback(root, url)
          root.dialogFormVisible = false
          root.$refs['form'].resetFields()
          root.$message({ type: 'success', message: res.data.message })
        }
      })
      .catch(err => {
        throw err
      })
  }
  
  
  // 删除方法
  //删除时调用
  //del(row) {
    // console.log(row)
    // 弹窗提示
 //   delData(this, '/info', row.id, getData)
  //}
  export function delData(root, url, id, callFun) {
    root.$alert('你确定要删除吗？', '提示', {
      confirmButtonText: '确定',
      callback: () => {
        root.http.delete(`${url}/${id}`).then(res => {
          if (res.data.status === 200) {
            callFun(root, url)
            root.$message({ message: res.data.message, type: 'success' })
          }
        })
          .catch(err => {
            throw err
          })
      }
    })
  }
  