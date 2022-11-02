---
title: 上卷
description: books
layout: ../../../../layouts/MainLayout.astro
---

### 作用域是什么

几乎所有编程语言最基本的功能之一，就是能够存储变量当中的值，并且能在之后对这个值进行访问或修改。事实上，正是这种存储和访问变量的值的能力将**状态**带给了程序。

#### 1.1 编译原理

尽管通常将javascript归类为"动态" 或 “解释执行” 语言，但事实上它是一门**编译**语言。但与传统的编译语言不用。它不是提前编译的，编译结果也不能在分布式系统进行移植。

- ##### 分词/词法分析

这个过程会将由字符串分解成（对编译语言来说）有意义的代码块，这些代码块被称为**词法单元**。例如，考虑程序 `var a = 2;`。这段程序通常会被分解成下面这些词法单元： `var、a、2、；`。

> 注意：空格是否会被当作词法单元，取决于空格在这门语言中是否具有意义。

> 分词（tokenizing）和词法分析（Lexing）之间的区别是非常微妙、晦涩的，主要差异在于词法单元的识别是通过**有状态**还是**无状态**的方式进行的。如果词法单元生成器在判断a是一个独立的词法单元还是其他词法单元的一部分时，调用的是有状态的解析规则，那么这个过程就被称为词法分析。

- ##### 解析/语法分析

这个过程是将词法单元流（数组）转换为一个由元素逐级嵌所组成的代表了程序语法结构的书。这个树叫做**“抽象语法树”**（AST）。

- ##### 代码生成

将AST转换为可执行代码的过程被称为代码生成。

抛开具体细节，简单来说就是有某种方法可以将 var a = 2；这个AST转化为一组机器指令，用来创建一个叫做a的变量（包含分配内存），并将这个值存储在a中。

> JavaScript引擎不会有大量的（像其他语言编译器那么多的）时间用来进行优化，因为与其他语言不同，**JavaScript的编译过程不是发生在构建之前的**。
>
> 对于JavaScript来说，大部分情况下编译发生在代码执行前的几微秒（甚至更短）的时间内。
>
> 任何JavaScript代码片段在执行前都要进行编译（通常就在执行前）。

#### 1.2 理解作用域

- **引擎**：从头到尾负责整个Javascript程序的编译及执行过程。
- **编译器**：引擎的好朋友之一，负责语法分析及代码生成等脏活累活。
- **作用域**：引擎的另一个好朋友，主要负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

下面将**var a = 2；**，进行分解

编译器首先会将这段程序分解成**词法单元**，然后将词法单元解析成一个树结构。

1. 遇到var a，编译器会询问作用域是否已经在一个该名称的变量存在于同一个作用域的集合中。如果是，编译器会忽略该声明，继续进行编译；否则它会要求作用域在当前作用域的集合中声明一个新变量，并命名为 a。
2. 接下来编译器会为引擎生成运行时所需的代码。这些代码被用来处理 a = 2这个赋值操作。引擎运行时会首先询问当前作用域，在当前作用域集合中是否存在一个**a**变量。如果是，引擎就会使用这个变量，如果否，引擎就会继续查找该变量，直到找到**全局作用域**为止。

> LHS和RHS的含义是“赋值操作的左侧或右侧”并不一定意味着就是“=”赋值操作符的左侧或右侧。

练习1：

```js
function foo (a){ // 这里实际进行的是LHS操作，a = 2
  console.log(a)  // 这里进行的是 RHS操作，寻找当前作用域有没有a这个变量，没有就往外层找
}
foo(2) // 这里先RHS询问作用域有没有foo变量，并且该变量存储的是否是函数
```

练习2:

```js
function foo (a){
  var b = a
  return a + b
}
var c = foo(2)
```

结果如下：

- R：代表RHS查询
- L：代表LHS查询

![image-20221015120632913](/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JavaScript%E4%B8%8A%E5%8D%B71.1.jpg)

#### 1.3 作用域嵌套

当一个块或函数嵌套在另外一个块或函数中时，就发生了作用域的嵌套。因此，在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中查找，直到找到该变量，或抵达最外层的作用域（也就是全局作用域）为止。

#### 1.4 异常

当引擎执行**LHS**查询时，如果在顶层（全局作用域）中无法找到目标变量，全局作用域中就会创建一个具有该名称的变量，并将其返回给引擎，前提是程序运行在非严格模式下。

> 注意：严格模式会禁止自动或隐式创建全局变量

ReferenceError同作用域判别失败相关，而TypeError则代表作用域判别成功了，但是对结果的操作是非法或不合理的。

### 词法作用域

作用域共有两种工作模型。

- 第一种是最为普遍的，被大多数编程语言所采用的**词法作用域**，
- 第二种是叫做**动态作用域**。仍有一些编程语言在使用（比如Bash脚本、Perl中的一些模式）。

#### 2.1 词法阶段

词法作用域就是定义在词法阶段的作用域。换句话说，词法作用域说由我们在写代码时将变量和块级作用域卸载哪里来决定的，因此当词法分析器处理代码时会保持作用域不变（大部分情况下是这样的）。

- ##### 查找

作用域气泡的结构和互相之间的位置关系给引擎提供了足够的位置信息，引擎用这些信息来查找标识符的位置。

作用域查找会在找到的第一个匹配的标识符时停止。在多层的嵌套作用域中可以定义同名的标识符，这叫做**遮蔽效应**。

> 全局变量会自动成为全局对象的属性（如：浏览器环境下的全局对象window），因此不直接通过全局对象的词法名称，而是间接地通过对全局对象属性的引用对其进行访问。

```js
window.a
```

通过这种技术可以访问那些被同名变量所掩盖的全局变量。但非全局的变量如果被遮蔽了，无论如何都无法访问到。

无论函数在哪里被调用、也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定。

#### 2.2 欺骗词法

**欺骗词法作用域会导致性能下降。**

经过下面分析，会给出原因。

##### 2.2.1 eval

JavaScript中eval(...)函数可以接受一个字符串为参数，并将其中内容视为好像在书写时就存在程序中这个位置的代码一样。换句话说，可以在你写代码中用程序生成代码并运行，就好像代码是写在那个位置一样。

例如：

```js
function foo(str,a){
  eval(str)
  console.log(a,b)
}
var b =2;
foo('var b = 3;',1)  // 1 3
```

eval(...)调用中的“var b = 3;”，这段代码会被当作本来就在哪里一样来处理。

> eval(...)通常被用来执行动态创建的代码，因为像例子中这样动态地执行一段固定字符串组成的代码，并没有比直接将代码就写在那里更有好处。

默认情况下，如果eval(...)中所执行的代码包含有一个或多个声明（无论是变量还是函数），就会对eval(...)所处的词法作用域进行修改。技术上，通过一些技巧可以间接调用eval来使其运行在全局作用域上，并对全局作用域进行修改。无论何种情况，eval都可以在**运行时**修改书写期的词法作用域。

> 在严格模式下，eval在运行时有其自己的词法作用域，意味着其中的声明无法修改所在的作用域。

```js
function foo(str){
  'use strict';
   eval(str);
   console.log(a) // ReferenceError: a is not defined.
}
foo('var a = 2')
```

与eval功能很相似的还有：

- setTimeout
- setInterval

它们的第一个参数可以是**字符串**，字符串的内容可以被解释成一段**动态生成**的**函数**代码。

new Function函数的行为也很类似，最后一个参数可以接受代码字符串，并将其转化为动态生成的函数。这种构建函数的语法比eval要安全一些，但也是**不推荐使用**的。

> 在程序中动态生成代码的使用场景非常罕见，因为它所带来的好处无法抵消性能上的损失。

##### 2.2.2 with

JavaScript中另外一个难以掌握（并且也不推荐使用）用来欺骗词法作用域的功能是**with**关键字。

作用：

```js
var obj = {
  a:1,
  b:2,
  c:3
}
// 一系列赋值操作
obj.a = 3
obj.b = 4
obj.c = 6
// 等同于以下
with(obj){
  a = 3
  b = 4
  c = 6
}
```

注意：

```js
function foo (obj){
  with(obj){
    a = 2
  }
}
var obj1 = {
  a:1
}
var obj2 = {
  b:2
}
foo(obj1)
console.log(obj1.a) // 2

foo(obj2)
console.log(obj2.a) // undefined
console.log(a) // 2 a 被泄漏到全局作用域上了！
```

当我们将obj1传递进去，a = 2 赋值操作找到了obj1.a并将2组赋值给它，这也在后面的console.log(obj1.1)中可以体现。而当obj2传递进去，obj2并没有a这个属性，因此不会创建这个属性，故obj2.a是undefined。

> 注意：这里有一个奇怪的副作用，实际上a = 2赋值操作创建了一个全局变量a。

为什么呢？

with可以将一个没有或多个属性的对象处理为一个完全隔离的词法作用域，因此这个对象的属性也会被处理为定义在这个作用域中的词法标识符。

eval和with的对比：

- eval：如果接受了含有一个或多个声明的代码，就会修改其**所处**的**词法作用域**。
- with：声明实际上是根据你传递给它的对象凭空创建一个**全新的词法作用域**。 

> 注意：另外一个不推荐使用eval和with的原因是会被严格模式所影响（限制）。with被完全禁止，而保留核心功能的前提下，间接或非安全地使用eval也被禁止了。

##### 2.2.3 性能

eval和with会在**运行时**修改或创建全新的词法作用域，以此欺骗嵌套在书写时定义的词法作用域。而JavaScript是在**编译时**对代码做优化。

如果出现了eval或with，所有的优化可能都是无意义的，因此最简单的做法就是完全不做优化。

如果代码中大量使用了eval和with，那么运行起来一定变得非常慢。无论引擎多聪明，试图将这些悲观情况的副作用限制在最小范围内，也无法避免如果没有这些优化，代码会变得非常慢这个事实。

#### 2.3 小结

- 词法作用域意味着作用域是由书写代码时函数声明的位置来决定的。
- 编译的词法分析阶段基本能够知道全部标识符在哪里以及是如何声明的，从而能够预测在执行过程中如何对它们进行查找。

### 函数作用域和块级作用域

#### 3.1 函数中作用域

函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用（事实上在嵌套的作用域中也可以使用）。这种设计方案非常有用，能充分利用JavaScript变量可以根据需要改变值类型的**动态**特性。

但与此同时，如果不细心处理那些可以在整个作用域范围内被访问的变量。可能会带来意想不到的问题。

#### 3.2 隐藏内部实现

为什么**隐藏**变量和函数是一个有用的技术？

如果所有变量和函数都在全局作用域中，当然可以在所有的内容嵌套作用域中访问到它们。但这样会破坏前面提到的**最小特权原则**，因为可能会暴露过多的变量和函数，而这些变量或函数本应该是**私有的**，正确的代码应该是可以阻止对这些变量或函数进行访问的。

###### 规避冲突

**隐藏**作用域中的变量和函数所带来的另外一个好处，是可以**避免同名标识符之间的冲突**，两个标识符可能具有相同的名字但用途却不一样，无意间可能造成**命名冲突**。冲突会导致变量的值被意外**覆盖**。

1. 全局命名空间

变量冲突时一个典型例子存在与全局作用域中。当程序加载了多个第三方库时，如果它们没有妥善地将内部私有的函数或变量**隐藏**起来，就会很容易产生冲突。

这些库通常会在全局作用域中声明一个名字足够独特的变量，通常是一个对象。这个对象呗用作库的命名空间，所有需要暴露给外界的功能都会成为这个对象（命名空间）的属性，而不是将自己的标识符暴露在顶级的语法作用域中。

例如：

```js
const MyReally = {
  author: 'yxz',
  doSomething(){
    ...
  }
}
```

#### 3.3 函数作用域

在任意代码片段外部添加包装函数。可以将内部的变量和函数定义**隐藏**起来，外部作用域无法访问包装函数内部的任何内容。

包装函数的声明以(function...而不是function...开始。函数会被当作**函数表达式**而不是一个标准的函数声明来处理。

> 区分函数声明和表达式最简单的方法是看function关键字出现在声明中的位置。如果是(function...)()或(function(){}())就是函数表达式，否则就是一个函数声明。

##### 3.3.1 匿名和具名

```js
setTimeout(function (){
  // 匿名函数表达式
})
```

匿名函数的缺点：

- 匿名函数在栈追踪中不会显示出有意义的函数名，使得难以调试。
- 如果没有函数名，当函数需要引用自身时只能使用**已经过期**的**argument.callee**引用自身，比如**递归**中。另外函数需要引用自身的例子，就是事件触发后事件侦听器需要解绑自身。
- 匿名函数省略了对于代码可读性/可理解性很重要的函数名。一个描述性的名称往往可以不言自明。

行内函数表达式非常强大且有用—匿名和具名之间的区别没有本质上的区别。给函数表达式指定一个函数名可以有效解决以上问题。**始终给函数表达式命名是一个最佳实践**。

##### 3.3.2 立即执行函数表达式

- 第一种写法：

```
(function(){
 // ...
})() // 这里的()作为函数调用
```

- 第二种写法：

```js
(function(){
  // ...
}())
```

#### 3.4 块作用域

变量的声明应该距离使用的地方越近越好，并最大限度地本地化。

> 注意：当使用var声明变量时，它写在哪里都是一样的，因为它们最终都会属于外部作用域。 -- 变量提升

块级作用域是一个用来对之前的**最小授权原则**进行扩展的工具，将代码从在函数中隐藏信息扩展为块中隐藏信息。

##### 3.4.1 with

...

##### 3.4.2 try/catch

**try/catch**的**catch**分句会创建一个块级作用域，其中声明的变量仅仅在catch内部有效。

##### 3.4.3 let

ES6新增声明变量的语法，这里就不展开说了，直接说细节。

思考：

```js
for(var i=0;i<6;i++){
  setTimeout(()=>{
    console.log(i) // 6个6
  },1000)
}
```

这里为什么会输出6个6，因为**setTimeout**是异步的，打印的时候，循环已经循环完毕了！所以这里会输出6个6

有什么方法可以让它正常输出 0、1、2、3、4、5呢？

- 方法一：

```js
for(var i=0;i<6;i++){
  setTimeout((i)=>{
    console.log(i) // 0 1 2 3 4 5
  },1000,i)
}
```

这里其实是利用了setTimeout函数的第三个参数，每次for迭代的时候都给setTimeout传递一个当前的i的值。

- 方式二：

```js
for(let i=0;i<6;i++){
  setTimeout(()=>{
    console.log(i) // 0 1 2 3 4 5
  },1000)
}
```

这里就是利用到**let**，for循环头部的let将i绑定到了for循环的块中，事实上它将其重新绑定到了循环的**每一个**迭代中，确保使用上一个循环迭代结束时的值重新进行**赋值**。

##### 3.4.3 const

也是ES6新增的，用来声明常量的。

...
### 提升

#### 4.1 先有鸡还是先有蛋

直觉上会认为JavaScript代码在执行时说**由上往下**执行的，但实际上这并不完全正确，有一种特殊情况会导致这一假设上错误的。

例如：

```js
a = 2;
var a;
console.log(a) // 2
```

例如：

```js
console.log(a) // undefined
var a = 2;

等效于以下
var a;
console.log(a)
a = 2;
```

#### 4.2 编译器再度袭来

这里JavaScript实际上会将其看成两个声明：var a； a = 2；

- 第一个定义声明是在**编译阶段**进行的。
- 第二个赋值声明会留在原地等待**执行阶段**。

> 注意：只有声明本身会被提升，而赋值或其他运行会留在原地。并且每个作用域都会进行提升操作。

> 注意：函数声明会被提升，但是函数表达式不会被提升。

#### 4.3 函数优先

函数声明和变量都会被提升。但是一个值得注意的细节，变量和函数，是**函数优先被提升**，然后才是变量。

以下代码验证这一点：

```js
foo() // 1
function foo(){
  console.log(1)
}

foo = function (){
  console.log(2)
}
```

这里输出的是1，而不是2。上面代码实际会转化成以下代码：

```js
function foo(){
  console.log(1)
}

foo() // 1

foo = function (){
  console.log(2)
}
```

> 注意：函数声明会被提升到普通变量之前。

尽管重复的var 声明会被忽视掉，但出现在后面的函数声明还是可以覆盖前面的，如下例子验证这一点：

```js
foo() // 3
function foo(){
  console.log(1)
}
var foo = function (){
  console.log(2)
}
function foo(){
  console.log(3)
}
```

一个普通块内部的函数声明通常会被提升到所在作用域的顶部，这个过程不会像下面的代码暗示的那样可以被条件判断所控制：

```js
foo() // TypeError: foo is not a function
var a = true;
if(a){
  function foo(){
    console.log(1)
  }
}else{
    function foo(){
    console.log(2)
  }
}
```

但是需要注意这个行为并不可靠，在JavaScript未来的版本中有可能发生改变，因此应该尽可能避免在块内部声明函数。

#### 4.4 小结

- var a =2；看作一个声明，而实际上JavaScript并不那么认为。它首先会将var a和a = 2当作两个独立的声明，第一个是**编译阶段**的任务，而第二个则是**执行阶段**的任务。
- 无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理。可以将这个过程形象地想象成所有的声明（变量和函数）都会被**移动**到各自作用域的最顶端，这个过程被称为**提升**。
- **函数表达式**的赋值在内的赋值操作并不会提升。

### 作用域和闭包

#### 5.1 启示

闭包上基于**词法作用域**书写代码时所产生的**自然结果**，我们甚至不需要未来利用它而有意识地创建闭包。闭包的创建和使用在我们的代码中随处可见。我们缺少的是根据自己的意愿来识别、拥抱和影响闭包的思维环境。

#### 5.2 实质问题

当**函数**可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在**当前词法作用域之外**执行。

下面来展示一下产生闭包的例子：

```js
function foo(){
  const a = 2;
  function bar(){
    console.log(a)
  }
  return bar
}
const baz = foo()
baz() // 2 这个就是闭包。
```

函数bar()的词法作用域能够访问foo()的内部作用域。在foo函数执行后，通过会期待foo函数的整个内部作用域都被销毁，因为我们知道引擎有垃圾回收机制用来释放不再使用的内存空间。由于看上去foo的内容不会再使用了，所以自然地会考虑对其进行回收。

而**闭包**的神奇之处正是可以阻止这件事情的发生。事实上内部作用域依然存在，因此没有被回收掉。谁在使用这个内部作用域？是foo函数本身在使用。

拜bar所声明的位置所赐，它拥有覆盖foo内部作用域的闭包，使得该作用域能够一直存活，以供bar在之后任何时间进行引用。

bar依然持有对该作用域的访问，而这个引用就叫做闭包。

- 闭包使得函数可以继续访问定义时的词法作用域。
- 无论使用何种方式对函数类型的值进行**传递**，当函数在别处被调用时可以被观察到闭包。

以下也是一个闭包：

```js
function foo(){
  let a = 2;
  function baz(){
    console.log(a)
  }
  bar(baz)
}

function bar(fn){
  fn() // 这就是闭包
}

foo()
```

#### 5.3 现在我懂了

- 本质上无论何时何地，如果将（访问它们各自词法作用域的）函数当作第一级的值类型并到处传递，你就会看到闭包在这些函数中的应用。
- 在定时器、事件监听器、Ajax请求、跨窗口通信、Web Worker或者任何其他异步（或者同步）任务中，**只要使用了回调函数，实际上就是在使用闭包**。

> 通常认为立即执行函数（IIFE）是典型的闭包例子，但是根据前面对闭包的含义，并不同意这个观点，但是IIFE确实是存在了闭包。

#### 5.4 循环和闭包

要说明闭包，for循环说一个典型的例子。

```js
for(var i=1;i<=5;i++){
  setTimeout(()=>{
    console.log(i) // 5个6
  },i*1000)
}
```

正常情况下，这段代码我们预期是每秒一次、每次一个输出1、2、3、4、5。

但实际上，以每秒一次的输出5个6。

延迟函数的回调会在循环结束时才执行。事实上，当定时器运行时即使每个迭代中执行的是**setTimeout**所有的回调函数以恶案是在**循环结束**后才会被执行的。

缺陷是我们试图假设循环中的每个迭代在运行时都会给自己**捕获**一个i的副本。但是根据作用域的工作原理，实际情况是尽管循环中的五个函数是在各自迭代中分别定义的，但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个i，所以实际上所有函数都共享了一个i的引用。

利用立即执行函数（IIFE）

```js
for(var i=1;i<=5;i++){
(
function (i){
    setTimeout(()=>{
    console.log(i) // 1 2 3 4 5
  },i*1000)
}
)(i)
}
```

每个延迟函数都将**IIFE**在每次迭代中创建的作用域封闭起来。

###### 重返块作用域

let声明，可以用来**劫持**块作用域，并且在这个块作用域中声明一个变量。

> for循环头部的let声明还会有一个特殊的行为。这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。

#### 5.5 模块

最常见的实现模块模式的方法通常被称为**模块暴露**，这里展示的是其变体。

```js
function myMoudle(){
  let auther = [1,2,3];
  function doSomething(){
    console.log(auther,'!!!')
  }
  return {
    auther,
    doSomething
  }
}
const foo = myMoudle()
console.log( foo.auther ) // [1,2,3]
foo.doSomething() //  [1,2,3] !!!
```

> jQuery和$标识符就是jQuery模块的公共API，但是它们本身都是函数（由于函数也是对象，它们本身也可以拥有属性）

模块模式需要具备两个必要条件：

1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包， 并且可以访问或者修改私有的状态。

**一个具有函数属性的对象本身并不是真正的模块**。从方便观察的角度看，**一个从函数调用所返回的，只有数据属性而没有闭包函数的对象并不是真正的模块**。

当只需要一个实例时，可以对这个模式进行简单的改进为**单例模式**。

```js
const foo = (
  function MyMoudle(){
    let something = 'cool';
    function doSomething(){
      console.log( something + '!!!' )
    }
    return {
      something,
      doSomething
    }
  }
)()

console.log(foo.something) // cool
foo.doSomething // cool!!!
```

我们将模块函数转换为IIFE，立即调用函数并将返回值直接复制给单例的模块实例标识符foo。

##### 5.5.1 现代的模块机制

大多数模块依赖加载器/管理器本质上都是将这种模式定义封装进一个友好的API。

##### 5.5.2 未来的模块机制

**ES6**中为模块增加了一级语法支持。

> 相比之下，ES6模块API是静态的(API不会在运行时改变)。由于编辑器知道这一点，因此可以在**编译期**检查对导入模块的API成员的引用是否真实存在。如果API引用并不存在，编译器会在编译时就抛出早期错误，而不会等待在**运行期**再动态解析(并报错)。

#### 5.6 小结

**当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。**

模块的两个主要特征：

- 为创建内部作用域而调用了一个包装函数；
- 包装函数的返回值必须至少包含一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包；

### 关于this

#### 1.1 为什么要用this

this提供了一种更优雅的方式来**隐式传递**一个对象引用，因此可以将API设计得更加简洁并且易于复用。

随着我们的使用模式越来越复杂，显示传递上下文对象会让代码变得越来越混乱，使用**this**则不会这样。

> argument.callee来引用当前正在运行的函数对象。这是唯一一种可以从匿名函数对象内部引用自身的方法。然而，更好的方法是避免使用匿名函数，至少在需要自引用时使用具名函数（函数表达式）。argmuent.callee已经**被弃用**，不应该再使用它。

以下代码，我们想要记录foo被调用的次数:

```js
function foo(num){
  console.log('foo:',num)
  this.count++
}

foo.count =0

for(let i=0;i<10;i++){
  if(i>5){
    foo(i)
  }
}

// foo:6
// foo:7
// foo:8
// foo:9
console.log(foo.count) // 0
```

为什么foo.count还是0？这里foo函数也确实执行了四次，并打印了四次log，由此可以推断出函数是执行了，但是this.count并没有++，其实count++了，但是此时的this是指向全局作用域对象的(window)，所以循环走完后，winodw下就可以访问到count变量，但很遗憾这里的值是**NaN**，因为刚开始window下访问count还是undefined，undefined++自然就是NaN了。

那么我们这里可以怎么巧妙的利用灵活的this机制去解决这个问题呢？

```js
function foo(num){
  console.log('foo:',num)
  this.count++
}

foo.count =0

for(let i=0;i<10;i++){
  if(i>5){
    foo.call(foo,i)
  }
}

// foo:6
// foo:7
// foo:8
// foo:9
console.log(foo.count) // 4
```

这里利用call改变了foo的this指向。

#### 1.2 它的作用域

- this在任何情况下都不指向函数的词法作用域。
- 在JavaScript内部，作用域和对象类似，可见的标识符都是它的属性。但是**作用域对象**无法通过JavaScript代码访问，它存在于JavaScript引擎内部。
- 每当你想要把this和词法作用域的查找混合使用时，一定要提醒自己，这是无法实现的。

#### 1.3  this到底是什么

1. this是在**运行时**进行绑定的，并不是在编写时绑定的，它的上下文取决于**函数调用时**的各种条件。
2. this的绑定和**函数声明的位置**没有任何关系，只取决于函数调用方式。
3. 当一个函数被调用时，就会创建一个活动记录(有时候也称为执行上下文)。这个记录会包含**函数在哪里被调用(调用栈)**、**函数的调用方式**、**传入的参数**等信息。this就是这个记录的属性，会在**函数执行**的过程中用到。

### this全面解析

#### 2.1 调用位置

**调用位置就是函数在代码中被调用的位置，而不是声明的位置。**

通常来说，寻找调用位置就是寻找**函数被调用的位置**，但是做起来并没有这么简单，因为某些编程模式可能会**隐藏**真正的调用位置。

最重要的是分析调用栈(就是为了到达当前执行位置所调用的所有函数)。我们关心的是调用位置就在当前正在执行的函数的**前一个**调用中。

下面来看看什么是调用栈和调用位置：

```js
function baz(){
  // 当前调用栈是：baz
  // 因此，当前调用位置是全局作用域
  console.log('baz')
  bar() // bar的调用位置
}

function bar(){
  // 当前调用栈是：baz-->bar
  // 当前调用位置是在bar上
  console.log('bar')
  foo() // foo的调用位置
}

function foo(){
  
   console.log('foo')
}

baz() // baz的调用位置
```

> 你可以把调用栈想像成一个函数调用链。

#### 2.2 绑定规则

##### 2.2.1 默认绑定

```js
function foo(){
  console.log(this.a)
}

var a = 2
foo()  // 2
```

声明全局作用域中的变量(比如var a = 2)，就是全局对象(window)下的一个**同名属性**。它们本质是同一东西，并不是通过复制得到的，就像一个硬币的两面一样。

> 注意：严格模式下(strict mode)下，则不能将全局对象用于**默认绑定**，因此this是undefined。

##### 2.2.2 隐式绑定

思考一下以下代码：

```js
function foo(){
  console.log(this.a)
}
const obj ={
  a:2,
  foo:foo
}

obj.foo() // 2
```

首先需要注意的是foo()的声明方式，及其之后是如何被当作引用属性添加到obj中的。但是**无论是直接在obj中定义还是先定义再添加引用属性。这个函数严格来说都不属于obj对象的。**

然而，调用位置会使用obj上下文来引用函数，因此你可以说函数被调用时obj对象**拥有**或者**包含**函数引用。

**对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。**

```js
function foo(){
  console.log(this.a)
}

const obj1 = {
  a:42,
  foo:foo
}

const obj2 = {
  a:2,
  obj1:obj1
}

obj2.obj1.foo() // 42
```

###### 隐式丢失

一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是上它会作用应用默认绑定，从而把this绑定到全局对象或者undefined中，取决于是否上严格模式。

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值。

调用回调函数的函数可能会修改this。在一些流行JavaScript库中事件处理器常会把回调函数的this强制绑定到触发事件的DOM元素上。

##### 2.2.3 显式绑定

JavaScript提供的绝大多数函数以及我们自己创建的所有函数都可以使用call(...)、apply(...)方法。

它们的第一个参数是一个对象，是给this准备的，接着在调用函数时将其绑定到this。因为你可以直接指定this到绑定对象，因此我们称之为**显式绑定**。

**如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作this到绑定对象，这个原始值会被转换成它的对象形式（也就是new String(...))、new Boolean(...)，通常被称为“装箱”。--包装类型**

##### 2.2.4 new绑定

在JavaScript中，构造函数只是一些使用new操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，**它们只是被new操作符调用的普通函数而已**。

实际上不存在所谓的**构造函数**，只有对于函数的**构造调用**。

使用new来调用函数，或者说发生构造函数调用时，会做那些事：

1. 创建（或者说构造）一个全新的对象。
2. 这个对象会执行[[prototype]]连接。 （将属性和方法添加到这个新对象里）
3. 这个新对象会绑定到函数调用的this。
4. **如果函数没有返回其他对象，那么new表达式中的函数调用就会自动返回这个新对象。**

new说最后一种可以影响函数调用时this绑定行为的方法，我们称之为**new绑定**。

#### 2.3 优先级

**显性绑定 > new绑定 > 隐式绑定**

Function.prototype.bind(...)会创建一个新的包装函数，这个函数会忽略它当前的this绑定（无论绑定的对象是什么），并把我们提供的对象绑定到this上。

手写一个简易版本的bind:

```js
Function.prototype.bind = function(oThis){
  if(typeof this !=='function'){
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }
  let aArgs = Array.prototype.slice.call(argument,1),
      fToBind =this,
      fNOP = function (){
        return fToBind.apply(
       ( this instanceof fNOP &&
        oThis ? this : oThis),
          aArgs.concat(
          Array.prototype.slice.call(arguments)
          )
        )
      }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
```

我们重点放到这一段代码上：

```js
this instanceof fNOP &&
oThis ? this : oThis
// 以及
fNOP.prototype = this.prototype
fBound.prototype = new fNOP()
```

这段代码会判断硬绑定函数是否是被new调用，如果是的话就会使用新创建的this替换掉硬绑定的this。

之所以要在new中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用new进行初始化时就可以只传入其他参数。bind( ... ) 的功能之一就是**可以把除了第一个参数（第一个参数用于绑定this）之外的其他参数都传给下层的函数（这种技术称为"部分应用"，是柯里化的一种）**。

```js
function foo(p1,p2){
 this.val = p1 + p2
}

const bar = foo.bind('p1')
const baz = new bar('p2')
baz.val  // p1p2
```

###### 判断this

1. 函数是否在new中调用（new绑定）？如果是的话this绑定的是新创建的对象。

```js
const bar = new foo()
```

2. 函数是否在call、apply（显式绑定）或者硬绑定调用？如果是的话，this绑定的是指定的对象。

```js
const bar = foo.call(obj)
```

3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this绑定的是那个上下文对象。

```js
const bar = obj1.foo()
```

4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定在undefined，否则绑定到全局对象。

```js
const bat = foo()
```

#### 2.4 绑定例外

##### 2.4.1 被忽略的this

**如果你把null或者undefined作为this的绑定对象传给call、apply或者bind，这些值会被调用时被忽略，实际应用的是默认绑定规则。**

```js
function foo(){
  console.log( this.a )
}
let a = 2
foo.call(null) // 2
```

什么情况会传入null？

1. 使用apply来**展开**数组。（在ES6之前，ES6之后可以使用`...`展开运算符）
2. 使用bind可以对参数进行柯里化。（预先设置一些参数）

```js
function foo(){
  console.log('a:'+ a + 'b:' + b)
}
const bar = foo.call(null,1)
bar(2)  // a:1 b:2
```

> 在ES6之前没有柯里化的相关语法，因此还需要使用bind( ... )。

然而，总是使用null来忽略this绑定可能会产生一些副作用。如果某个函数确实使用了this（比如第三方库中的一个函数），那默认绑定规则会把this绑定到全局对象，这将导致不可预计的后果（比如修改全局对象）。

##### 更安全的this

一种更安全的做法是传入一个特殊的对象。在JavaScript中创建一个空对象最简单的方法都是**Object.create(null)**和**{}**很像，但是**Object.create并不会创建Object.prototype委托**，所以它比{}更空。

##### 2.4.2 间接引用

间接引用最容易在赋值时发生：

```js
function foo(){
  console.log( this.a )
}
let a = 2
let obj = {
  a:3,
  foo:foo
}
let p = {
  a:99
}
obj.foo() // 3
(p.foo = obj.foo)() // 99
```

赋值表达式p.foo = obj.foo的返回值是目标函数的引用，因此调用位置是foo()而不是p.foo()或者obj.foo()。

> 注意：对于默认绑定来说，决定this绑定对象的并不是**调用位置**是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this会被绑定到undefined，否则this绑定到全局对象。

##### 2.4.3 软绑定。

硬绑定会大大降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显示绑定来修改this。

#### 2.5 this词法

箭头函数不使用this到四种标准规则，而是根据外层（函数或全局）作用域来决定this。箭头函数可以像bind(...)一样确保函数的this被定到指定对象，此外，其重要性还体现在它用更常见的词法作用域取代了传统的this机制。

```js
function foo(){
  // ES6之前通常是使用这种方式来保存this
  const _this = this
  setTimeout(function (){
    console.log(_this.a)
  })
}
const obj = {
  a:2
}
foo.call(obj) // 2
```

虽然_this = this和箭头函数看起来都可以取代bind(...)，但是从本质上来说，它们像替代的是this机制。

如果经常编写this风格的代码，但是绝大多数的时候都会使用_this = this 或者箭头函数来否定this机制，那我们应当：

1. 只使用此法作用域并完全抛弃错误this风格的代码。
2. 完全采用this风格，在必要时使用bind(...)，尽量避免使用_this=this和箭头函数。

#### 2.6 小结

如果要判断一个运行中的函数的this绑定，就需要找到这个函数的**直接调用位置**。

四条规则判断this绑定对象：

- 由new调用：绑定到新创建的对象。
- 由call或者apply调用：绑定到指定对象。
- 由上下文对象调用：绑定到那个上下文对象。
- 默认：在严格模式下，绑定到undefined上，否则绑定到全局对象。

> 有些调用可能在无意中使用了默认绑定规则，如果想“更安全”地忽略this绑定，你可以使用一个DMZ对象，比如a=Object.create(null)，以保护全局对象。

箭头函数会继承**外层函数调用**的this绑定（无论this绑定到什么）。这其实和ES6之前代码的**_this = this**机制一样。

### 对象

#### 3.1 语法

对象可以通过两种形式定义，声明(文字)形式(字面量声明)和构造形式。

对象的文字语法：

```js
const obj = {
  key:value
}
```

构造形式：

```js
const obj = new Object()
obj.key = value 
```

构造形式和文字形式生成的对象是一样。唯一的区别就是，在文字声明中你可以添加多个键值对，但是在构造形式呢必须逐个逐个添加属性。

#### 3.2 类型

在JavaScript中一共有**八种**数据类型。（包含ES6）

- string
- number
- boolean
- null
- undefined
- bigInt
- Symbol

> 注意：null有时候会被当作一种对象类型，但是这其实只是语言本身的一个bug，既对null执行**typeof null**会返回字符串object。实际上，**null本身是基本类型**。
>
> 原理：不同的对象在底层都表示为二进制，在JavaScript中二进制前三位都为0的话会被判断为object，null的二进制表示全是0，自然前三位也是0，所以会被判断为object类型。

```js
let str = 'I am Xianzhu-Yang'
tyoeof str ==> string
str instanceof String. // false

let strObject = new String('I am stringObj')
typeof strObject ==> object
strObject instanceof String. // true
```

原始值"I am Xianzhu-Yang"并不是一个对象，它只是一个字面量，并且是一个不可边的值，如果要在这个字面量上执行一些操作，比如**获取长度**、**访问其中**某个字符串等，那需要将其转换为String对象。

幸运的是，在必要时语言会自动把字符串字面量转换成一个string对象，也就是说你并不需要显式创建对象。**引擎会自动把字面量转换为String对象，所以可以访问属性和方法。**

null和undefined没有对应的构造形式，它们只有字面形式。相反，Date只有构造形式，没有文字形式。

对于Object、Array、Function和RegExp（正则）来说，无论使用文字或构造形式，它们都是对象，不是字面量。在某些情况下， 相比用文字形式创建对象，构造形式可以提供一些额外选项。由于这两种形式都可以创建对象，所以我们首选更简单的文字形式。建议只在需要哪些额外选项时才使用构造形式。

Error对象很少在代码中显示创建，一般是在抛出异常时被自动创建。也可以使用new Error(...)这种构造形式来创建，不过一般用不着。

#### 3.3 内容

对象内容是由一些存储在特定命名为主的（任意类型的）值组成的，我们称之为属性。

**存储在对象容器内部的是这些属性的名称，它们都被称为指针（从技术角度来说是引用）一样，指向这些值真正的存储位置。**

访问对象属性可以分为两种方式：属性访问、键访问。

这两种语法的主要区别：

- 操作符要求属性名必须满足标识符的命名规范。
- 键访问语法可以接受任意UTF-8Unicode字符串作为属性名。举例来说，如果要引用名称为了**xian-zhu**这个属性名，就必须使用键访问。

在对象中，**属性名永远都是字符串**。如果你使用string字面量以为的其他值作为属性名，那它首先会被转换为一个字符串。即使是数字也不例外，虽然在数组中下标使用的的确是数字，但是在对象属性名中会转换为字符串。

##### 3.3.1 属性和方法

确实，有些函数具有this引用，有时候这些this确实会指向调用位置的对象引用。但是这种用法从本质上来说并没有把一个函数变成一个方法，因为this上在运行时根据调用位置动态绑定的，所以函数和对象的关系最多也只能说上间接关系。

##### 3.3.2 数组

数组和对象都是根据其对应的行为和用途进行优化的，所以最好只用对象来存储**键值对**，用数组存储数值下标。

#### 3.3.3 复制对象

思考一下这个对象：

```js
function anotherFunction(){}
const anotherObject = {
  a:true
}

cosnt anotherArray = []

const myObject = {
  a:2,
  b:anotherObject,
  c:anotherArray,
  d:anotherFunction
}

anotherArray.push(anotherObject,myObject)
```

如何准确的表示myObject的复制。

对于浅拷贝来说，复制出的是新对象中a的值会是旧对象a的值，也就是2，简单类型就是值的传递。但是新对象中的b、c、d三个属性其实只是三个引用，它们和旧对象引用是一样的。对于深拷贝来说，除了复制myObject以外还会复制anotherArray。这时问题就来了，anotherArray引用了antherObject和myObject，所以又需要复制myObject，这样就会由于**循环引用**导致死循环。

##### 3.3.3 复制对象

思考一下这个对象：

```js
function anotherFunction(){}
const anotherObject = {
  a:true
}

cosnt anotherArray = []

const myObject = {
  a:2,
  b:anotherObject,
  c:anotherArray,
  d:anotherFunction
}

anotherArray.push(anotherObject,myObject)
```

如何准确的表示myObject的复制。

对于浅拷贝来说，复制出的是新对象中a的值会是旧对象a的值，也就是2，简单类型就是值的传递。但是新对象中的b、c、d三个属性其实只是三个引用，它们和旧对象引用是一样的。对于深拷贝来说，除了复制myObject以外还会复制anotherArray。这时问题就来了，anotherArray引用了antherObject和myObject，所以又需要复制myObject，这样就会由于**循环引用**导致死循环。

有些人通过toString()来序列化一个函数的源代码(但是结果取决于JavaScript引擎的具体实现，而且不同的引擎对于不同类型的函数处理方式不完全相同)。

```js
// 深拷贝的一种方式
const newObj = JSON.parse(JSON.stringify(target))
```

> 注意：JSON实现深拷贝，如果要拷贝的目标对象里有Date时间对象会把时间对象转换成字符串，如果有函数会被遗漏掉，如果是undefined的值也会被忽略掉。

相比深拷贝，浅拷贝的问题就少得多了，在ES6定了Object.assing(目标对象，要拷贝的对象，要拷贝的对象)，它会遍历一个或多个源对象（要拷贝的对象）的所有**可枚举**的**自有键**，并把它们复制（使用=操作符赋值）到目标对象，最后返回目标对象。

> 由于Object.assgin(...)就是使用=操作符来赋值，所以以源对象属性的一些特性（比如writable）不会被复制到目标对象。

##### 3.3.5 属性描述符

从ES5开始，所有的属性都具备了**属性描述符**。

1. writable

writable决定是否可以修改属性的值。

```js
const obj ={}
Object.defineProperty(obj,'a',{
  value:2,
  writalbe:falas, // 不可修改
  configurable:true, // 是否可配置
  enumerable:true. // 是否可枚举
})
obj.a = 3
console.log(obj.a) // 2
```

对于设置了writable的属性，修改它会**静默失败**，如果在严格模式下会报错。

2. configurable

只要属性是可配置的，就可以使用defineProperty(...)方法来修改属性描述符。

> 不管是不是处于严格模式，尝试修改一个不可配置的属性描述符都会出错。即便属性是configurable:false，我们还是可以把writable的状态由true改为false，但是无法从false改成true。除了无法修改，configurable:false还会禁止删除这个属性。

delte只用来直接删除对下那个的(可删除)属性。如果对象的某个属性是某个对象/函数的最后引用者，对这个属性执行delete操作之后，这个未引用的对象/函数就可以被垃圾回收了。但是，不要把delte看作一个释放内存的工具(就像C/C++中)，它就是一个删除对象属性的操作，仅此而已。

3. enumerable

这个描述符控制的是属性是否会出现在对象的属性枚举中，比如说**for...in**循环。如果把enumerable设置为false，这个属性就不会出现在枚举中，虽然仍然可以正常访问它。相对的，设置成true就会让它出现在枚举中。

3.3.6 不变性

所有的方法创建的是浅不变性，也就是说，它们只会影响目标对象和它的直接属性。如果目标对象引用了其他对象(数组/对象/函数等)，其他对象的内容不受影响，仍然是可变的。

> 在JavaScript程序中很少需要深不变性。有些特殊情况可能需要这样做，但是根据通用的设计模式，如果你发现需要密封或者冻结所有对象，那我们或许应当退一步，思考一下程序的设计，让它能更好地应对对对象值的改变。

1. 对象常量

```js
const myObj = {}
Object.defineProperty(myObj,'name',{
  value:'yxz',
  writable:false,
  configurable:false
})
```

2. 禁止扩展

如果你想禁止一个对象添加新属性并且保留已有属性，可以使用Object.preventExtensions(...)

```js
const myObject ={
  a:2
}
Object.preventExtensions(myObject)
myObject.a = 9
console.log(myObject.a) // 2
```

非严格模式下，会静默失败，否则会报错。

3. 密封

Object.seal(...)会创建一个"密封"的对象，这个方法实际上会在一个现有对象上调用Object.preventExtensions(...)并把所有现有的属性标记为configurable:false。

所以密封后的对象不仅不能添加新属性，也不能重新配置或者删除任何现有的属性（虽然可修改它的值）。

4. 冻结

Object.freeze(...)会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(...)并把所有**数据访问**属性标记为writable：false，这样就无法修改它们的值。

你可以深度冻结一个对象，具体方法为：首先在这个对象上调用Object.freeze(...)，然后遍历它引用的对象并把这些对象上调用Object.freeze(...)，但是一定要小心，因为这样做，有可能会冻结到其他需要**共享的对象**。

##### 3.3.7 [[Get]]

```js
const obj ={
  a:1
}
obj.a // 1
```

在语言规范中，obj.a在obj上实际上是实现了[[Get]]操作(有点像函数调用[[Get]])。对象默认的内置[[Get]]操作首先在对象中查找是否有名称相同的属性，如果找到就返回这个属性的值。

如果没有找到名称相同的属性，按照[[Get]]算法的定义会执行例外一种非常重要的行为。其实就是遍历可能存在的[[prototype]]链，也就是**原型链**。

```js
const obj = {
  a:undefined
}
obj.a // undefined
obj.b // undefined
```

从返回值的角度来说，这两个引用没有区别——它们都返回了undefined。然而，尽管咋看之下没有区别，实际上底层的[[Get]]操作对obj.b进行了更复杂的处理。

仅通过返回值，你无法判断一个属性是否存在并且持有一个undefined值，还是变量不存在，所以[[Get]]无法返回某个特定而返回默认的undefined。

##### 3.3.8 [[Put]]

[[Put]]被触发时，实际的行为取决于许多因素，包括对象中是否已经存在这个属性(这是最重要的因素)。

如果已经存在这个属性，[[Put]]算法大致会检查下面这些内容。

1. 属性是否访问描述符？如果是并且存在setter就调用setter。
2. 属性的数据描述符中writable是否是false？如果是，在非严格模式下会静默失败，在严格模式下会抛出TypeError异常。
3. 如果都不是，将该值设置为属性的值。

如果对象中不存在这个属性，[[Put]]操作会更加复杂。

3.3.9 Getter和Setter

对象默认的[[Put]]和[[Get]]操作分别可以控制属性值的设置和获取。

> 在语言的未来/高级特性中，有可能可以改写整个对象(不仅仅是某个属性)的默认[[Get]]和[[Put]]操作。

在ES5中可以使用getter和setter部分改写默认操作，但是只能应用在单个属性上，无法应用到整个对象上。**getter上一个隐藏函数，会在获取属性值时调用。setter也是一个隐藏函数，会在设置属性值时调用。**

##### 3.3.10 存在性

我们可以在不访问属性值时判断对象中是否存在这个属性:

``` js
const obj ={
  a:2
}
('a' in obj)  // true
('b' in obj)  // false
```

in操作符会检查属性是否在对象及其[[prototype]]原型链中。相比之下，hasOwnProperty(...)只会检查属性是否存在obj对象中，不会检查[[prototype]]链。

Object.hasOwnProperty.call(obj,'a')，它借助了基础的hasOwnProperty方法并把它显性绑定到obj上。

> 看起来in操作符可以检查容器内是否有某个值，但是它实际上检查的是某个属性名是否存在。对于数组来说这个区别非常重要，4 in [2,4,6]返回的是false，因为[2,4,6]数组中并没有下标为4的值。

#### 3.4 遍历

for...in可以用来遍历对象的可枚举属性列表(包括prototype链)。

在JavaScript中，给我们内置了一些遍历回调函数，每种辅助迭代器都可以接受一个回调函数并把它应用到数组的每个元素上，唯一的区别就是它们对于回调函数处理方式不太一样。

- forEach：遍历数组的所有值并忽略回调函数的返回值。
- every：会一直运行直到回调函数返回false（或者其他假值）。
- some：会一直运行直到回调函数返回true（或者其他真值）。

every和some中特殊的返回值会普通的for循环中的break语句类似，它们会提前终止遍历。

> 在遍历数组下标时采用的是数字顺序(for循环或者其他迭代器)，但是遍历对象属性时的顺序是不确定的，在不同的JavaScript引擎中可能是不一样的。

在ES6中新增了一个for...of方法

```js
const arr = [1,2,3]
for(const v of arr){
  console.log(v) // 1 2 3
}
```

for...of语法循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的next()方法来遍历所有返回值。

数组有内置的@@iterator，因此for...of可以直接应用在数组上。我们也可以使用内置的@@iterator来手动遍历数组。

```js
const arr = [1,2,3]
const it = arr[Symbol.iterator]

it.next() // {value:1,done:flase}
it.next() // {value:2,done:flase}
it.next() // {value:3,done:flase}
it.next() // {done:true}
```

> 引用类似iterator的特殊属性时要使用符号名 ，而不是符号名包含的值。此外，虽然看起来很像一个对象，但是@@iterator本身并不是一个迭代器对象，而是返回迭代器对象的函数——这一点非常精妙并且非常重要。

和数组不同，普通对象没有内置的@@iterator，所以无法自动完成for...of遍历。之所以要这样做，有许多非常复杂的原因，不过简单来说，这样做是为了避免影响未来的对象类型。

如果想要给任何想遍历对象定义@@iterator：

```js
const obj ={
  a:1,
  b:2
}


Object.defineProperty(obj,Symbol.iterator,{
  enumerable:false,  // 不可枚举
  writable:false,   // 不可修改
  configurable:true, // 可配置
  value:()=>{
    let index = 0
    let ks = Object.keys(this)
    return {
      next:()=>{
        return {
          value:this[ks[index++]],
          done:(index > ks.length)
        }
      }
    }
  }
})

const it =obj[Symbol.iterator]()
it.next() // {value:2,done:false}
it.next() // {value:3,done:false}
it.next() // {done:true}

for...of遍历
for(const k of obj){
  console.log(v)  // 2 3
}
```

for...of循环每次调用obj迭代器对象的next方法时，内部的指针都会向前移动并返回对象属性列表的下一个值。

#### 3.5 小结

- 有时候构造形式创建对象可以提供更多选项。
- 访问属性时，引擎实际上会调用内部默认的[[Get]]操作(在设置属性值时说[[Put]])，[[Get]]操作会检查对象本身是否存在这个属性，如果没有找到还会向[[prototype]]链上去找。
- for...of会寻找内置或者自定义的@@iterator对象并调用它的next(...)方法来遍历数组。

### 混合对象类

面向类的设计模式：实例化、继承、多态。

#### 类理论

类/继承描述了一种代码的组织结构形式——一种软件中对真实世界中问题领域的建模方法。

面向对象编程强调的是数据和操作数据的行为本质上说互相关联的(当然，不同的数据有不同的行为)，因此好的设计就是把数据以及和它的相关行为打包/封装起来，这在正式的计算机科学中有时被称为**数据结构**。

类的另外一个核心概念是多态，这个概念是说父类的通用行为可以被子类用更特殊的**行为重写**。实际上，相对多态允许我们从重写行为引用基础行为。

类理论强烈建议父类和子类使用相同的方法名来表示特定的行为。从而让子类重写父类的行为。

### 原型

#### [[prototype]]

JavaScript中的对象有一个特殊的内置属性，其实就是对于其他对象的引用。几乎的对象在创建时[[prototype]]属性都会被赋予一个非空的值。

思考以下代码：

```js
const myObject ={
  a:2
}
myObject.a // 2
```

[[prototype]]有什么用？当你试图引用对象的属性时会触发[[Get]]操作，比如myObject.a。对于默认的[[Get]]操作来说，第一步是检查对象本身是否有这个属性，如果有就使用它。但是如果没有，就需要使用对象的[[Prototype]]链了。

```js
const myObject ={
  a:2
}
const newObject = Object.create(myObject)
newObject.a // 2
```

这里实际是查找了newObject的prototype链查找到的a，因为现在newObject对象的[[prototype]]**关联**到myObject。

使用for...in遍历对象时原理和查找[[prototype]]链类似，任何可以通过原型链访问到(并且enumberble:true)的属性都会被枚举。使用in操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链**(无论属性是否可枚举)**。

#### Object.prototype

所有普通的[[prototype]]链最终都会指向内置的Object.prototype。

#### 属性设置和屏蔽

```js
const myObject ={}
myObject.name ='yxz'
```

- 如果myObject对象中包含名为name的普通数据访问属性，这条赋值语句只会修改已有的属性值。

- 如果name不是直接存在于myObject中，[[prototype]]链就会被遍历，类似[[Get]]操作。如果原型链上找不到foo，foo就会被直接添加到myObject上。

- 如果属性为name即出现在myObject中也出现在[[prototype]]链上层，那么就会发生屏蔽。**myObject中包含的name属性会屏蔽原型链上层的所有name属性，因为myObject.name总是会选择原型链最底层的name属性。**

具体myObject.name ='yxz'会出现三种情况。

1. 如果在[[prototype]]链上层存在名为name的普通数据访问属性，并且没有被标记为writalbe:false，那就会直接在myObject中添加一个名为name的新属性，它是**屏蔽属性**。
2. 如果在[[prototype]]链上层存在name，但是它被标记为writalbe:true，那么无法修改已有属性或者在myObject上创建屏蔽属性。如果运行在非严格模式下，会静默失败，否则会抛出一个错误。
3. 如果在[[prototype]]链上层存在name并且它是一个setter，那就一定会调用它这个setter。name不会被添加到(或者说屏蔽于)myObject，也不会重新定义name这个setter。

> 注意：只读属性会阻止[[prortotype]]链下层隐式创建(屏蔽)同名属性，这样做是为了模仿类属性的继承。

```js
const obj1 ={
  a:1
}
const obj2 = Object.create(obj1)
obj1.a // 1
obj2.a // 1
obj1.hasOwnProperty('a') // true 
obj2.hasOwnProperty('a') // false

obj2.a++
obj1.a // 1
obj2.a // 2
obj2.hasOwnProperty('a') // true
```

尽管obj2.a++看起来应该(通过委托)查找并添加obj1.a属性，但是别忘了++操作符相当于obj2.a = obj2.a + 1，因此++操作符首先会通过[[prototype]]查找a属性并从obj1获取当前属性值a，然后给这个值+1，接着用[[Put]]将值2赋值给obj1新建的屏蔽属性a。

修改委托属性时一定要小心。如果想obj1的a+1，那唯一的办法就是obj.a++。

#### 类

实际上，JavaScript才是真正应该被称为面向对象的语言，因为它是少有可以不通过类，直接创建对象的语言。

##### 类函数

所有的函数默认都会拥有一个名为prototype的公有并且**不可枚举**的属性，它会指向另外一个对象。

```js
function Foo(){...}
Foo.prototype // {}
```

这个对象通常被称为Foo的原型，因为通过名为Foo.prototype的属性引用来访问它。

在面向类的语言中，类可以被复制(或者说实例化)多次，就像用模具制作东西一样。但是在JavaScript中，并没有类似的复制机制。你不能创建一个类的多个实例、只能创建多个对象，它们的[[prototype]]关联的说同一个对象。

我们并没有实例化一个类，实际上我们并没有从类中复制任何行为到一个对象中，只是让两个对象**互相关联**。

```js
function Foo(){...}
const f = new Foo()
```

**new Foo()这个函数调用实际上并没有直接创建关联，这个关联只是一个意外的副作用。new Foo()只是间接完成了我们的目标：一个关联到其他对象的新对象。**

##### 构造函数还是调用

```js
function Foo(){...}
const f = new Foo()
```

实际上，Foo和其他函数没有任何区别。**函数本身并不是构造函数，然而，当你在普通函数调用前面加上new关键字之后，就会把这个函数调用变成一个构造函数调用。实际上，new会劫持所有普通函数并用构造对象的形式来调用。**

##### 回顾构造函数

Foo.prototype的constructor属性只是Foo函数在声明时的默认属性。如果你创建了一个新对象并替换了函数默认的prototype对象引用，那么新对象并不会自动获得constructor属性。

思考下面代码：

```js
function Foo(){...}
Foo.prototype = {...}  // 创建一个新的原型对象

const f = new Foo()                 
f.constructor === Foo // false       
f.constructor === Object // true         
```

为什么会这样？f并没有constructor属性，所以它会委托[[prototype]]链上的Foo.prototype。但是对象也没有constructor属性(不过默认的Foo.prototype对象有这个属性！)，所以它会继续委托，这次会委托给委托链顶端的Object.prototype。这个对象有constructor属性，指向内置的Object(...)函数。

```js
function Foo(){...}
Foo.prototype = {}  // 创建一个新原型对象

// 需要对Foo.prototype上修复丢失的construcror属性
// 新对象属性起到Foo.prototype的作用
Object.defineProperty(Foo.prototype,'construcror',{
  enumerable: false,
  writable:true,
  configurable:true,
  value:this // 让construcror指向Foo
})
```

修复construcror需要很多手动操作，所以这些工作都是源于把construcror错误地理解成**由...构造**。

实际上，对象的construcror默认指向一个函数，而这个函数也有一个叫做prototype的引用指向这个对象。

construcror并不是一个不可变属性，它是不可枚举的，但是它的值是可读写的。此外，你可以给人以[[prototype]]链中任意对象添加一个名为construcror的属性或者对其进行修改，你可以任意对其赋值。

#### 原型继承

原型风格的代码：

```js
function Foo(name){
  this.name = name
}

Foo.prototype.myName = function(){
  return this.name
}

function Bar(name,label){
  Foo.call(this,name)
  this.label = label
}

// 创建一个新的Bar.prototype对象关联到Foo.prototype
Bar.prototype = Object.create(Foo.prototype)
// 注意！现在没有Bar.prototype.constructor了
// 如果你需要这个属性的话需要手动修复它
Bar.prototype.myLabel = function(){
  return this.label
}
const a = new Bar('a','obj a')
a.myName()  // 'a'
a.myLabel()  // 'obj a'
```

调用Object.create(...)会凭空创建一个新的对象并把新对象内部的prototype关联到你指定的对象。

注意以下两种常见的错误做法，实际上它们都存在一些问题：

```js
// 和你想的不一样
Bar.prototype = Foo.prototype

// 基本上满足你的需求，但是可能会产生一些副作用
Bar.prototype = new Foo()
```

Bar.prototype = Foo.prototype并不会创建一个关联到Bar.prototype的新对象，它只是让Bar.prototype直接引用Foo.prototype对象。因此当你执行类似Bar.prototype.myLabel =...的赋值语句时会直接修改Foo.prototype对象本身。显然这不是我们想要的结果，否则我们根本不需要Bar对象，直接使用Foo对象即可。


Bar.prototype = new Foo()的确会创建一个关联到Foo.prototype的新对象。但是它使用了Foo(...)的构造函数调用，如果函数Foo有一些副作用（比如写日志、修改状态、注册到其他对象、给this添加数据属性）的话，就会影响到Bar()的后代，后果很严重。


因此，要创建一个合适的关联对象，我们必须使用Object.create(...) 而不是使用具有副作用的Foo(...)。这样做唯一的缺点就是需要创建一个新对象任何把旧对象抛弃掉，不能直接修改已有的默认对象。


有两种把Bar.prototype关联到Foo.prototype的方法：

```js
// ES6之前需要抛弃默认的Bar.prototype
Bar.prototype = Object.create(Foo.prototype)
// ES6之后可以直接修改现有的Bar.prototype
Bar.setPrototypeof(Bar.prototype,Foo.prototype)
```

如果忽略掉Object.create(...)方法带来的轻微性能损失，它实际上比ES6及其之后的方法更短而且可读性更高。

##### 检查“类”关系

思考以下代码：

```js
function Foo(){
  // ...
}

Foo.prototype.blah = ...
const a = new Foo()

a instanceof Foo // true
```

instanceof操作符的左操作数数一个普通的对象，右操作数数一个函数。instanceof回答是：在a的整条prototype链上是否有Foo.prototype指向的对象？

> 通常我们不会在“构造函数调用”中使用硬绑定函数，不过如果你这么做的话，实际上相当于直接调用目标函数。同理，在硬绑定函数上使用instanceof也相当于直接在目标函数上使用instanceof。

下面是第二种判断[[prototype]]反射的方法，它更加的简洁：

```js
Foo.prototype.isPrototyprOf(a) // true
```

isPrototypeOf(...)回答的是：在a的整条[[prototype]]链上是否出现过Foo.prototype？

#### 对象关联

prototype机制就是存在于对象中的一个**内部链接**，它会引用其他对象。这个链接的作用是：**如果在对象上没有找到需要的属性或方法引用，引擎就会继续在[[prototype]]关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的[[prototype]]，这一系列对象的链接就被称为原型链。**

##### 创建关联

来看看Object.create(...)的强大之处：

```js
const foo = {
  something:function (){
    console.log('hello!')
  }
}
const bar = Obejct.create(foo)
bar.something()   // hello!
```

Object.create(...)会创建一个(bar)并把它关联到我们指定的对象(foo)中，这样我们就可以充分发挥[[prototype]]机制的威力(委托)并且避免不必要的麻烦(比如使用new的构造函数调用生成.prototype和.constructor引用)。

> Object.create(null)会创建一个拥有空(或者null)[[prototype]]链接的对象，这个对象无法进行委托。由于这个对象没有原型链，所以instanceof操作符无法判断，因此总是返回false。这些特殊的空[[prototype]]对象通常被称作“字典”，它们完全不会受到原型链的干扰，因此非常适合用来**存储数据**。

Object.create(...)的polyfill代码：

```js
if(!Object.create){
  Object.create = function (o){
    function F(){}
    F.prototype = o
    return new F()
  }
}
```

这段polyfill代码使用了一个一次性函数F，我们通过改写它的.prototype属性使其指向想要关联的对象，然后再使用new F()来构造一个新对象进行关联。

> 注：polyfill是兼容性代码。

### ES6中的Class

传统面向类的语言中父类、子类和实例之间其实是复制操作。但是在[[prototype]]中并没有复制，相反，它们之间只有**委托关联**。

ES6的Class解决了什么问题？

1. 不再引用杂乱的prototype。
2. 可以通过super(...)来实现**相对多态**，这样任何方法都可以引用原型链上层的同名方法。构造函数不属于类，所以无法互相引用——super()可以完美解决构造函数的问题。
3. class字面量语法不能声明属性（只能声明方法）。看起来这是一种限制，但是它会排除掉许多不好的情况，如果没有这种限制的话，原型链末端的“实例”可能会意外地获取其他地方的属性（这些属性隐式被所有实例所共享）。所以class实际上可以帮助我们避免犯错。
4. 可以通过extends很自然地扩展对象（子）类型，甚至是内置的对象（子）类型，比如Array或RegExp。没有class ...extends语法时，想实现这一点非常困难，基本上只有框架的作者才能搞清楚这一点，但是现在可以轻而易举地做到。

#### Class陷阱

class基本上只是现在的[[prototype]]委托机制的一个语法糖。

也就是说，class并不会像传统面向类的语言一样在声明时静态复制所有行为。如果你（有一或者无意）修改或者替换了父类中的一个方法，那子类和所有实例都会受到影响，因为它们在定义时并没有进行复制，只是使用了**基于[[prototype]]的实时委托**。

```js
class C{
  constructor(){
    this.num = Math.random()
  }
  rand(){
    console.log(this.num)
  }
}

const c1 = new C()
c1.rand()   // 0.4242424...
C.prototype.rand = function (){
  console.log(this.num * 1000)
}
const c2 = new C()
c2.rand() // 424
c1.rand()  // 996，连c1实例的方法都被改变了
```

class语法还有一个意外屏蔽的问题：

```js
class P(){
  constructor(id){
    this.id = id
  }
  id(){
    console.log('yxz')
  }
}

const p = new P()
p.id()  // TypeError: p.id现在是一个字符串，并不是一个方法
```

除此之外，super也存在一些问题。super并不是动态绑定的，它会在声明时静态绑定的。出于性能问题，super并不像this一样是**晚绑定**的，它会在创建时静态绑定。