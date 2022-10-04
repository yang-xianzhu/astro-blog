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


## vue

## TypeScript进阶

## React