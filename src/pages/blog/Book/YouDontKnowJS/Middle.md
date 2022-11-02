---
title: 中卷
description: books
layout: ../../../../layouts/MainLayout.astro
---

### 类型

类型：ECMAScript类型又进一步细分为**语言类型**和**规范类型**。对语言引擎和开发人员开始，类型是值的内部特征，它定义了**值的行为**，以使区别于其他值。

#### 内置类型

JavaScript有八种内置类型：

- 空置（null）
- 未定义（undefined）
- 布尔值（boolean）
- 数字型（number）
- 字符串（string）
- 对象（object）
- 符号（symbol）ES6新增
- 大数值（bigint）ES6新增

function（函数）也是JavaScript的一个内置类型。函数实际上是object的一个**子类型**。具体来说，函数是**可调用对象**，它有一个内部属性[[call]]，该属性使其可以被调用。

- 函数不仅仅是对象，还可以拥有属性。

```js
function a(num1,num2){...}
```

- 函数对象的length属性是其声明的参数的个数：

```js
a.length // 2
```

数组也是object的一个字类型，数组的元素按数字顺序来进行索引（而非像普通对象那样通过字符串键值），其length属性是元素的个数。

##### 值和类型

JavaScript的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。语言引擎不要求变量总是持有其初始值同类型的值。一个变量现在可以被赋值为字符串类型，随后又赋值为数字类型值， 是被允许的。

在对变量进行typof操作时，得到的结果并不是该变量的类型，而是该变量持有的值的类型，因为JavaScript中的变量没有类型。

```js
let a = 'yxz'
typeof a   // string
a = 123
typeof a   // number
```
###### undefined和undeclared

变量在未持有值的时候为undefined，此时typeof为undefined：

```js
let a;
typeof a // undefined
```

大多数人倾向于将undefined等同于undeclared（未声明），但是在JavaScript中它们完全是两回事。

已有作用域中中声明但还没有赋值的变量，是**undefined**。相反，还没有在作用域中声明过的变量是**undeclared**的。

```js
// 例如：
let a;
a   // undefined
b   // RefereceError: b is defined. ===> b就是undeclared
```

#### 小结

- JavaScript有八种数据类型：
  - null
  - undefined
  - object
  - number
  - boolean
  - string
  - symbol （ES6新增）
  - bigInt （ES6新增）

- JavaScript中变量没有类型，但他们持有的值有类型。**类型定义了值的行为。**
- undefined是值的一种，而undeclared则表示变量还没有被声明过。

### 值

数组通过数字进行索引，但有趣的是它们也是对象，所以也可以包含字符串键值金和属性（但这些属性不计算在数组的长度length内）。

```js
const arr = []

a[0] = 1
a['name'] = 'yxz'
a.length. // 1
```

这里有个问题需要注意，如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理。

```js
const arr = []
arr['9'] = 'hey!'
arr.length // 10
```

建议使用对象来存储键值对的数据，用数组来存储数字索引值。

#### 类数组

一些DOM查询操作会返回DOM元素列表，它们并非真正意义的数组，但十分类似（可以使用数组的forEach方法）。另外一个例子是通过**argument**对象（类数组）将函数的参数当作列表来访问（从ES6后废弃）。

工具函数slice(...)经常被用于类数组转换数组：

```js
function foo(){
  const arr = Array.prototype.call(arguments)
  return arr
}
foo('hello','yxz')    //  ['hello','yxz']
```

ES6后可以用Array.from(...)：

```js
function foo(){
  return Array.from(arguments)
}
foo('hello','yxz')    //  ['hello','yxz']
```

```js
Array.from(...)还有非常强大的功能，将在下卷记录。
```

#### 数字的语法

思考一下代码：

```js
// 无效语法！！
42.toFixed(3)   // 报错

// 下面的语法都有效
42..toFixed(3)  // ‘42.000’
(42).toFixed(3) // '42.000'
0.42.toFixed(3)  // '0.420'
```

运算符需要给予特别注意，因为它是一个有效的数字字符，会被优先识别数字字面量的一部分，然后后面的.才是对象属性访问运算符。

42.toFixed(3)是无效语法，是因为42.的.被识别为了数字字符的小数点了，而没有.来访问对象的属性了。

42..toFixed(3)则没有问题，是因为第一个的.被当成数字字符的小数点，第二个.用来访问对象属性。

##### 较小的数值

二进制浮点数最大的问题是会出现精度丢失。

```js
0.1 + 0.2 === 0.3.  // false
```

二进制浮点数的0.1和0.2并不是十分精确的，它们相加的结果并非刚好等于0.3，而是等于0.30000000000000004，则条件判断结果为false。

那么我们应该怎样判断0.1+0.2和0.3是否相等？

最常见的方法是设置一个**误差范围**，通常称为机器精度，对JavaScript的数字来说，这个值通常是2^-52。

我们可以使用Number.EPSOLON来比较乐观数字是否相等（在指定的误差范围内）。

```js
function numbersToEqual(n1,n2){
  return Math.abs(n1-n2) < Number.EPSOLON
}
let a = 0.1 + 0.2
let b = 0.3
numbersToEqual(a,b)   // true
```

##### 整数检测

要检测一个值是否是整数，可以使用ES6中的Number.isInteager(...)方法。

```js
Number.isInteager( 42 )  // true
Number.isInteager( 42.00 )  // false
```

以下是它的polyfill版本：

```ks
if(!Number.isInteger){
  Number.isInteager = function(num){
    return typeof num ==='number' && num % 1 === 0
  }
}
```

#### 特殊数值

JavaScript数据类型中有几个特殊的值需要我们小心使用。

##### 不是值的值

undefined类型只有一个值，即undefined。null类型也只有一个值，即null。**它的名称即是类型也是值。

undefined和null常用来表示**空值**或**不是值**的值。

- null指空值
- undefined指没有值

或者

- null表示曾经赋过值，但现在没有值
- undefined表示从来没有赋值过

> 注意：null是一个特殊的关键字，不是标识符，我们不能将其当作变量名来使用，而undefined则是一个标识符，可以用来当作变量使用，但最好不要！

##### void运算符

undefined是一个内置标识符（除非被重新定义），它的值为undefined，通过void运算符可以得到该值。

表达式void_没有返回值，因此返回结果会是undefined。void并不改变表达式的结果，只是让表达式不返回值。

```js
let a = 42
console.log(void a, a)  // undefined 42
```

void运算符在某些场景或许用得上，比如不让表达式返回任何结果（即使其有副作用）。

```js
function foo(){
  if(!APP.ready){
    return void setTimeout(foo,3000)
  }
  let res
  return res
}

// 准备好了吗！？
if(foo()){
 // 执行一些其他操作...
}
```

此处用了setTimeout函数，它会返回一个定时器的唯一标识符，可用来清除定时器。此时用void标识符是为了让setTimeout这个函数没有返回值。

我们也可以这样来实现同样的效果：

```js
if(!APP.ready){
  setTimeout(foo,3000)
  return 
}
```

##### 特殊的数字

###### 不是数字的数字

如果数字运算的操作不是数字类型（或者无法解析为常规的十进制或十六进制数字），就无法返回一个有效的数字，这种情况下返回值为**NaN**。

NaN意思是指“不是数字的数字”，或许叫它为“无效数值”、“失败数值”或“坏值”会更加准确些。

```js
let a = 2 / 'hello'  // NaN
type a === 'number'  // true
```

我们可以看到，不是数字的数字 也是数字类型！NaN是一个警戒值，用于指出数字类型中的错误情况，即**执行数学运算没有成功，这是失败的返回值**。

```js
let a = 2 / 'hello'
a == 'NaN'  // false
a === 'NaN'  // false
```

NaN是一个特殊值，它和自身不想等，是唯一一个非自反的值。即`NaN !== NaN`。

既然无法准确去判断哪些值是NaN，我们可以通过什么方法去判断呢？

1. isNaN：（全局对象window下的isNaN） 存在缺陷！

```js
let a = 2 / 'yxz'
let b = 'hello'
window.isNaN(a)   // true
window.isNaN(b)  // true !!!!
```

很显然“hello”不是一个数字，但是它也不是一个NaN，它是一个字符串。

2. Number.isNaN ：（Number下的isNaN）

以下是polyfill版本的Number.isNaN：

```js
if(!Number.isNaN){
  Number.isNaN = function(n){
    // 仅仅是数字类型再去做判断
    return typeof n === 'nubmer' && window.isNaN(n)
  }
}

let a = 2 / 'yxz'
let b = 'hello'
Number.isNaN(a)   // true
Number.isNaN(b)  // false 解决！
```

#### 值和引用

引用就像一种特殊的指针，是来指向变量的指针。如果参数不声明为引用的话，参数值总是通过值复制的方式传递，即便对复杂的对象值也是如此。

JavaScript中没有指针，引用的工作机制也不尽相同。在JavaScript中变量不可能成为指向另一个变量的引用。

JavaScript中引用指向的值。如果一个值有十个引用，这些引用指向的都是同一个值，它们互相之间没有引用/指向关系。

JavaScript对值和引用的赋值/传递在语法上没有区别，完全根据值的类型来决定。

下面是一个例子：

```js
let a = 2
let b = a  // b是a的一个复本
b++
a // 2
b // 3

const arr = [1,2,3]
const arr1 = arr
arr.push(4)
arr  // [1,2,3,4]
arr1  // [1,2,3,4]
```

- `简单值`（即简单数据类型），总是通过**值复制**的方式来赋值/传递的，包括null、undefined、字符串、数字、布尔值和ES6中的symbol。
- `复合值`（引用数据类型），对象、数组、封装对象和函数，则总是通过**引用复制**的方式来赋值/传递的。

思考以下代码：

```js
function foo(x){
  x.push(4)
  x // [1,2,3,4]
  x = [7,8,9]
  x.push(10)
  x // [7,8,9,10]
}
const a = [1,2,3]
foo(a)
a // [1,2,3,4]
```

我们向函数传递a的时候，实际是将引用a的一个复本赋值给foo函数的参数x，而a仍然指向[1,2,3]。在函数中我们通过引用x来修改数组的值`x.push(4)`之后变成了[1,2,3,4]。但`x = [4,5,6]`并不影响a的指向，所以a仍然指向[1,2,3,4]。

我们不能通过引用a来修改a的指向，只能更改a和x共同指向的值。如果我们要将a的值变为[7,8,9,10]，必须更改x指向的数组，而不是为x赋值一个新的数组。

```js
function foo(x){
  x.push(4)
  x // [1,2,3,4]
  // 先清空数组
  x.length =0
  x.push(7,8,9,10)
  x // [7,8,9,10]
}
const a = [1,2,3]
foo(a)
a // [7,8,9,10]
```

> 我们无法自行决定使用值复制函数引用复制，一切由值的类型来决定。

如果通过值复制的方式来传递复合/引用值（如数组），就需要为其常见一个复本。

```
foo(a.slice())  // 先创建一个复本，再传递给foo函数
```

slice( ... )不带参数会返回当前数组的一个浅复本（浅拷贝）。

赋值/参数传递是通过引用还是值复制完全由值的类型决定，所以使用哪种类型也间接决定了赋值/参数传递的方式。

#### 小结

- null类型只有一个值null，undefined类型也是只有一个值undefined。所有变量在赋值之前默认都是undefined。void运算符返回undefined。
- 简单数据类型通过**值复制**来赋值/函数参数传递。复杂/引用数据类型通过引用来赋值/传递。

### 原生函数

常见的原生函数有：

- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()   ES6新增

```js
const str = new String('hello!')
typeof str  // Object，并不是string
str instanceof string. // true
Object.prototype.toString( str ) // [Object String]
```

通过new String('hello')创建的字符串'hello'是**封装对象**，而非基本类型值"hello"。

#### 封装对象包装

封装对象扮演着十分重要的角色。由于基本数据类型没有`.length`和`.toString`这样的属性和方法，需要通过封装对象才能访问，此时JavaScript会自动为基本类型包装一个封装对象。

```js
// 例:
let a = 'JavaScript'
a.length. // 9
a.toUpperCase()  // JAVASCRIPT
```

如果需要经常用到这些字符串属性和方法，比如在for循环中使用`i<a.length`，那么从一开始就创建一个封装对象也许更为方便，这样JavaScript引擎不用每次自动创建了，但实际证明这并不是好办法，因为浏览器已经为`.length`这样的常见的情况做了性能优化，直接使用封装对象来**提前优化**代码反而会降低执行效率。

#### 拆封

如果想要得到封装对象的基本类型值，可以使用`valueOf`函数。

```js
let a = new String('abc')
let isLoad = new Boolean(true)
let num = new Number(123)

a.valueOf()  // abc
isLoad.valueOf()  // true
num.valueOf()  // 123
```

在需要用到封装对象中的基本类型值的地方会发生隐式拆封:

```js
let a = new String('hey')
let b = a + '!!!'
b // hey!!!

typeof a // Object
typeof b // String
```

#### 原生原型

根据文档约定，我们将String.prototype.YXZ简写成String#YXZ，对其他.prototype也同样如此。

- String#indexOf( ... )

在字符串中找到指定子字符串的位置。

- String#charAt( ... )

获得字符串指定位置上的字符。

- String#substr( ... )、String#subString( ... ) 和 String#slice( ... )

获得字符串的指定部分

- String#toUpperCase( ... ) 和 String#toLowerCase( ... )

将字符串转换为大写/小写。

- String#trim( ... )

去掉字符串前后的空格，返回新的字符串。

以上方法都不改变原字符串，返回新的字符串。

```js
typeof Function.prototype.  // function
Function.prototype.  // 空函数！

RegExp.prototype. // '/(?:)/'  空正则表达式

// 我们甚至可以去修改它们
Array.isArray(Array.prototype)   // true
Array.prototype.push(1,2,3)  // 3
Array.prototype // [1,2,3]
```

> 注意：Function.prototype是一个函数、RegExp.prototype是一个正则表达式，而Array.prototype是一个数组。

#### 小结

对于简单基本类型值，比如`'abc'`，如果要访问它们的`length`属性或`String.prototype`方法，JavaScript引擎会自动对该值进行封装(即用相应类型的封装对象来包装它)来实现对这些属性和方法的访问。

### 强制类型转换

将值从一种类型转换成另一种类型通常称为**类型转换**，这是显式的情况；隐式的情况被称为**强制类型转换**。

> 强制类型转换总是返回标量基本类型值，如字符串、数字、布尔值，不会返回对象和函数。

类型转换发生在`静态类型语言`的**编译阶段**，而`强制类型转换`则发生在动态语言的**运行时**。

```js
let a = 42
let b = a + ''  // 隐式类型转换
let c = String(a)  // 显式类型转换
```

#### ToString

数组的默认toString()方法经过重新定义，将所有单元字符串话以后在用','连接起来：

```js
let a = [1,2,3]
a.toString()   // '1,2,3'
```

#### JSON字符串化

JSON.stringify( ... )在对象中遇到`undefined`、`function`、`symbol`会自动将其忽略，在数组中则会返回null (以用来确保单元位置不变)。我们可以利用JSON.stringify()方法的第二个参数来自定义逻辑，第二个参数上一个函数，每次执行json化的时候都会执行一次这个函数，函数第一个参数上key。

> 如果对象中定义了toJSON(..)方法，JSON方法字符串化会首先调用该方法，然后用它的**返回值**来进行序列化。

```js
const obj = {
  a:1,
  toJSON(){
    return this.a
  }
}

JSON.stringfiy(obj)   // '1'
```

#### ToNumber

`true`转换为`1`，`false`转换为`0`。`undefined`转换为`NaN`，`null`转换为0。ToNumber对字符串的处理基本遵循数字常量的相关规则/语法。处理失败时返回`NaN`。

为了将值转换为相应的基本类型，抽象操作ToNumber会首先检查该值是否有`valueOf`方法，如果有并且返回基本数据类型，就使用该值进行强制类型转换。如果没有就使用`toString()`的返回值（如果存在）来进行强制类型转换。

如果`valueOf()`和`toString()`均不返回基本数据类型，则会产生TypeError错误。

从ES5开始，使用Object.create(null)创建的对象[[prototype]]属性为null，并且没有`valueOf()`和`toString()`方法，因此无法进行强制类型转换。

```js
const obj = {
  valueOf(){
    return 'hello'
  }
}

Number(obj)  // 'hello'
```

#### ToBoolean

以下这些是假值：

- undefined
- null
- false
- +0、-0和NaN
- ""

假值的布尔类型都为false。

> 所有对象都是真值，我们可以理解为假值列表以为都为真值。

#### 奇特的~运算符

源自早期的计算机科学和离散数学：**～**返回2的**补码**。

~x大致等同于`-(x+1)`。

```js 
~42    // -(42+1)  ===> -43
```

那么`~`运算符有什么运用场景呢？

```js
let a = 'Hello World'

if(a.indexOf('lo') >=0){
  // 证明找到
}

if(a.indexOf('lo') !== -1){
  // 证明找到
}

if(a.indexOf('ol') <= 0){
  // 没有找到
}

if(a.indexOf('ol') >= -1){
  // 没有找到
}
```

`>= 0`和`== -1`这样的写法并不是很好，称为**抽象渗漏**，意思是在代码中暴露了底层的实现细节，这里是指用-1作为失败时的返回值，这些细节应该被屏蔽掉。

```js
let a = 'Hello World'

~a.indexOf('lo')   // -4  真值！

if(~a.indexOf('lo')){
  // true
}

if(!~a.indexOf('lo')){
  // false
}
```

#### 显式转换为布尔值

显式强制类型转换为布尔值最常用的方法是`!!`，因为第二个`!`会把结果反转回原值。

```js
let a = 'yxz'
let b = ''

!!a. // true
!!b. // false
```

建议使用`Boolean(...)`和`!!`来进行显式转换以便让代码更清晰易读。

#### 字符串和数字之间的隐式强制类型转换

看看以下代码：

```js
const a = [1,2,3]
const b = [2,3,4]

a + b  // '1,23,4'
```

a和b都不是字符串，但是它们都被转换为字符串然后进行拼接了，为什么呢？

因为数组的`valueOf()`操作无法得到简单数据类型，于是它转而调用了`toString()`。因此上例中的两个数组转而调用了`toString()`方法变成了`'1,2,3'`和`'2,3,4'`，然后进行拼接久得到字符串的`1,23,4`了。

> 有个坑，即 [ ] + {} 和 {} + [] ，它们返回不同的结果，分别是"[Object Object]"和0.

#### 隐式强制类型转换为布尔值

以下情况会发生布尔值隐式强制类型转换。

- `if(...)`语句中的条件判断表达式。
- `for(..;..;..)`语句中的第二个条件判断表达式。
- `while(..)`和`do..while(..)`循环中的条件判断表达式。
- `?:`中的条件判断表达式。
- `&&`和`||`左边的操作数。

##### &&和||

它们的返回值是两个操作数中的一个(且仅一个)。即选择两个操作数中的一个，然后返回它的值。

&&和||返回的不一定是布尔类型，而是两个操作数其中一个的值。

```js
let a = 22
let b = 'abc'
let c = null
a || b   // 22
a && b   // 'abc'

c || b. // 'abc'
c && b  // null
```

> a || b 与 a ? a : b大致相同，是因为它们的返回结果是一样的，但是却有一个细微的差别。在a ? a : b中，如果a是一个复杂一些的表达式(比如有副作用的函数调用)等，它有可能会被执行两次(如果第一个结果为真)，而在 a || b 中的a只执行一次，其结果用于条件判断和返回结果（如果适用的话），a && b 和 a? b : a也是如此。

#### 抽象相等

- NaN不等于NaN
- +0等于-0

两个对象指向同一个值时视为相等，不发生强制类型转换。所以实际上在比较两个对象是否相等时，== 和 === 的工作原理是一样的。

###### 1、字符串和数字之间的相等比较

```js
let a = 42
let b = '42'

a === b. // false
a == b // true
```

- 如果Type(x)是数字，Type(y)是字符串，则返回`x == ToNumber(y)`的结果。
- 如果Type(x)是字符串，Type(y)是数字，则返回`ToNumber(x) == y`的结果。

###### 2、其他类型和布尔类型之间的相等比较

== 最容易错误的地方是`true`和`false`与其他类型之间的相等比较。

```js
let a = '42'
let b = true

a == b. // false
```

a转化为布尔值是true，而b也是true，为什么会返回false呢？看看以下转换规则！

- 如果Type(x)是布尔类型，则返回ToNumber(x) == y 的结果。
- 如果Type(y)是布尔类型，则返回x == ToNumber(y)的结果。

以上例子的b是布尔类型，true转换为number类型为1，然后'42' == 1，然后再a再转换为number的42，最后对比结果是 42 == 1，很显然结果是false。

> == 如果两边都是布尔类型，都会被转换为数字类型，true ===> 1， false ===> 0。

###### 3、undefined和null之间的转换

null和undefined之间的 == 也涉及到隐式强制类型转换。

- 如果x 为null，y为undefined，则结果为 true。
- 如果x 为undefined，y 为 null，结果也为true。

在 == 中null和undefined相等(它们于自身也相等)，除此之外其他值都不和它们两个相等。

###### 4、对象和非对象之间的相等比较

- 如果Type(x)是字符串或数字，Type(y)是对象，则返回x == ToPrimitive(y) 的结果。
- 如果Type(x)是对象，Type(y)是字符串或数字，则返回ToPrimitive(x) == y 的结果。

> ToPrimitive抽象操作的所有特性(如：toString(...)、valueOf(...))，如果需要自定义**valueOf(...)**以便从一个复杂的数据结果返回简单值来进行相等比较，这个特性会很有用。

#### 比较少见的情况

思考下面代码的if条件是否会有可能会成立！？

```js
if(a===2 && a===3){
  console.log('什么鬼!?')
}
```

可能我们第一次看到的时候觉得这是不可能会执行的，因为a不和同时等于2和3。但同时一次并不准确，因为`a ===2` 是在 `a===3`之前执行的，所以我们可以在读取a的值的时候做一些手脚！

```js
let i = 2

Number.prototype.valueOf = function (){
  return i++
}

let a = new Number(2)

if(a===2 && a===3){
  console.log('什么鬼!?')   // 执行！！！
}
```

还有一种极端情况：`[] == ![]`，返回的是`true`，根据ToBoolean规则，它会进行布尔值的显式强制类型转换。所以 `[] == ![] `===>` [] == false `===> `0 == false` ===> `false == false`，所以返回true。

#### 安全运用隐式强制类型转换

- 如果两边的值都有`true`或者`false`，千万不要用 ==。
- 如果两边的值中有`[]`、`""`或者`0`，尽量不要使用 ==。

隐式强制类型转换在部分情况下是很危险的，这时为了安全起见就要用`===`。

> 有一种情况下强制类型转换是绝对安全的，那就是**typeof**操作。typeof总是返回七个字符串之一，其中没有空字符串。所以在类型检查过程中不会发生隐式强制类型转换。typeof x == "function"是100%安全的，和typeof x === 'function'是一样的。

#### 小结

- 显式强制类型转换明确我们哪里发生了类型转换，有助于提高代码可读性和可维护性。
- 隐式强制类型转换则没有那么明显，是其他操作的副作用。感觉上好像是显式强制类型转换的反面，实际上隐式强制类型转换也有助于提高代码的可读性。

### 语法

#### 语句和表达式

语句相当于句子，表达式相当于短句，运算符则相当于标点符号和连接词。表达式可以返回一个结果值。

```js
let a = 3 * 6
let b = a
b
```

`Let b = a `称为**声明语句**，因为它们声明了变量(还可以为其赋值)。`a =  3 * 6` 和 `b = a`(不带let)叫做**赋值表达式**。

##### 语句的结果值

如果你平常使用的`chrome`开发控制台题调试过代码，应该会看到很多语句的返回值都显示undefined，只是我们可能从未探究过其中的原因。**其实控制台中显示的就是语句的结果值**。

比如代码块`{...}`的结果值是其最后一个语句/表达式的结果。例如：

```js
let b;
if(true){
  b = 4 + 48
}
```

在控制台中输入以上代码应该会显示52，即返回最后一个语句的结果值。

但是以下代码无法运行：

```js
let a,b;
a = if(true){
  b = 4 + 48
}
```

因为语法不允许我们获得语句的结果值并将其赋值给另外一个变量。可以使用万恶的`eval`()来获得结果。

```js
let a,b
a = eval('if(true) {b =4 + 48}')
```

##### 表达式的副作用

最常见的有副作用的(当然也有可能没有)的表达式是**函数调用**。

```js
let a = 1
function foo (){
  a = a + 1
}
foo()   // 返回值是undefined  副作用是a的值被改变了
```

回顾到上次提到的  `[] + {} `和 `{} + []`的结果是不一样的。

前者，{}出现在+运算符表达式中，因此它被当作一个值(空对象)来处理，我们知道`[]`会通过toString被转换成`''`，而`{}`则会被强制类型转换为`[Object Object]`。

后者，`{}`被当作一个独立的代码块(不执行任何操作)。代码块结尾不需要分号，所以这里不存在语法上的问题。最后+ []将`[]`显示强制类型转换为0。

##### else if 和 可选代码块

很多人误以为JavaScript中有**else if**，因为我们可以这样写代码：

```js
if(a){
  ...
}else if(b){
  ...
}else{
  ...
}
```

事实上JavaScript中没有else if ，但if 和else 只包含单条语句的时候可以省略代码块的`{}`。

```js
if(a)  console.log('hello') // 当if代码块只有一条语句时可以省略代码块{}
```

else也是如此，所以我们经常用到的else if 实际上是这样的:

```js
if(a){
  ...
}else{
  if(b){
    ...
  }else{
    ...
  }
}
```

##### try...finally

finally中的代码总是会在try之后执行，如果有catch的话则在catch之后执行。也可以将finally中的代码看作一个**回调函数**，**即无论出现什么情况最后一定会被调用**。

```js
function foo (){
  try{
    return 42
  }finally{
    console.log('hey')
  }
  console.log('不会执行到这里！')
}
console.log(foo())
// hey
// 42
```

这里return 42 先执行，并将`foo()`函数的返回值设置为42，然后try执行完毕，接着执行finally。最后foo()函数执行完毕，console.log( ... )显示返回值。

```js
function foo(){
  try{
    throw 42
  }finally{
    console.log('hey')
  }
  console.log('不会执行到这！')
}

console.log(foo())
// hey
// Uncaught Exception:42
```

如果try里面抛出异常(无论是有意的还是无意的)，函数就会在此处终止。如果此前`try`中已经有return设置了返回值，则该值会**被丢弃**。

`continue`和`break`也是如此：

```js
for(let a=0;i<10;i++){
  try{
    continue;
  }finally{
    console.log(i)
  }
}
// 0 ~ 9
```

continue在每次循环之后，会在`i++`之前就执行`log`，所以结果是0~9，而非是1~10。

`finally`会覆盖`try`中的返回值：

```js
function foo(){
  try{
    return 42
  }finally{
    return
  }
}

console.log(foo())  // undefined
```

##### switch

switch可以把它看作if...else if ...else的简化版本：

```js
switch(a){   // ===> 这里用的是严格匹配
  case 2:
    // ...
    break
  case 3:
    // ... 
    break
  default:
    // ...
}
```

这里`a`和`case`进行逐一匹配，如果匹配就执行该case中的代码，直到`break`或者switch代码块终止。

`a` 和 `case` 表达式的匹配算法与 `===`相同。但是通常case语句中的switch都是简单值，所以并没有什么问题。

但是有时候我们需要通过强制类型转换来进行相等比较(==)。这时候我们可以这样处理：

```js
let a = '42'

switch(true){
  case a == 10:
    console.log('10')
    break
  case a == 42:
    console.log('42')
    break
  default:
    // 不会执行到这里！
}

// '42'
```

尽管可以使用`==`，但switch中的`true`和`false`仍然是严格相等比较的。即如果`case`表达式的结果为真值，但不是严格意义上的`true`，则条件不成立。所以这里使用`&&`或者`||`就很容易掉进坑里！

```js
let a = 'hello'
let b = 10

switch(true){
  case (a || b) == 10:
    // 永远执行不到这里！
    break
  default:
    console.log('defalut')
}
```

因为`(a || b) == 10`的结果是`'hello'`，而非true，所以严格相等比较不成立，此时可以通过强制类型转换返回true或false，比如`case !!(a || b) == 10`。

#### 小结

- `{}`在不同情况下的意思不尽相同，可以说`语句块`、`对象常量`、`解构赋值`或者`命名函数参数`。
- JavaScript中有很多错误类型，分为两大类：
  - 早期错误(编译时错误，无法被捕获)
  - 运行时错误(可以通过`try...catch`来捕获)

- 所有语法错误都是早期错误，程序有语法错误则无法运行。
- 尽量不要使用`arguments`，如果非用不可，也切勿同时使用arguments和其对应的命名参数。

