---
title: 书籍
description: books
layout: ../../layouts/MainLayout.astro
---

## JavaScript高级程序设计-第四版

#### 函数

###### 尾调用优化

- 简介：ECMAScript规范新增了一项内存管理优化机制，让javascript引擎在满足条件时可以重用栈帧。
- 需要条件：
  - 代码在严格模式下执行；
  - 外部函数的返回值是对尾调用函数的调用；
  - 尾调用函数返回后不需要执行额外的逻辑；
  - 尾调用函数不是引用外部函数作用域中自由变量的闭包；

> 之所以要求严格模式，主要因为在非严格模式下函数调用中允许使用f.arguments和f.caller,而它们都会引用外部函数的栈帧。显然，这意味着不能应用优化了。因此尾调用优化要求必须在严格模式下有效，以防止引用这些属性。



###### 闭包

1. 简介：匿名函数经常被误认为是闭包（closure）。`闭包`指的是那些引用了另外一个函数作用域中变量的函数，通常是在嵌套函数中实现。

> 注意：使用不当容易产生内存泄漏。产生原因：错误引用该变量，导致引用一直存在，垃圾回收机制一直没回收。



###### 立即调用的函数表达式

​		立即调用的匿名函数又被称作`立即调用的函数表达式` （IIFE，Immediately Invoked Function Expressopn）。它类似函数声明，但由于被包含在括号中，所以会被解释为函数表达式。紧跟着第一组括号后面的第二组括号就会立即调用前面的函数表达式。

```js
(function (){
  // 块级作用域
})()
```

​		在es6及以前，为了防止变量定义外泄，IIFE是个非常有效的方式。这样也不会导致闭包相关的内存问题，因为不存在对这个匿名函数的引用。为此，只要函数执行完毕，其作用域链就可以被销毁。

​		在es6之后，IIFE就没有那么必要了，因为块级作用域中的变量无须IIFE就可以实现同样的隔离。

```js
// 内嵌块级作用域
{
  let i;
  for(i=0;i < count; i++){
    console.log(i)
  }
}
console.log(i)  // 抛出错误！

// 循环的块级作用域
for(let i = 0;i < count; i++){
  console.log(i)
}
console.log(i)  // 抛出错误！

// 说明IIFE用途的一个实际的例子，就是可以用它锁定参数值。比如：
const divs = document.querySelectorAll('div')

// 达不到目的
for(var i = 0; i< divs.length;i++){
  divs[i].addEventListener('click',function(){
    console.log(i)
  })
}
```

这里使用 `var` 关键字声明了循环迭代变量i，但这个变量并不会被限制for循环的块级作用域内。因此，渲染到页面上之后，点击每个div都会弹出元素总数。这是因为在执行淡季处理程序时，迭代变量的值已经上循环结束时的最终值了，即元素的个数。而且，这个变量存在于循环体外部，随时可以被访问。这里也可以用到 `IIFE` 解决。



#### DOM

细节：

- DOM操作在javascript代码中代价是比较高的，NodeList对象尤其需要注意。NodeList对象是`"实时更新"`的，这意味着每次访问它一次都要执行一次查询。考虑到这些问题，实践中要尽量减少DOM操作数量。
- MutaionObserver是为代替性能不好的MutaionEvent而问世的。使用它可以有效精准监控DOM变化，而且api相对简单。



#### 动画与Canvas图形

- 虽然使用setInterval()的定时动画比使用多个setTimeout()实现循环效率更高，但也不是没有问题。无论是setInterval()还是setTimeout()都是`不能保证时间精度`的。作为第二个参数的延时只能保证何时会把代码添加到浏览器的`任务队列`，不能保证添加到任务队列就会立即执行。如果队列前面还有其他任务，那么就要等那些任务执行完毕再执行。简单来说，这里毫秒延时并不是何时这些代码就会执行，而只是说到了这个时间就会把回调添加到任务队列。如果添加到队列后，主线程还在被其他任务占用，比如正在处理用户操作，那么回调就不会马上执行。

> 解决方法：使用requestAnimationFrame方法


#### 网络请求与远程资源

###### 跨源资源共享

通过 `XHR` 进行ajax通信的一个主要限制是 `跨源安全策略`。默认情况下，XHR只能访问与发起请求页面在同一个域内的资源。

- ###### 预检请求

  - 简介：COES通过一种叫 `预检请求` 的服务器验证机制，允许使用自定义头部、除了GET和POST之外的方法，以及不同请求体内容类型。在要发送涉及上述某种高级选项的请求时，会先向服务器发送一个"预检"请求。这个请求使用options方法发送并包含一下头部。
    - Origin：与简单请求相同。
    - Access-Control-Request-Method：请求希望使用的方法。
    - Access-Control-Request-Headers：（可选）要使用的逗号分隔的自定义头部列表。

###### 替代性跨源技术

- ###### 图片探测

  - 简介：图片探测是利用 `<img>` 标签实现跨域通信的最早的一种技术。任何页面都可以跨域加载图片而不必担心限制，因此这也是在线广告追踪的主要方式。可以动态创建图片，任何通过它们的 `onload` 和 `onerror` 事件处理程序得知何时收到响应。
  - 图片探测是与服务器之间 `简单` 、`跨域` 、`单向` 的通信。

###### Fetch API

- 简介：Fetch API能够执行 XMLHttpRequest 对象的所有任务，但更容易使用，接口也更现代化，能够在Web工作线程等现代Web工具中使用。XMLHttpRequest可以选择异步，而Fetch API则必须是异步。Fetch API 本身是使用javascript请求资源等优秀工具，同时这个API也能够应用在服务线程（service worker） 中，提供拦截、重定向和修改通过fetch（）生成的请求接口。

###### Beacon API

- 简介：为了把尽量多的页面信息传到服务器，很多分析工具需要在页面生命周期中尽量晚的时候向服务器发送遥测或分析数据。因此，理想情况下是通过浏览器的 `unload` 事件发送网络请求。

> 在unload事件处理程序中创建的任何的异步请求都会被浏览器取消。

###### Web Socket

- 简介：

  ​Web Socket（套接字）的目标是通过一个长时连接实现与服务器 `全双工` 、`双向` 的通信。javacript中创建Web Socket时，一个HTTP请求会发送到服务器以初始化连接。

  ​因为Web Socket使用了自定义协议，所以URL方案（scheme）稍有变化：不能再使用 `http://` 或 `https://`，而要使用 `ws://` 或 `wss://`。前者是不安全的连接，后者是安全连接。 

  ​使用自定义协议而非HTTP协议的好处是，客户端与服务端之间可以发送非常少的数据，不会对HTTP造成任何负担。使用更少的数据包让 Web Socket 非常适合**带宽**和**延迟**问题比较明显的移动应用。使用自定义协议的缺点是，定义协议的时间比定义Java script API要长。

- API

​		要创建一个Web Socket，就要实例化一个 `WebSocket`  对象并传入提供连接的URL：

```js
const socket = new WebSocket('绝对路径的url地址');
```

​		注意，必须给WebSocket构造函数传入一个绝对URL。同源策略不适用于Web Socket，因此可以打开到任意站点的连接。至于是否与来自特定源的页面通信，则完全取决于服务器。（在**握手**阶段就可以确定请求来自哪里）

​		WebSocket.OPENING(0)：连接正在建立。

​		WebSocket.OPEN(1)：连接已经建立。

​		WebSocket.CLOSING(2)：连接正在关闭。

​		WebSocket.CLOSE(3)：连接已关闭。

> 任何时候都可以调用close()方法关闭WebSocket的连接。
>
> socket.close()

- 发送和接收数据

​		服务器向客户端发送消息时，WebSocket对象上会触发**message**事件。

```js
socket.onmessage = function (event) {
  const data = event.data
}
```

- 其他事件

> WebSocket对象不支持DOM Level2事件侦听器，因此需要使用DOM Level0风格的事件处理程序来侦听这些事件。

```js
const socket = new WebSocket('url')

socket.onopen = function (){
  ...
}
 
socket.onerror = function (){
  ...
}
  
socket.onclose = function (){
  ...
}
```

在这些事件中只有**close**事件的event对象有额外信息。这个对象有三个属性：

- wasClean：是一个布尔值，表示连接是否干净地关闭；
- code：是一个来自服务器的数值状态码；
- reason：是一个字符串，包含服务器发来的信息。

## 你不知道的JavaScript系列-上卷

## 你不知道的JavaScript系列-中卷

## 你不知道的JavaScript系列-下卷

## JavaScript设计模式

## 学习JavaScript数据结构与算法