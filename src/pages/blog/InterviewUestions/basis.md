---
title: 前端基础
description: Lorem ipsum dolor sit amet - 2
layout: ../../../layouts/MainLayout.astro
---

### Objcet 的 keys 是无序的吗

- 在**ES6 之前**Object 的键值对是**无序**的。
- 在**ES6 之后**Object 的键值对按照**自然数**、**非自然数**和**Symbol**进行排序，自然数是按照**大小升序**进行排序，其他两种都是按照**插入的时间顺序**进行排序。

### async、defer、module、nomodule 的区别

**script**标签的**async**和**defer**属性可以控制脚本的加载方式和行为。**async**属性可以异步下载**JavaScript**资源，但会在下载后立即执行，因此仍然可能会阻塞渲染。**defer**属性可以延迟脚本的执行，直到 DOM 准备完成，因此可以防止脚本阻塞解析和渲染。

最佳实践：建议所有**外链脚本**都默认设置此属性，因为它不好阻塞 HTML 解析，可以并行下载 JavaScript 资源，还可以按照它们在 HTML 中的相对顺序执行，确保有依赖关系的脚本运行时，不会缺少依赖。

在`SPA`的应用中，可以考虑把所有的`script`标签加上`defer`属性，并且放到`body`的最后面。在现代浏览器中，可以并行下载提升速度，也可以确保在老浏览器中，不阻塞浏览器解析 HTML，起到降级的作用。

注意：

- `defer`属性仅适用于`外部脚本`,如果`scrpit`脚本没有`src`，则会忽略`defer`特性。
- `defer`属性对模块脚本`scrpit type = 'module'`无效，因为模块脚本就是以`defer`对形式加载的。

**async**

- 不阻塞浏览器解析 HTML，但是`script`下载完成后，会立即中断浏览器解析 HTML，并执行此`script`。
- 会并行下载 JavaScript 资源。
- 互相独立，谁先下载完，谁先执行，`没有固定的先后顺序`，`不可控`。
- 由于没有确定的执行时机，所以在脚本里面可能或获取不到 HTML 中已有的元素。
- `DOMContentLoaded`事件和`script`脚本无相关性，无法确定它们的先后顺序。
- 适用于：`独立的第三方脚本`。

`async`和`defer`最大的区别是它们的`执行时机`。

**type='module'**和**nomodule**属性是特定于发送到浏览器的**ES6**模块。当使用**type='modlue'**时，浏览器会期望这些脚本的内容包含**ES6**模块，并将延迟这些脚本的执行，直到默认构建好**DOM**。相反的，**nomodule**属性会向浏览器表示当前脚本不使用 ES6 模块。

### for 和 forEach 的区别

for 可以用 break 来终止循环，可以修改索引改变循环次数，forEach 不能修改索引来左右它的循环次数,不能终止循环。

`for in` 和 `for of`循环区别:

- for in 用于遍历对象的键(key),for in 会遍历所有自身的和原型链上的可枚举属性。如果是数组，for in 会将数组的索引(index)当做对象的 key 来遍历，其他的 object 也是一样的。for of
- 引入的语法，用于遍历所有迭代器 iterator，其中包含 HTMLCollection，NodeList,Array,Map,Set,String,TypedArray,arguments 等对象的值

数组方法`forEach`和`map`的区别

- forEach 没有返回值，map 有返回值
- map 满足条件的返回当前项

### 数组扁平化

- 递归

```js
const arr = [1, 2, 3, [10, 20, 30, [500, 600, 800]]];
function flatten(arr) {
  let res = [];
  if (Array.isArray(arr)) {
    for (const k of arr) {
      if (Array.isArray(k)) {
        res = res.concat(flatten(k));
      } else {
        res.push(k);
      }
    }
  }
  return res;
}
const res = flatten(arr);
console.log(res); //  [1, 2, 3, 10, 20, 30, 500, 600, 800]
```

### 统计字符串中字母个数或统计最多的字母数

```js
const str = "sbsassrabsdasdaspppppppp";

const obj = {};

for (let i = 0; i < str.length; i++) {
  if (str[i] in obj) {
    obj[str[i]]++;
  } else {
    obj[str[i]] = 1;
  }
}

const res1 = Object.entries(obj);
let max = 0; // 出现最多的字符串的个数
let maxStr = ""; // 出现个数最多的字符串

res1.forEach((v) => {
  if (v[1] > max) {
    max = v[1];
    maxStr = v[0];
  }
});
```

### new 一个对象的过程

1. 创建一个空对象
2. 将 this 指向这个对象
3. 给这个对象添加属性/方法，执行这个对象里面的方法
4. 返回这个对象 （所以 new 一个对象，不用 return）

### css 布局，左侧宽度最小 150px,最大 25%,右侧自适应

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

### 想调节一下父元素的透明度，但是又不影响子元素的透明度

可以为父元素设置一个透明的背景色

```scss
给父元素加 background: rgba(0,0,0,.5)
```

### iframe 的缺点

iframe 类似于框架，可以在一个页面中嵌入别的页面。

1. 在一个页面中如果利用 iframe 嵌入了多个别的页面，不利于我们管理
2. 在一些小型管理设备，比如手机上可能无法完全显示框架，兼容性不好
3. iframe 是会阻塞页面的加载的，会影响网页的加载速度。
4. 比如 window 的 onload 事件会在页面或者图像加载完成后立即执行，但是如果当前页面当中用了 iframe 了，那还需要把所有的 iframe 当中的元素加载完毕才会执行，这样就会让用户感觉网页加载速度特别慢，影响体验感
5. 代码复杂，不利于 seo 优化，现在的搜索引擎还不能很好的处理 iframe 当中的内容
6. iframe 框架会增加 http 的请求次数

### display 有哪些取值

- `none:` 隐藏 dom 元素，但不占据位置
- `flex:` 开启 flex 布局
- `table:` table 表格
- `block:` 可以将一个行内/行内块元素，转换成块级元素
- `inline-block:` 将块级/行内元素转换成行内块元素

### 使用原生 js 实现点击 dom 添加边框，点击其他 dom 则取消边框

```html
<div id="box">
  <span class="icon">按钮</span>
</div>
```

```js
const box = document.getElementById("box");

box.onclick = function (e) {
  e.stopPropagation();
  const target = e.target;
  if (isIcion(target)) {
    target.style.border = "1px solid red ";
  }
};

function isIcion(target) {
  return target.className.includes("icon");
}

const doc = document;

doc.onclick = function (e) {
  const children = box.children;
  for (let i = 0; i < children.length; i++) {
    if (isIcion(children[i])) {
      children[i].style.border = " none ";
    }
  }
};
```

### const 声明的数组，还能 push 元素吗，为什么

- 因为 push 是给数组追加元素，并不改变该数组的`内存引用`地址
- const 声明的数组是不能重新赋值的

### 什么是原型链

- 当访问一个对象的某个属性时，会先在这个对象本身去查找
- 当这个对象的本身没有这个属性时，会沿着它的`__proto__`原型去找，即它的构造函数的 prototype。
- 直到构造函数原型对象 prototype 的`__proto__`隐式原型上查找。
- 这样一层一层的往上查找就形成了一条链，叫做原型链。（原型链的尽头是`null`）

### 了解哪些 ES6 新特性

- 箭头函数
- 对象解构
- 数组解构
- 扩展运算符
- 新增解决异步编程的方式 `async/await`
- let、const；let 声明变量 const 声明常量 都具有`块级作用域`
- 新增了 class，更便于实现继承
- Object.values
- Object.keys
- proxy
- 装饰器
- 函数默认值

### 单项数据流和双向数据流的理解

- `vue`、`react`都遵循了单向数据流。

- 单向数据流：就好像 vue 里面的 props，父组件流向子组件的数据，子组件里不能直接修改，只能通知父组件来修改，如果是引用数据类型，可以修改里面的属性，但 vue 始终都是不推荐我们去修改的，因为这样会让数据流向不明确。
- 双向数据流：父组件流向子组件的数据，子组件也是可以修改的流向父组件的，叫做双向数据流，如： v-model .sync 修饰符。

### js 中 string 有哪些常用的方法

- split 将字符串切割成数组
- indexOf :查找字符串中有没有包含某些字符，找到就返回它的索引，找不到则返回-1
- includes: 查找字符串中有没有包含某个字符串，找到就返回 true，找不到就返回 undefined
- slice
- `es6新增:` repaceAll

### null 和 undefined 的区别

- null:代表空，（空对象指针），转化为数值时是 0。
- undefined:表示未定义，转化为数值时为 NaN。
  - 一个函数没有返回值，返回的就是 undefined。
  - 访问一个对象里面的属性，当不存在这个属性时，得到的就是 undefined。
  - 一个变量被声明，但未赋值，得到的是 undefined。

### for 循环里定时器输出问题

1. 利用 let 具有局部作用域特点

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

### 函数柯里化

待...

### js 的继承

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

2. 利用 class 实现继承

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

### 前端怎么实现水印效果

1. 显性水印+DOM 元素直接遮盖
2. 显性水印+Canvas
3. 保护程序+DOM 元素直接遮盖
4. Base64 传输
5. 加料的 Base64

### 对闭包的理解

- 闭包是指有权访问另一个函数作用域中变量的函数，优点是`私有化数据`，但又在私有化数据的基础上报`保持数据`，缺点是：使用不恰当会导致`内存泄露`，在不需要的时候，及时把变量设置为`null`。
- 闭包的应用是非常广泛的，比方常见的`防抖`、`节流`、`函数柯里化`，在 vue、react 源码也应用广泛使用。

### 手写实现 forEach

```js
Array.prototype.myForEach = function (callBack) {
  // 先判断this是否是合法的
  if (this === null || this === undefined) {
    throw new TypeError(`Cannot read property 'myForEach' of null`);
  }

  // 判断callback是否合法
  if (Object.prototype.toString.call(callBack) !== `[object Function]`) {
    throw new TypeError(callBack + `is not a function`);
  }

  // 取执行方法的数组对象 和 传入的this对象
  const _arr = this,
    thisArg = arguments[1] || window;
  for (let i = 0; i < _arr.length; i++) {
    callBack(_arr[i], i, _arr);
  }
};
```

### typeof 和 instanceof 的区别

typeof 与 instanceof 都是判断数据类型的方法，区别：

- `typeof`会返回一个变量的基本类型，`instanceof`返回的是一个布尔值。
- instanceof 可以准确的判断`复杂引用数据类型`，但是不能判断`简单数据类型`。
- 而 typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型，除了`function`类型以外，其他的也无法判断。

> 通用检测数据类型，可以采用 Object.prototype.toString，调用该方法，统一返回格式 [ojbect xxx] 的字符串。

```js
// 使用方法
const num = 1;
Object.prototype.toString(num); // [object Number]
```

### 查询某个对象是否有某个属性的方法

```js
const obj = {
  fn: () => {},
  fn1: () => {},
};

const targetFn = "fn"; // 你要查询哪个属性

const res = Object.keys(obj).some((v) => v === targetFn);
console.log(res); // true
```

### splice 和 slice 的区别

- splice 是会改变原数组的，而 slice 不会改变原数组，而是返回一个新数组。
- splice(startIdx,itemNum) startIdx 从索引哪里开始截取，itemNum 截取几个

### 构造函数 和 普通函数 有什么区别

1. 调用方式不一样:
   - 普通函数调用方式：直接调用 person();
   - 构造函数调用方式：需要使用 new 关键字来调用 new person();
2. 作用不一样（构造函数用来`新建实例对象`的）
3. 首字母大小写习惯 ： `构造函数`一般首字母`大写`，更符合命名规范
4. 函数的`this指向`不同
   - 普通函数中的 this，在严格模式下会指向`undefined`,非严格模式下指向`window对象`
   - 构造函数的 this 指向它本身构造出来的`实例对象`；
5. 写法不同

### 伪数组和数组的区别

- 区别：伪数组里面有跟数组一样的 length 属性，可以进行遍历，可以用 for 循环，以及`forEach`，但不能使用数组方法，伪数组是一个普通对象，数组类型是 Array。
- 为什么设置伪数组：伪数组对象的设置目的更多是只让我们`遍历和访问下标`，而不是去添加/删除它的元素。

```js
a.b.c.d  与 a['b']['c']['d'] 哪个性能更高点
答案:
是`a.b.c.d`比`a['b']['c']['d']`性能高些，后者还要考虑`[]`中的变量的情况，再者，从两种形式的结构来看，显然编译器前者要比后者更容易些，自然更快一些.
```

### Set 和 Map 的区别

- `Set`本身是一个构造函数，类似一个数组，但是它里面的成员的值都是唯一的，没有重复的值。
  - set.keys()：返回键名的遍历器
  - set.values()：返回键值的遍历器
  - set.forEach：用于遍历每个成员
- `Map`本质上是键值对的集合（hash 结构），类似于一个对象。但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

  - size 属性：返回 Map 结构的成员总数
  - set 方法：修改成员的值
  - get 方法：得到成员的值
  - has 方法：判断是否有某个成员，返回一个布尔值
  - forEach 方法：遍历每一个成员
  - delete 方法：输出某个成员

  ### ES5 和 ES6 的区别，说几个 ES6 的新增的方法

ES6 代表是 ES6 以后的版本，统称为 ES6。

数组的方法:filter reduce sort map some ervey find findIndex

对象的方法:Object.values Object.keys

扩展运算符/收缩运算符

对象的解构赋值 数组的解构赋值 函数形参的默认值

let 和 const let 是声明变量的 const 常量的

const 声明的引用数据类型，里面的属性、元素可以修改，简单数据类型不可以修改。

它们都具有==块级作用域==

新增了块级作用域

### 使用箭头函数应注意什么/箭头函数和普通函数的区别

- 箭头函数没有自己的 this，this 指向上一级
- 箭头函数的参数如果只有一个可以去掉小括号，如果 return 后面只有一句代码的话可以省略大括号
- 箭头函数没有自己的`arguments`数组，而是继承自父层的`argument`
- 箭头函数没有自己的`prototype`
- 普通函数的 this 指向最后的调用者

### 对象转换数组

Object.keys（）把对象的所有 key 转换成一数组

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
const res = Object.keys(obj); // 返回一个新数组
console.log(res); // ['a','b','c']
```

Object.values() 把对象的所有 values 转换成一数组

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
const res = Object.values(obj); // 返回一个新数组
console.log(res); // ['1','2','3']
```

Object.entries() 把对象转化为数组

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
const res = Object.entries(obj);
console.log(res); // [{a:1},{b:2},{c:3}]
```

### ES6 新特性

- Promise
- async / await
- 箭头函数
- 对象解构 / 数组解构
- Proxy 代理
- Map / Set
- 函数参数默认值
- let / const
- 模板字符串
- symbol
- 模块化
- 指数操作符
- 链操作符
- Promise.any
- Object.values（）
- Bigint
- String.prototype.replaceAll()
- 数字分割符
- 展开运算符

### 手写 call

```js
Function.prototype.myCall = function (ctx) {
  if (typeof this !== "function") {
    throw new Error("Error");
  }
  ctx = ctx || window;
  ctx.fn = this;
  const args = [...arguments].slice(1);
  const res = ctx.fn(...args);
  delete ctx, fn;
  return res;
};
```

### 手写 apply

```js
Function.prototype.myApply = function (ctx) {
  ctx = ctx || window;
  if (typeof this !== "function") {
    throw new Error("Error");
  }
  ctx.fn = this;
  let res;
  if (arguments[1]) {
    res = ctx.fn(...arguments[1]);
  } else {
    res = ctx.fn();
  }
  delete ctx, fn;
  return res;
};
```

### 手写 bind

```js
Function.prototype.myBind = function (ctx) {
  if (typeof this !== "function") {
    throw new Error("Error");
  }
  ctx = ctx || window;
  const _this = this;
  const args = [...arguments].slice(1);
  return function F() {
    if (_this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(ctx, [...args, ...arguments]);
  };
};
```

### 跨域怎么解决

- jsonp
- proxy 反向代理 -- 通常开发阶段，都是用该方法
- iframe 标签 + tomain
- 后端配置`cors`

### css、重绘、重排

- 重排：比如我们操作 dom 改变它的盒子大小等，影响到它的布局，就会引发浏览器的重排机制，重新计算 dom 树、css 样式树，结合生成布局树，重新排版渲染页面，叫做重排。
- 重绘：比如单纯改变一个字体大小的，不影响到它的布局排版，那只会引发浏览器的重绘机制，即重新绘制页面，叫做重绘。
- 细节：引发重排必定会引发重绘，引发重绘不一定会引发重排的。

### js 循环机制的过程；举例说明哪些操作是微任务

因为 js 的特殊性，只能被设置为单线程的，但是为了解决某些比较耗时的任务阻塞到其他任务执行，就有了同步和异步的概念，同步任务在主线程上执行，异步任务暂时挂起，等到有结果了再去执行。

循环过程：代码是从上往下执行，当遇到异步任务，就会开启并推入到任务队列里面，异步又分宏任务和微任务。同步代码立即执行，同步代码执行完了就去看看任务队列里有没有微任务，有就清空微任务，再去处理宏任务，每次都是循环这个过程，叫做事件循环`eventloop`。

### webSocket 使用经验

websocket 是一个`持久化`的协议，相比 HTTP 这种`非持久`的协议来说。

比如一些官网的`人工客服窗口`、`多人协同操作应用`等。

#### img 标签的 title 属性和 alt 属性的作用以及区别？

- title: 元素的值一般作为提示条（tooltip）呈现给用户，在光标于图片上停下后显示出来。
- alt:
  - 全称`alternate`，切换的意思，如果无法显示图像，浏览器将显示 alt 指定的内容。
  - 属性包含一条对图像的文本描述，这不是强制性的，但对无障碍而言，它**难以置信地有用**——屏幕阅读器会将这些描述读给需要使用阅读器的使用者听，让他们知道图像的含义。如果由于某种原因无法加载图像，普通浏览器也会在页面上显示 `alt` 属性中的备用文本：例如，网络错误、内容被屏蔽或链接过期。
  - 如果把这个属性设置为空字符串（`alt=""`），则表明该图像*不是*内容的关键部分（这是一种装饰或者一个追踪像素点），非可视化浏览器在[渲染 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Rendering_engine)的时候可能会忽略它。而且，如果图片加载失败，可视化浏览器会隐藏表示图片损坏的图标。
  - 将图像复制并粘贴为文本，或是将图像的链接保存为浏览器书签时，也会用到此属性。
