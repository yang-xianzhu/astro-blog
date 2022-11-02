---
title: 项目遇到的问题
description: 项目遇到的问题
layout: ../../../layouts/MainLayout.astro
---

### 移动端点击事件300ms延迟问题

问题描述：移动端web网页触屏事件是有300ms延迟的，往往会造成按钮点击延迟甚至是点击失效。

解决方法：

- 借助fastclick可以解决在手机上点击事件的300ms延迟
- zepto.js的touch模块，tap事件也是为了解决click的延迟问题

### audio 和 video在ios和andriod中自动播放

由于优化用户体验，苹果系统和安卓系统通常都会禁止自动播放和禁止页面加载时使用JS触发播放，必须由用户主动点击页面才可以触发播放。通过给页面根元素加touchstart的监听事件实现触发播放

```js
$('html').one('touchstart', function() {
  audio.play()
})
```

### 项目优化

##### token的主动处理：

- 用户登录时获取到token，存储到vuex和本地中，把当前时间戳存储进去，然后每次发送请求都会携带token过去，请求之前就判断一下 如果当时存储token的时间戳 - 现在的时间戳 >=设置的token过期时间，就拿ref_token去获取新的token，然后重新存储到vuex和本地中，然后发送请求。

### iphone7用for...in遍历数组失效

问题描述：最初学习使用js时，觉得`for...in`遍历比`for循环`简洁，后期在用户反馈后发现iPhone7不支持用for...in遍历数组

解决方法：改为了for循环遍历



### webpack的基本配置

- mode:指定打包的模式，development 或 production
- devtool：指定生成sourceMap的方式
- entry：配置入口文件。多文件打包的话要打包几个文件，就在entry中写几个入口，output的filename用占位符`[name]`表示。
- loader：辅助打包的各种工具。
- plugins：插件，loader被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。如htmlWebpackPlugin,CleanWebpackPlugin。
- devServer：使用WebpackDevServer开启热更新，提升开发效率。


### 后台管理系统的动态路由表的坑

利用addRoutes添加动态路由表，但还没生成就已经跳转到其他页面去了，怎么解决？

- 等动态路由表生成后再`mouted`挂载

  ```js
  const vm = new Vue({
    store,
    render:h=>h(App),
    router
    ....
  })
  // 此处判断是否生成了动态表了
  vm.mouted('#app')
  ```

在动态路由页面里刷新会出现404怎么解决？

- 原因：因为生成动态路由表的数据是存储在vuex里面的，因为vuex的数据是存储在内存里的，刷新会丢失，所以vuex里的数据刷新会重置。
- 解决方法：
  - 把vuex里面的动态路由表的数据也存储一份到本地里面，持久化​

细节：退出登录时，记得把动态路由表的数据清空掉，要不会出现下次不同账号的用户登录也会有上一个用户的权限。

### 组件内守卫

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
```

### 路由的完整的导航解析流程

- 导航被触发
- 在失活的组件里调用`beforeRouteLeave`守卫
- 调用全局的`beforeEach`守卫
- 在重用的组件里调用`beforeRouteUpdate`守卫
- 在路由配置里调用`beforeEnter`
- 解析异步路由组件
- 在被激活的组件里调用`beforeRouteEnter`
- 调用全局的`beoforeResolve`守卫
- 导航被确认
- 调用全局的`afterEach`钩子
- 触发DOM更新
- 调用`beforeRouteEnter`守卫中传给`next`的回调函数，创建好的组件实例会作为回调函数的参数传入

### 路由缓存

- 使用`<keep-alive>`可缓存路由
- 它有`include` 和 `exclude`两个属性，分别表示包含或排除某些路由，值可以是字符串、数组、正则表达式
- 独有的声明周期方法:`activited`、`deactivited`

### 数据类型

- 简单数据类型：`number`、`string`、`null`、`undefined`、`symbol(es6后)`、`bigInt(es6后)`、`boolean`
- 复杂/引用数据类型：object

### isNaN 和 Number.NaN的区别

`isNaN`:

- 只要不是number就会返回 true

```js
isNaN(NaN); // true
isNaN('A String'); // true
isNaN(undefined); // true
isNaN({}); // true
```

`Number.isNaN`:

相当与是isNaN的加强版，弥补了`isNaN`很多的不足。

先判断是否是`number`类型，再判断是否是`NaN`。

```js
Number.isNaN(NaN); // true

Number.isNaN('A String'); // false

Number.isNaN(undefined); // false

Number.isNaN({}); // false
```

### 变量命名方式

小驼峰命名法、大驼峰命名法，变量名应`见名知意`



### vue中子组件能修改父组件的数据吗

不能，因为vue中推嵩的是单向数据流，这样更好清楚数据的流向，但是引用数据类型的数据可以修改，因为修改引用类型是修改它里面的元素，而不是它的地址，但是vue也是不建议我们去修改的， 因为这会让`数据流难以理解`。

通过子组件利用emit去修改父组件里的数据

利用emit去触发父组件里的自定义事件，那个回调的参数就是emit那边传递过来的值。

### 路由的hash和history模式有什么区别

- hash模式：`兼容性更好`、但`不美观`，url上会带有`#`，跳转路由时不会向服务器发送请求。
- history模式：相比hash模式，url更美观，跳转路由时会向服务器发送请求，刷新页面有可能会跳转到404页，因为它会把路由path当作参数向服务器发请求，需要后端配置才能用。

### 小程序的图片高度自适应

```js
<image mode="heightFix"></image>
```

### 多点登录状态限制问题怎么实现

- webSocket:长链接实现
- 设置一个缓存层比如redis存储token，每次登录都生成新的token，会把之前的token覆盖掉，校验的时候从缓存校验一次就可以实现。

### 性能优化

- 代码效率优化
- 网络请求的优化

### 从输入url到回车发生了什么

![img](https://static001.geekbang.org/resource/image/95/5b/9550f050235a9bc0a91dc6e33f7e9e5b.jpg?wh=1920x923)

### 接到需求怎么去拆分

STAR 原则

- Situation（情景）：什么情景下，产生的需求。
- Task（任务）：当时负责的模块。
- Action（行动）：你怎么去做，怎么去排期。
- Result（结果）：结果如何。