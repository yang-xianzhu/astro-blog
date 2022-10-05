---
title: 
description: Lorem ipsum dolor sit amet - 2
layout: ../../layouts/MainLayout.astro
---


## 前端基础
#### for 和 forEach 的区别

for可以用break来终止循环，可以修改索引改变循环次数，forEach不能修改索引来左右它的循环次数,不能终止循环。

`for in` 和 `for of`循环区别:

- for in 用于遍历对象的键(key),for in 会遍历所有自身的和原型链上的可枚举属性。如果是数组，for in 会将数组的索引(index)当做对象的key来遍历，其他的object也是一样的。for of
- 引入的语法，用于遍历所有迭代器iterator，其中包含HTMLCollection，NodeList,Array,Map,Set,String,TypedArray,arguments等对象的值

数组方法`forEach`和`map`的区别

- forEach没有返回值，map有返回值
- map满足条件的返回当前项

#### 数组扁平化

- 递归

```js
const arr = [1, 2, 3, [10, 20, 30, [500, 600, 800]]]
function flatten(arr){
  let res = []
  if(Array.isArray(arr)){
    for( const k of arr ){
      if(Array.isArray(k)){
        res = res.concat(flatten(k))
      }else{
        res.push(k)
      }
    }
  }
  return res
}
const res = flatten(arr)
console.log(res)    //  [1, 2, 3, 10, 20, 30, 500, 600, 800]
```

#### 统计字符串中字母个数或统计最多的字母数

```js
const str = 'sbsassrabsdasdaspppppppp'

const obj = {}

for (let i = 0; i < str.length; i++) {
  if (str[i] in obj) {
    obj[str[i]]++
  } else {
    obj[str[i]] = 1
  }
}

const res1 = Object.entries(obj)
let max = 0  // 出现最多的字符串的个数
let maxStr = ''   // 出现个数最多的字符串

res1.forEach(v => {
  if (v[1] > max) {
    max = v[1]
    maxStr = v[0]
  }
}
)
```

#### new一个对象的过程

1. 创建一个空对象
2. 将this指向这个对象
3. 给这个对象添加属性/方法，执行这个对象里面的方法
4. 返回这个对象  （所以new一个对象，不用return）

#### css布局，左侧宽度最小150px,最大25%,右侧自适应

```scss
<div class="box">
  <div class="left"></div>
  <div class="right"></div>
</div>

<style lang="scss">
.box{
  width:100vw;
  display:flex;
  .left{
    min-width:150px;
    max-width:25%
  }
  .right{
    flex:1
  }
}

</style>
```

#### 想调节一下父元素的透明度，但是又不影响子元素的透明度

可以为父元素设置一个透明的背景色

```scss
给父元素加 background: rgba(0,0,0,.5)
```

#### iframe的缺点

iframe类似于框架，可以在一个页面中嵌入别的页面。

1. 在一个页面中如果利用iframe嵌入了多个别的页面，不利于我们管理
2. 在一些小型管理设备，比如手机上可能无法完全显示框架，兼容性不好
3. iframe是会阻塞页面的加载的，会影响网页的加载速度。
4. 比如window的onload事件会在页面或者图像加载完成后立即执行，但是如果当前页面当中用了iframe了，那还需要把所有的iframe当中的元素加载完毕才会执行，这样就会让用户感觉网页加载速度特别慢，影响体验感
5. 代码复杂，不利于seo优化，现在的搜索引擎还不能很好的处理iframe当中的内容
6. iframe框架会增加http的请求次数

#### display有哪些取值

- `none:`     隐藏dom元素，但不占据位置
- `flex:`       开启flex布局
- `table:`     table 表格
- `block:`      可以将一个行内/行内块元素，转换成块级元素
- `inline-block:`     将块级/行内元素转换成行内块元素

#### 使用原生js实现点击dom添加边框，点击其他dom则取消边框

```html
<div id="box">
  <span class="icon">按钮</span>
</div>
```

```js
const box = document.getElementById('box')

box.onclick = function (e) {
  e.stopPropagation()
  const target = e.target
  if(isIcion(target)){
    target.style.border = '1px solid red '
  }
}

function isIcion (target) {
  return target.className.includes('icon')
}

const doc = document

doc.onclick = function (e) {
  const children = box.children 
  for(let i = 0 ; i < children.length ; i++){
    if(isIcion(children[i])){
      children[i].style.border = ' none '
    }
  }
}
```

#### const声明的数组，还能push元素吗，为什么

- 因为push是给数组追加元素，并不改变该数组的`内存引用`地址
- const声明的数组是不能重新赋值的

#### 什么是原型链

- 当访问一个对象的某个属性时，会先在这个对象本身去查找
- 当这个对象的本身没有这个属性时，会沿着它的`__proto__`原型去找，即它的构造函数的prototype。
- 直到构造函数原型对象prototype的`__proto__`隐式原型上查找。
- 这样一层一层的往上查找就形成了一条链，叫做原型链。（原型链的尽头是`null`）

#### 了解哪些ES6新特性

- 箭头函数
- 对象解构
- 数组解构
- 扩展运算符
- 新增解决异步编程的方式 `async/await`
- let、const；let 声明变量 const 声明常量  都具有`块级作用域`
- 新增了class，更便于实现继承
- Object.values
- Object.keys
- proxy
- 装饰器
- 函数默认值



#### 单项数据流和双向数据流的理解

- `vue`、`react`都遵循了单向数据流。

- 单向数据流：就好像vue里面的props，父组件流向子组件的数据，子组件里不能直接修改，只能通知父组件来修改，如果是引用数据类型，可以修改里面的属性，但vue始终都是不推荐我们去修改的，因为这样会让数据流向不明确。
- 双向数据流：父组件流向子组件的数据，子组件也是可以修改的流向父组件的，叫做双向数据流，如： v-model .sync修饰符。



#### js中string有哪些常用的方法

- split 将字符串切割成数组
- indexOf :查找字符串中有没有包含某些字符，找到就返回它的索引，找不到则返回-1
- includes: 查找字符串中有没有包含某个字符串，找到就返回true，找不到就返回undefined
- slice
- `es6新增:` repaceAll

#### null和undefined的区别

- null:代表空，（空对象指针），转化为数值时是0。
- undefined:表示未定义，转化为数值时为NaN。
  - 一个函数没有返回值，返回的就是undefined。
  - 访问一个对象里面的属性，当不存在这个属性时，得到的就是undefined。
  - 一个变量被声明，但未赋值，得到的是undefined。

#### for循环里定时器输出问题

1. 利用let具有局部作用域特点

```js
// 把var声明改成let声明
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i) //   5 5 5 5 5
  }, i * 1000)
}

// 怎么解决？依次打印1 2 3 4 5 

for(let i = 0; i < 5 ;i ++ ){
  setTimeout((i)=>{
    console.log(i)   //   0 1 2 3 4 
  }，i * 1000,i)
}
```

2. 利用立即执行函数（`IIFE`）

```js
for(var i = 0; i < 5 ;i ++ ){
  setTimeout((i)=>{
    console.log(i)   //   0 1 2 3 4 
  }，i * 1000,i)
}

for(var i = 0; i < 5 ;i ++ ){
  (
    setTimeout((i)=>{
    console.log(i)   //   0 1 2 3 4 
  }，i * 1000,i)
  )(i)
}
```

#### 函数柯里化

待...
#### js的继承

1. 原型如何实现继承

```js
function Person (value){
  this.val = value
}

Person.prototype.getValue = function (){
  console.log(this.val)
}

function Child(value){
  Person.call(this,value)
}

Child.prototype= new Person()

const child = new Child(123)

child.getValue()   // 123
child  instanceif  Person    // true
```

2. 利用class实现继承

```js
class Footer{
  constrictor(value){
    this.val = value
  }
  // 实例方法
  getValue(){
    console.log(this.val)
  }
}

class Son  extends Footer {
  constrictor(value){
    super(value)
    this.val = value
  }
}

const son  = new Son('test')
son.getValue()   // test
Son  instanceif  Footer    // true
```

#### 前端怎么实现水印效果

1. 显性水印+DOM元素直接遮盖
2. 显性水印+Canvas
3. 保护程序+DOM元素直接遮盖
4. Base64传输
5. 加料的Base64 

#### 对闭包的理解

- 闭包是指有权访问另一个函数作用域中变量的函数，优点是`私有化数据`，但又在私有化数据的基础上报`保持数据`，缺点是：使用不恰当会导致`内存泄露`，在不需要的时候，及时把变量设置为`null`。
- 闭包的应用是非常广泛的，比方常见的`防抖`、`节流`、`函数柯里化`，在vue、react源码也应用广泛使用。

#### 手写实现forEach

```js
  Array.prototype.myForEach = function (callBack) {
    // 先判断this是否是合法的
    if (this === null || this === undefined) {
      throw new TypeError(`Cannot read property 'myForEach' of null`)
    }

    // 判断callback是否合法
    if (Object.prototype.toString.call(callBack) !== `[object Function]`) {
      throw new TypeError(callBack + `is not a function`)
    }

    // 取执行方法的数组对象 和 传入的this对象
    const _arr = this,
      thisArg = arguments[1] || window
    for (let i = 0; i < _arr.length; i++) {
      callBack(_arr[i], i, _arr)
    }
  }
```

#### typeof和instanceof的区别

typeof与instanceof都是判断数据类型的方法，区别：

- `typeof`会返回一个变量的基本类型，`instanceof`返回的是一个布尔值。
- instanceof可以准确的判断`复杂引用数据类型`，但是不能判断`简单数据类型`。
- 而typeof也存在弊端，它虽然可以判断基础数据类型（null除外），但是引用数据类型，除了`function`类型以外，其他的也无法判断。

> 通用检测数据类型，可以采用Object.prototype.toString，调用该方法，统一返回格式 [ojbect xxx] 的字符串。

```js
// 使用方法
const num = 1
Object.prototype.toString(num)   // [object Number]
```

#### 查询某个对象是否有某个属性的方法

```js
const obj = {
  fn:()=>{
    
  },
  fn1:()=>{
    
  }
}

const targetFn = 'fn'   // 你要查询哪个属性

const res= Object.keys(obj).some(v=>v===targetFn)
console.log(res)    // true
```

#### splice 和 slice 的区别

- splice是会改变原数组的，而slice不会改变原数组，而是返回一个新数组。
- splice(startIdx,itemNum)   startIdx从索引哪里开始截取，itemNum截取几个

#### 构造函数 和 普通函数 有什么区别

1. 调用方式不一样:
   - 普通函数调用方式：直接调用person();
   - 构造函数调用方式：需要使用new关键字来调用 new person();
2. 作用不一样（构造函数用来`新建实例对象`的）
3. 首字母大小写习惯 ： `构造函数`一般首字母`大写`，更符合命名规范
4. 函数的`this指向`不同
   - 普通函数中的this，在严格模式下会指向`undefined`,非严格模式下指向`window对象`
   - 构造函数的this指向它本身构造出来的`实例对象`；
5. 写法不同

#### 伪数组和数组的区别

- 区别：伪数组里面有跟数组一样的length属性，可以进行遍历，可以用for循环，以及`forEach`，但不能使用数组方法，伪数组是一个普通对象，数组类型是Array。
- 为什么设置伪数组：伪数组对象的设置目的更多是只让我们`遍历和访问下标`，而不是去添加/删除它的元素。

```js
a.b.c.d  与 a['b']['c']['d'] 哪个性能更高点
答案:
是`a.b.c.d`比`a['b']['c']['d']`性能高些，后者还要考虑`[]`中的变量的情况，再者，从两种形式的结构来看，显然编译器前者要比后者更容易些，自然更快一些.
```

#### Set和Map的区别

- `Set`本身是一个构造函数，类似一个数组，但是它里面的成员的值都是唯一的，没有重复的值。
  - set.keys()：返回键名的遍历器
  - set.values()：返回键值的遍历器
  - set.forEach：用于遍历每个成员
- `Map`本质上是键值对的集合（hash结构），类似于一个对象。但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
  - size属性：返回Map结构的成员总数
  - set方法：修改成员的值
  - get方法：得到成员的值
  - has方法：判断是否有某个成员，返回一个布尔值
  - forEach方法：遍历每一个成员
  - delete方法：输出某个成员

#### 对vuex的理解

  vuex是用于`状态集中管理`和`数据共享`的，比如一些用户信息、token一般可以存储在vuex和localStorage，搭配使用。

  五大核心属性

- state   存储数据
- mutations  唯一可以直接修改state里面的数据的地方  `不可以执行异步代码`
- actions     `可以执行异步代码`，用于派发mutations来修改数据，可以在这里发请求
- getters   可以简化我们取vuex里面的数据，比如计算购物车的总价，类似于`计算属性`
- modules  当我们的项目很大的时候，vuex里面的数据多了，就很难去阅读了，可以`分模块`，比如用户信息模块  新闻列表模块等

#### vue中的路由导航守卫

- 全局前置守卫

可以使用`router.beforeEach`注册一个全局前置守卫：

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

当一个导航被触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫`resolve`完之前一直处于`等待中`。

每个守卫方法接受两个参数：

- `to`：即将要进入的目标 用一种标准化的方式
- `from`：当前导航正要离开的路由 用一种标准化的方式
- `next`:**确保 next** 在任何给定的导航守卫中都被**严格调用一次**。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。这里有一个在用户未能验证身份时重定向到`/login`的**错误用例**：

可以返回的值如下：

- `false`：取消当前的导航。如果浏览器的URL改变了（可能是用户手动或者浏览器后退按钮），那么URL地址会重置到`from`路由对应的地址。
- 一个路由地址：通过一个路由地址跳转到一个不同的地址，就像调用`router.push()`一样，你可以设置诸如`repace:true` 或 `name:'home'`之类的配置。当前的导航被中断，然后进行一个新的导航，就和`from`一样。

- 全局解析守卫

可以用`router.beforeResolve`注册一个全局守卫。这和`router.beforeEach`类似，因为它在`每次导航`时都会触发，但是确保在导航被确认之前，`同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用`

`router.beforeResolve` 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

- 全局后置钩子

路由页面`跳转成功之后`执行的一个钩子，这里一般可以用于修改页面标题，声明页面等事情。

- 路由独享守卫

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

`beforeEnter` 守卫 **只在进入路由时触发**，不会在 `params`、`query` 或 `hash` 改变时触发。例如，从 `/users/2` 进入到 `/users/3` 或者从 `/users/2#info` 进入到 `/users/2#projects`。它们只有在 **从一个不同的** 路由导航时，才会被触发。

- 组件内守卫

可以在路由组件内直接定义路由导航守卫(传递给路由配置的)

可配置API

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from,next) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
    next(vm=>{
      console.log(vm)  // vm就可以拿到当前组件实例对象
    })
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

##### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

#### keep-alive的使用

```js
<keep-alive includes="['Son']">  
  // includes 是要指定哪些组件需要缓存，可以写成数组/正则/字符串，与组件里的name配对
  // excludes 指定哪些组件不需要缓存  .....
  // 需要缓存的组件
  <router-view />
</keep-alive>
```

#### 有没有自定义过一些指令

- 一键copy文字
- 图片加载不出来，显示默认图片
- 表单自动获取焦点

#### 跨域怎么解决

- jsonp
- proxy反向代理 -- 通常开发阶段，都是用该方法
- iframe标签 + tomain
- 后端配置`cors`

#### css、重绘、重排

- 重排：比如我们操作dom改变它的盒子大小等，影响到它的布局，就会引发浏览器的重排机制，重新计算dom树、css样式树，结合生成布局树，重新排版渲染页面，叫做重排。
- 重绘：比如单纯改变一个字体大小的，不影响到它的布局排版，那只会引发浏览器的重绘机制，即重新绘制页面，叫做重绘。
- 细节：引发重排必定会引发重绘，引发重绘不一定会引发重排的。

#### js循环机制的过程；举例说明哪些操作是微任务

因为js的特殊性，只能被设置为单线程的，但是为了解决某些比较耗时的任务阻塞到其他任务执行，就有了同步和异步的概念，同步任务在主线程上执行，异步任务暂时挂起，等到有结果了再去执行。

循环过程：代码是从上往下执行，当遇到异步任务，就会开启并推入到任务队列里面，异步又分宏任务和微任务。同步代码立即执行，同步代码执行完了就去看看任务队列里有没有微任务，有就清空微任务，再去处理宏任务，每次都是循环这个过程，叫做事件循环`eventloop`。

#### webSocket使用经验

websocket是一个`持久化`的协议，相比HTTP这种`非持久`的协议来说。

比如一些官网的人工客服窗口等。

## vue

#### v-if和v-show的使用场景

v-if：是通过动态删除和创建整个DOM元素的，相对而言更消耗性能，一般适用于非频繁切换显示/隐藏

v-show：是通过css的display：none来隐藏整个dom元素的，适用于频繁切换的应用场景

v-for和v-if的优先级

通过源码可以知道，当v-for和v-if同时使用在一个标签上，在vue2里v-for的优先级是比v-if高的，vue3中v-if优先级更高。

data、props、methods、watch、computed的优先级

`props` > `methods` > `data` > `computed` > `watch`

computed与watch的应用场景

computed：当多个数据依赖一个数据的时候，用computed，具有缓存性，必须有返回值，因为是依赖计算出来的这个值

watch：当一个数据依赖多个数据的时候，用watch，watch里面可以执行异步代码，computed不行.

#### 生命周期

###### vue2:

`beforeCreate=>created `

 创建前创建完毕，

beforeCreate此时还没有el和data和methods,数据代理还没开始

created此时已经有data和methods了，数据代理也开始了

`beforeMount>mounted`

挂载前挂载完毕

beforeMount可以发送ajax请求，开启定时器、发布订阅等操作了

mounted 此时已经有DOM结构了，可以操作dom，但是不建议这么做

`beforeUpdata==>updated`

数据更新会触发这两个钩子，不能在updated这个钩子函数里面更新数据，这样会一直触发这个函数，会形成死循环。

`beforeDestroy==>destroyed`

beforeDestroy一般在这个钩子上，做一些收尾工作，比如==清除定时器==、==取消订阅==、==清除自定义事件==等.

###### vue3:

beforeDestroy 改为 beforeUnmount

destroyed 改为 unmounted

> vue2中当没有指定el要挂载的元素，beforeCreate和created都会触发
>
> vue3不会

#### 对vue3有了解过吗

vue3中响应式用到了ES6中的 `Proxy` 代理对象，但是对于基本数据类型，还是用了Object.defineProperty来做响应式。

vue3中打包速度和更好支持TS，还有组合式API，数据和方法都整合到了setup函数里面（setup执行时机比beforeCreate还快，setup里面的this -undefined），比传统vue2的optionsApi能够更好更优雅的管理代码，可以把每个功能模块拆成一个hooks模块，需要就引入这个模块。

vue3中的Proxy性能更好，因为proxy侦听的对象本身，而defineProerty是遍历对象的每个属性，在性能消耗方面，vue3性能消耗更低。

由于Proxy，vue3能侦听到数组被修改，而vue2不能，但能通过那其中方法去改变（改变原数组的方法）,都知道，vue2中给对象后新增的属性是丢失了响应式的，而vue3没有，后新增的属性也是响应式的

新增了watchEffect API，它是一个函数，接受一个回调函数，它是非惰性的。在这个函数里面用到了某个数据，当你读取或修改了这个数据，就会被这个函数侦听到，从而触发这个回调函数，就可以在这个会回调里面写一些自定义逻辑了

移除了过滤器：因为像过滤器能实现的，用computed和methods也能实现，用过滤器，反而还有学习成本。

用到的内置api要单独按需引入

```js
例如：import {ref,reactive,watchEffect} from 'vue'
```

更好的浏览器红利

新增了 `ref`、`reactive` 函数

#### vue3中做过哪些性能优化

reatvie与shallowReactive的区分使用场景，当一个数据结构是深层次的，但要做响应式的只有第一层的话，可以用shallowReactive

```js
import { shallowReactive } from 'vue'
exprot default {
  name:'xxx',
  setup(){
    const data = shallowReactive({
      name:'杨某某',
      age:18
    })
    return {data}
  }
}
```

#### vue中nextTick的作用与原理

vue更新页面是采用了异步更新的，如果我们想要获取到最新的DOM，可以用vue给我们提供的nextTick，在它的回调里面可以拿到更新后的DOM元素,但是vue是不推荐我们直接操作DOM的,nextTick底层用了`promise.then`方法，如果浏览器不支持，就会使用`mutationObserver`、`setTimeout`

- nextTick的细节：如果你没有提供回调，它会返回一个`promise对象`，所以可以使用`async`、`await`

- 原理：

  vue更新数据是异步更新的，当发现数据变更，会开启一个队列，推进这个队列，当多次数据变更只会推进一次，这样会减少一些不必要的更新和计算。

#### Vue.use原理 

概念:

如果插件是一个对象，必须提供 `install` 方法

如果插件是一个函数，它会被作为 `install` 方法，install方法调用时，会将Vue构造函数作为参数传入

> 注意:该方法需要在调用new Vue() `之前` 被调用

#### vue中的token持久化存储

vue中存储token，一般像token这样的数据都要做持久化的，我们都知道存储在本地localStorage里面的数据只有在用户主动去清除才会被清除的，是持久的，但是还有一个问题，存储在localStorage里的数据不是响应式的，我们可以也存一份到vuex里，我们可以借助一个插件-- `persistedstate` 来做token持久化。

```js
1、安装
npm i persistedstate
2、导入插件
import persistedstate from 'vuex-persistedstate'
3、使用
modules: {},
plugins: [
  // 使用vuex数据持久化插件
  persistedstate({
    paths: ['tokenObj']
  })
]
```

#### 当修改data时vue的组件重渲染是异步还是同步

vue更新数据是采用了异步策略的。当我们修改了数据，vue会开启一个队列，当多次触发修改数据，也只会被推进这个队列一次，因为这样可以避免不必要的计算更新视图，所以vue给我们提供了一个 `nextTick` 函数，它的回调里面可以拿到最新的dom。

#### vue多组件嵌套通信方式

eventBus 事件总线  `适用于任意组件间通信`

props，从父组件逐层往下传递数据...

消息订阅与发布  需要安装插件

vue2.x后新增的provide与inject

发送方：

```js
import { provide } from 'vue'
provide('事件名',要传递的数据)
```

接收方：

```js
import { inject } from 'vue'
const res = inject('事件名')   // res 得到的就是数据
```

#### this.$off 源码

```js
Vue.prototype.$off = function (event, fn) {
  var vm = this;   // 保存this
  // 当没有传参数，清空所有event事件
  if (!arguments.length) {
    vm._events = Object.create(null);  // 创建一个空对象
    return vm   // 返回这个空对象
  }
  // 当传入的是一个数组，遍历数组里的每一项并清空该事件
  if (Array.isArray(event)) {
    for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
      vm.$off(event[i$1], fn); 
    }
    return vm
  }
  // specific event
  var cbs = vm._events[event];
  if (!cbs) {
    return vm
  }
  if (!fn) {   // 如果没有传入回调函数，则只移除这个回调的监听器
    vm._events[event] = null;
    return vm
  }
  // specific handler
  var cb;
  var i = cbs.length;
  while (i--) {
    cb = cbs[i];
    if (cb === fn || cb.fn === fn) {
      cbs.splice(i, 1);
      break
    }
  }
  return vm
};
```

#### 为什么vue中methods对象this能到data里面的数据---原理

```ts
function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      {
        if (typeof methods[key] !== 'function') {
          warn(
            "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
            "Did you reference the function correctly?",
            vm
          );
        }
        if (props && hasOwn(props, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a prop."),
            vm
          );
        }
        if ((key in vm) && isReserved(key)) {
          warn(
            "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
            "Avoid defining component methods that start with _ or $."
          );
        }
      }
      / bind绑定函数的的this指向vue构造函数 /
      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
}
```



#### vue3的patch打补丁做了些什么

- 对比新旧vNode的tag`标签`有没有改变，没有再对比的`props`有没有改变

```js
// oldVNode 旧节点 newVnode  新节点
function ptach(oldVNode,newVnode){
if(oldVNode.tag === newVnode.tag){
 // 存储旧节点
  const el = oldVNode.el
  // props
  const oldProps = oldVNode.props || {}
  const newProps = newVNode.props || {}
  // 遍历新对象
  for(const key in newProps){
    const oldValue = oldProps[key]
    const newValue = newProps[key]
    // 当新旧的props发生改变了，把最新的props赋值给旧的节点
    if(newVlaue !== oldValue){
      el.setAttribute(key,newValue)
    }
  }
  // 遍历旧对象
  for(const key in oldProps){
    // 如果旧对象没有key
    if(!(key in newProps)){
      el.removeAttribute(key)
    }
  }
  // children
  const oldChildren = oldVNode.children
  const newChildren = newVNode.children
  if(typeof newChildren = 'string'){
  }
}
}
```

#### vue3的细节

- compunted返回的是一个ref对象
- watch不能直接侦听一个字符串/数字，需要侦听的是`ref`对象

#### 函数式组件

- 优点：
  - `函数式组件` 不会有状态，不会有 `响应式数据` ，也没有自己的 `生命周期钩子` 这些东西，所以性能比普通组件性能要好。
  - `函数式组件` 和普通的对象类型的组件不同，它不会被看作成一个真正的组件，我们知道在 `patch` 过程中，如果遇到一个节点是组件的` vnode` ，会递归执行子组件的初始化过程；而函数式组件的 `render` 生成的是普通的 `vnode` ，不会又递归的子组件的过程，因此渲染开销会低很多。

#### computed的细节

```js
computed:{
  a(){
    return 100
  },
  b({a}){   // 入参可以拿到当前组件实例对象
    return a+100
  }
}
```

这样就不会在组件刷新时重新获取`getter`了，这也是性能优化的一种手段。

#### vue3的渲染机制

- 渲染管线：

  从高层面的视角看，Vue组件挂载后发生了如下这几件事：

  - `编译`：Vue模板被编译为了`渲染函数`:即用来返回虚拟DOM数的函数。这一步骤可以通过构建步骤提前完成，也可以通过使用运行时编译器即时完成。
  - `挂载`：运行时渲染器调用渲染函数，遍历返回的虚拟DOM数，并基于它的创建实际的DOM节点。这一步会作为`响应式副作用`执行，因此它会追踪其中所用到的所有响应式依赖。
  - `更新`：当一共依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟DOM树。运行时渲染器遍历这颗新树，将它与旧树进行比较`diff`，然后将必要的更新应用到真实DOM上去。

- 模板 vs 渲染函数：

  Vue 模板会被预编译成虚拟 DOM 渲染函数。Vue 也提供了 API 使我们可以不使用模板编译，直接手写渲染函数。在处理高度动态的逻辑时，渲染函数相比于模板更加灵活，因为你可以完全地使用 JavaScript 来构造你想要的 vnode。

  那么为什么 Vue 默认推荐使用模板呢？有以下几点原因：

  1. 模板更贴近实际的 HTML。这使得我们能够更方便地重用一些已有的 HTML 代码片段，能够带来更好的可访问性体验、能更方便地使用 CSS 应用样式，并且更容易使设计师理解和修改。
  2. 由于其确定的语法，更容易对模板做静态分析。这使得 Vue 的模板编译器能够应用许多编译时优化来提升虚拟 DOM 的性能表现 (下面我们将展开讨论)。

  在实践中，模板对大多数的应用场景都是够用且高效的。渲染函数一般只会在需要处理高度动态渲染逻辑的可重用组件中使用。想了解渲染函数的更多使用细节可以去到[渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html) 章节继续阅读。

- 树结构打平：

  - 当这个组件需要重渲染时，只需要遍历这个打平的树而非整棵树。这也就是我们所说的**树结构打平**，这大大减少了我们在虚拟 DOM 协调时需要遍历的节点数量。模板中任何的静态部分都会被高效地略过。

#### vue渲染流程

`template` 模板 或 `render` 渲染函数转换成 `vnode`虚拟节点，然后通过`mountElement`函数渲染成`element`真实DOM，再 `append(#app)`

> 注意：render渲染函数和template模板最终都会渲染成虚拟节点，但是render函数优先级更高，但是vue更推荐我们使用template模板写法，简单并且可以得益于diff时对于静态节点做静态提升的性能优化。



#### vue中的custom render

- 简介：允许用户自定义目标渲染平台
- 动机：不再局限于浏览器dom平台，可以把vue的开发模型扩展到其他平台。
- 使用：
  - createRennder：创建渲染器
  - 实现渲染接口：
    - createElement：创建元素
    - Insert:插入元素到容器内
    - setElementText:设置元素到文字
    - createtext：创建一个文字
    - parebNode:返回元素到父节点
    - remove：移除元素
    - patchProp:设置props
  - createApp:基于renderer创建app实例
- 原理

## http请求

#### 1、常见状态码

`3开头`：重定向

301:永久重定向

304:协商缓存  // 强缓存

`4开头`

400：请求参数错误

401: 没有权限（资源访问权限）

403：没有权限(token失效)

404: 地址找不到

405:用户在Request-Line字段定义的方法不允许

`5开头`：服务端问题

500：服务器产生内部错误

501：服务器不支持请求的函数

502：服务器暂时不可用，有时是为了防止发生系统过载

503：服务器过载或停止维修

504：关口过载，服务器使用另外一个关口或服务来响应用户，等待时间设定值较长

505：服务器不支持或拒绝请求头中指定的HTTP版本

#### 2、http的理解

HTTP：协议是超文本传输协议，是客户端浏览器或其他程序"请求"与Web服务器响应之间的应用层通信协议

HTTPS：主要是由HTTP+SSL构建的可进行加密传输、身份认证的一种安全通信通道。

#### 3、http与https的区别

- `https` 协议需要到CA申请证书，一般免费证书较小，因而需要一定的费用。
- `http` 是超文本传输协议，信息是明文传输的，https则是具有安全性的ssl加密传输协议。
- `http` 和 `https` 使用的是完全不同的连接方式，用的端口也不一样，前者是`80`，后者是`443`。
- `http` 的连接很简单，是无状态的：https协议是由ssl+http协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

#### 4、三次握手和四次挥手

三次握手是网络客户端跟网络服务器之间建立连接，并进行通信的过程。相当于客户端和服务器之间你来我往的三个步骤

1. 第一次握手是建立连接，客户端发送连接 请求报文，并传送规定的数据包
2. 第二次握手是服务器端表示接收到连接请求报文，并回传规定的数据包
3. 第三次握手是客户端接收到服务器回传的数据包后，给服务器端再次发送数据包。这样就完成了客户端跟服务器的连接和数据传送

#### 四次挥手表示当前这次连接请求已经结束，要断开这次连接

1. 第一次挥手是客户端对服务器发起断开请求
2. 第二次挥手是服务器表示接收到这次断开请求
3. 第三次挥手是服务器表示已经断开连接
4. 第四次挥手是客户端断开连接


```js
// 清理npm缓存
npm cache clean -f
// 安装scss
npm i sass sass-loader dart-sass

// .env.devalopment  开发环境会执行该文件
// .env.production   上线环境会执行该文件

vue.config.js文件下
module.exports = {
 publicPath：'/'  //   /是绝对路径  ./是相对路径 
}
```

- 对于对象后添加的属性，是丢失响应式的，vue监听不到的，但vue提供了api，this.$set/Vue.set，原因是Object.defineProperty的缺陷，对于数组，通过下标修改某个元素也是侦听不到的
- Object.defineProperty做数据劫持是给数据添加getters setters，如果是深结构的数据需要递归深层次遍历添加get set，初始化的时候性能损耗也比较大



#### 什么是跨域？怎么解决跨域？

- 跨域是浏览器为了安全考虑，设置的一个安全策略，`域名`、`端口号`、`协议`有一个不同，都违反了浏览器的同源策略，又称为跨域。
- 解决办法:
  - 利用jsonp，缺点是只支持`get请求`，不支持post请求
  - cors：前端配合后端解决
  - 利用iframe标签：document.domain+iframe的设置
  - 利用基于webpack构建的cli工具配置反向代理：配置proxy，`原理：`是先搭建一个代理服务器，通过代理服务器去访问另一个服务器，然后代理服务器拿到数据后再发送给浏览器，因为同源策略是浏览器与服务器之间的，而服务器与服务器是没有跨域的
  - 使用HTML5 postMessage

#### 强缓存和协商缓存

- 强缓存：不会发送请求到服务器，而是直接从缓存中取
- `http状态码`:200

> 服务端通过设置`Expires`和`Cache-Control`来实现

`Cache-Control`可以组合使用多个指令：

| 指令         | 作用                                                     |
| ------------ | -------------------------------------------------------- |
| public       | 表示响应可以被客户端和代理服务器缓存                     |
| private      | 表示响应只可以被客户端缓存                               |
| max-age=30   | 缓存30秒后过期，需要重新请求                             |
| s-maxage=30  | 覆盖max-age,作用一样，只在代理服务器中生效               |
| no-store     | 不缓存任何响应                                           |
| no-cache     | 资源被缓存，但是立即失效，下次会发起请求验证资源是否过期 |
| max-stale=30 | 30秒内，即使缓存过期，也会使用该缓存                     |
| min-fresh=30 | 希望在30秒内获取最新的响应                               |

- 协商缓存：会发送请求到服务器，通过服务器来告知缓存是否可用
- `http状态码`: 304

> 协商缓存表示如果缓存过期，那么就需要重新发起请求验证资源是否更新，可通过设置HTTP Header的last-modified和ETag来实现



#### 浏览器输入url回车后都发生了什么

1. 通过DNS域名解析出真实的服务器id地址
2. 查找缓存  ===> 浏览器 = 本地 = 路由器
3. 浏览器与目标服务器`建立TCP连接`
4. 浏览器通过http协议发送请求
5. 服务器处理请求
6. 服务器发出一个HTML响应
7. 释放/断开TCP连接
8. 浏览器显示页面
9. 浏览器发送获取嵌入在HTML中的其他内容

#### Cookie

特点：

- `有安全问题`，如果被拦截，就可以获取Session所有信息，然后将Cookie转发就能达到目的。
- 每个域名下的Cookie不能超过`20个`，大小不能超过`4kb`
- Cookie在请求新页面的时候都会发送过去
- Cookie创建成功名称就不能修改
- 跨域名不能共享Cookie

应用场景：

- 最常见的就是Cookie和Session结合使用，将SessionId存储到Cookie中，每次请求都会带上这个SessionId，这样服务器就知道是谁发起的请求
- 可以用来统计页面的点击次数

Cookie都有哪些字段：

- `Name`、`Size`顾名思义
- `value`:保存用户登录状态，应该将该值进行`加密`，`不能使用明文`
- `path`:可以访问此Cookie的路径，比如juejin.cn/editor，只有/editor这个路径下的才可以读取Cookie
- `httpOnly`：表示禁止通过JS访问Cookie，减少XSS攻击
- `secire`：只能在htttps请求携带
- `samesite`：规定浏览器不能在跨域中携带Cookie减少CSRF攻击
- `domain`:域名，跨域或者cookie的白名单，允许一个子域获取或操作父域的cookie，实现单点登录的话会非常有用。
- `Expires`/`Max-size`:指定时间或秒数的过期时间，没设置的话就和`session`一样关闭浏览器就失效。

#### XSS攻击

XSS攻击是一个`代码注入攻击`，通过恶意注入脚本在浏览器运行，然后盗取用户信息。

**造成XSS攻击其实本质还是因为网站没有过滤恶意代码，与正常代码混在一起之后，浏览器没有方法分辨哪些是可信的，然后导致恶意代码也被执行**，然后就可能导致一下情况：

- 页面数据或用户信息被窃取，如DOM、Cookie、localstorage
- 修改DOM，比如伪造登录窗口或在页面生成浮窗广告
- 监听用户行为，比如在登录或银行等站点用addEventListener监听键盘事件，窃取账号密码等信息
- 流量被劫持向其他网站

XSS攻击有三种类型：`存储型`、`反射型`、`DOM型`

- `存储型`：是在有发帖评论等带有数据保存功能的网站的input、textarea将恶意代码提交到网站数据库中，如`<script src="http://恶意网站"></script>`，然后比如在显示评论的页面就会从数据获取，并直接执行这个script标签里的恶意代码
- `反射型`:是攻击者将恶意JS脚本作为用户发送给网站请求的一部分,然后网站又把恶意脚本返回给用户,这时候就会在页面中被执行,比如打开包含带恶意脚本的链接,当打开后会向服务器请求后,服务器会获取URL中的数据然后拼接在HTML上返回,然后执行.它和存储型不同的是不会存储在服务器里
- `基于DOM型`:就是攻击通过一些劫持手段,在页面资源传输过程中劫持并修改页面的数据,插入恶意代码

防范XSS攻击的方法:

- 就是对输入框的内容进行`过滤`或转义符进行`转码`
- 使用`CSP`,就是`白名单`,告诉浏览器哪些外部资源可以加载执行,让即使插入进来恶意代码的也不会执行.或者可以向哪些第三方站点提交数据,开启白名单的方式有两种:
  - 使用meta标签 `<mete http-equiv="Content-Security-Policy"`
  - 设置http头部的`Content-Security-Policy`
- 对一些敏感信息进行保护,在`Cookie`信息中添加`httpOnly`,告诉浏览器在保存Cookie,并且不要对客户端脚本开放访问权限,然后就不能通过document.cookie获取cookie了.
- 使用`验证码`,避免脚本伪装成用户执行一些操作

==HTTP 和 HTTPS协议的区别？==

- `https`协议需要CA证书，费用较高，而`http`协议不需要
- `http`协议是超文本传输协议，信息是明文传输的，`https`则是具有较高的安全性，是`密文`传输的
- 使用不同的连接方式，端口也不同，`http`协议端口是80，`https`协议端口是443
- `http`协议连接很简单，是无状态的，`https`协议是具有`SSL`和`http`协议构建的可进行加密传输、身份认证的网络协议，比`HTTP`更加安全

#### webpack的基本功能

- 代码转化：如TypeScript编译成JavaScript、scss编译成css等
- 文件优化：压缩javascript、css、html代码，压缩合并图片等
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
- 模块合并：在采用模块化的项目有很多模块的文件，需要构建功能把模块分类合并成一个文件
- 自动刷新：监听本地源代码的变化，自动构建，刷新浏览器
- 代码校验：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过
- 自动分布：更新完代码后，自动构建出线上发布代码并传输给发布系统

#### json.stringify的缺点

- 如果是时间对象，stringify后会变成一个时间字符串，不能使用时间对象的方法
- 如果对象里面的属性的值是undefined，或者是方法的话会丢失

#### 怎么解决白屏问题

- 骨架屏
- loading
- 首屏时间较长，如果 `SPA` 单页面可以使用路由懒加载，减少首屏时间。



## TypeScript进阶

## React