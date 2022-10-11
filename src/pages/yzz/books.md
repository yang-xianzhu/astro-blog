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

###### 安全

​		在未授权系统可以访问某个资源时，可以将其视为**跨站点请求伪造**（CORF）攻击。未授权系统会按照处理请求的服务器的要求伪装自己。Ajax应用程序，无论大小，都会受到CSRF攻击的影响，包括无害的漏洞验证攻击和恶意的数据盗窃或数据破坏攻击。

​		关于安全防护Ajax相关URL的一般理论认为，需要验证请求发送者拥有对资源的访问权限，可以通过一下方式实现：

- 要求通过SSL访问能够被Ajax访问的资源。
- 要求每个请求都发送一个按约定算法计算好的令牌（token）。

​	注意：以下手段对防护CSRF攻击是无效的。

- 要求POST而非GET请求（很容易修改请求方式）
- 使用来源URL验证来源（来源URL很容易被修改）
- 基于cookie验证（同样很容易被伪造）

​	

###### 小结

- XHR的一个主要限制是同源策略，即通信只能在**相同域名**、**相同端口**、**相同协议**的前提下完成。
- 图片探测和JSONP是另外两种跨域通信技术，但没有CORS那么可靠。
- Fetch API是作为对XHR对象的一种端到端的替代方案而提出的。这个API提供了优秀基于期约（promise）的结构、更直观的接口，以及对 Stream API的最好支持。

#### 客户端存储

1. ###### cookie：

​		HTTP cookie 通常也叫做cookie。最初用于在客户端存储会话信息。这个规范要求服务器在响应HTTP请求时，通过发送Set-CookieHTTP头部包含会话信息。

​		浏览器会存储这些会话信息，并在之后的每次请求都会通过HTTP头部cookie再将它们吗发回服务器。

- 限制

​		cookie是与特定域绑定的。设置cookie后，它会与请求一起发送到创建它的域。这个限制能保证cookie中存储的信息只对被认可的接收者开放，不被其他域访问。

​		因为cookie存储在客户端机器上，所以为了保证它不会被恶意使用，浏览器会施加限制。，同时cookie也不会占用太多磁盘空间。

通常，只要遵守以下大致的限制，就不会在任何浏览器碰到问题。

- 不超过**300**个cookie；
- 每个cookie 不超过**4096**字节；
- 每个域不超过**20**个cookie；
- 每个域不超过**81920**字节；

每个域能设置的cookie总数也是受限的，但不同浏览器的限制不同。

- 最新版IE和Edge限制每个域不超过**50**个cookie；
- 最新版Firefox限制每个域不超过**150**个cookie；
- 最新版Opera限制每个域不超过**180**个cookie；
- Safari和Chrome对每个域的cookie数没有硬性控制；

> 注意：
>
> 这个大小限制适用于一个域的所有cookie，而不是单个cookie。
>
> 如果创建的cookie超过最大限制，则该cookie会被静默删除。

- 使用cookie的注意事项

​		因为所有cookie都会作为请求头部由浏览器发送给服务器，所以在cookie中保存大量信息可能会影响特定域浏览器请求的性能。保存的cookie越大，请求完成的时间就会越长。既使浏览器对cookie大小有限制，最好还是尽可能值通过cookie保存必要信息，以避免性能问题。

2. Web Storage

​		Web Storage 最早是网页超文本应用技术工作组在 Web Applications1.0规范中提出的。Web Storage的目的是解决通过客户端存储不需要频繁发送回服务器的数据时使用cookie的问题。

​		Web Storage规范有两个目标：

- 提供在cookie之外的存储会话数据的途径。
- 提供跨会话持久化存储大量数据的机制。

​		Web Storage 的localStorage 和 sessionStorage。localStorage是永久存储机制，sessionStorage 是跨会话的存储机制。

> 注意：Web Storage 第一版曾使用过 globalStorage，不过目前globalStorage已废弃了。

​		所有现代浏览器在实现存储写入时都使用了**同步阻塞**方式，因此数据会被立即提交到存储中。具体API到实现可能不会立即把数据写入磁盘（而是使用某种不同物理存储），但这个区别在JavaScript层面是不可见的。通过Web Storage写入的任何数据都可以立即被读取。

​		老版本的IE以异步方式实现的数据写入，因此给数据赋值的时间和数据写入磁盘的时间可能存在延迟。

- 存储事件

每当Storage对象发生变化时，都会在文档上触发**storage**事件。使用属性或者setItem（）设置值，使用delete或removeItem（）删除值，以及每次调用clear（）时都会触发这个事件。

1. domain：存储变化对应的域。
2. key：被设置或删除的键。
3. newValue：键被设置的新值，若键被删除则为null。
4. oldValue：键变化之前的值。

```js
window.addEventListener('storage', (event)=>{
  // ...
})
```

对于sessionStorage 和 localStorage 上的任何更改都会触发 storage 事件，但storage事件不会区分这两者。

- 限制

不同浏览器给 localStorage 和 sessionStorage 设置了不同的空间限制，但大多数会限制每个源5MB。

3. IndexedDB

Indexed Database API简称**IndexedDB**，是浏览器中存储结构化数据的一个方案。

IndexedDB的设计几乎完全是**异步**的。

- 数据库

与传统数据库最大的区别在于，IndexedDB使用对象存储而不是表格保存数据。

4. 限制

IndexedDB数据库是与页面源（协议、域名、端口号）绑定的，因此信息不能跨域共享。



## 你不知道的JavaScript系列-上卷

## 你不知道的JavaScript系列-中卷

## 你不知道的JavaScript系列-下卷

## JavaScript设计模式

## 学习JavaScript数据结构与算法