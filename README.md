# vue-element-vuex-dynamic-router

## 一个vue-cli2 + element + vuex + 权限 + 动态路由 的项目
#### 后续还会加一些看着不错的技术，直到完善...




```
权限问题
存在 token
    如果是管理员则对所有模块具有访问权限
    非管理员，需要对异步路由进行筛选，通过遍历异步路由，并通过 meta.roles 与用户信息比较，判断用户是否具有访问权限
    存在用户角色信息,则说明该用户的最终可访问的路由已经生成，可以直接放行
    不存在用户信息
1、调用获取用户信息接口，获取到用户信息, 将用户信息存放到 vuex 中
2、判断用户角色
3、将最终的可访问路由存放到 vuex 中，最后通过 router.addRoutes，整合最后的路由配置列表
4、不存在 token
    如果访问路由在白名单下，则直接进行访问
    访问路由不存在白名单下，则重定向到登录页面 path: /login?redirect=/xxx,登录成功后则跳转到/xxx 对应的页面
```


```
npm install
```
```
npm run dev
```
```
npm run build
```
```
npm run build --report
```




总结思路
1.  路由守卫判定当初次登录时，后端返回路由数据，处理完数据放进vuex存起来。

2.（1）菜单组件去获取vuex的路由数据，进行处理形成自己需要的菜单数据并进行渲染。

   （2）标签页组件去vuex获取Tabs数据，进行渲染。

     (3)   面包屑直接从vuex里获取数据，进行渲染。

3.  操作（1）当子菜单栏被点击时，在vuex(即store)里面添加Tab数据，同时标签页、面包屑实时渲染。

     操作（2）当标签页被删除时，在vuex里删除其数据，同时选中上一次点击的子菜单栏和标签页，面包屑也跟着变化

     操作（3）  切换标签，动态菜单跟着切换选中

4.  当路由守卫判定不为初次登录时，则被认为是在刷新，则从sessionStorage缓存中找到数据赋值给store，重新渲染路由，使页面不为空白


<!-- 1、执行npm run build ,先推送到master分支

2、使用git subtree push --prefix dist origin gh-pages将dist目录推送到远程的gh-pages分支，若远程没有gh-pagse分支则会新建gh-pagse分支然后再推送。

备注：此处只能是gh-pages分支，才能使用GitHub pages功能


3、登录远程GitHub仓库，通过setting -> github pages -> source 将gh-pages设置为GitHub pages 的source

4、每次执行npm run build 后再次执行步骤2 -->


## 用的easy mock模拟数据，数据里有判断admin,editor,所以多了参数，等后台有接口的时候要删除掉
下面页面搜索”假的“直接删除，用下面注释掉的即可
1、user.js里面的"假的"
2、api.js里面的"假的"
3、与main.js同级的permission.js里面的"假的"