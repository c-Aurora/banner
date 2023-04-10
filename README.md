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


### 依赖
>js-cookie  一个简单的，轻量级的 处理cookies的 js API。

>nprogress  进度条

>vuedraggable 拖拽



>vue-puzzle-vcode 一个纯前端的拼图人机验证 [github地址](https://github.com/javaLuo/vue-puzzle-vcode)、 [参考地址](https://blog.csdn.net/qq_45268602/article/details/123783004)
```javascript
安装： 
    npm install vue-puzzle-vcode -S
引入：
    import Vcode from "vue-puzzle-vcode";
使用：
    <Vcode
        :show="isShow"
        :canvasWidth="400"
        :canvasHeight="250"
        :puzzleScale="1"
        :sliderSize="40"
        :range="10"
        :imgs="[Img1, Img2]"
        successText="验证成功！"
        failText="验证失败，请重试！"
        sliderText="拖动滑块验证"
        @success="onSuccess"
        @fail="onFail"/>

    
```
属性
|       参数     | 说明  | 类型 |   默认值 | 
|      ----     | ----  |---- |----  | 
| show          | 是否显示验证码弹框 | Boolean| false | 
| canvasWidth   | 主图区域的宽度，单位 px | Number| 310 | 
| canvasHeight  | 主图区域的高度，单位 px |Number | 160 | 
| puzzleScale   | 拼图块(小的拼图)的大小比例，0.2 ～ 2 ，数字越大，拼图越大 |Number | 1 | 
| sliderSize    | 左下角用户拖动的那个滑块的尺寸，单位 px |Number | 50 | 
| crange        | 判断成功的误差范围，单位 px, 滑动的距离和拼图的距离小于等于此值时，会判定重合 |Number | 10 | 
| imgs          | 自定义图片 | Array|  | 
| successText   | 验证成功时的提示文字	 |String | “验证通过！” | 
| failText      | 验证失败时的提示文字	 | String| “验证失败，请重试” | 
| sliderText    | 下方滑动条里的文字	 | String| “拖动滑块完成拼图” | 

事件
|  事件名  | 返回值 | 说明 |
|  ----   | ----  |---- |
| success | 偏差值 | 验证通过时会触发，返回值是用户移动的距离跟目标距离的偏差值 px|
| fail    | 偏差值 | 验证失败时会触发，返回值是用户移动的距离跟目标距离的偏差值 px|
```javascript

```

```javascript

```


```javascript

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