---
title: 数据结构
description: 数据结构
layout: ../../../layouts/MainLayout.astro
---

## 栈

栈是一种遵从**先进后出**原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作**栈顶**，另一端就叫**栈底**。在栈里，新元素都靠近栈顶，旧元素都靠近栈底。在生活中也能发现很多栈的例子：一堆书、餐厅里叠放的盘子。

栈也被用在编程语言的编译器和内存中保存变量、方法调用等，也被用于浏览器历史记录(用于浏览器的返回按钮)，每次浏览一条新的网页就往栈里存放一条记录。

### 创建一个基于数组的栈

- `push`：添加一个或者多个新元素到栈底
- `pop`：移除栈底的元素，同时返回被移除的元素
- `peek`：返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
- `isEmpty`：如果栈里没有任何元素就返回 true，否则返回 false
- `clear`：移除栈里的所有元素
- `size`：返回栈里的元素个数

```js
class Stack {
  constructor() {
    this.items = [];
  }

  // 添加一个或者多个新元素到栈底
  push(item) {
    const length = this.items.push(item);
    return length;
  }
  // 移除栈底的元素，同时返回被移除的元素
  pop() {
    const popItem = this.items[this.items.length - 1];
    this.items.pop();
    return popItem;
  }
  // 返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
  peek() {
    return this.items[0];
  }
  // 如果栈里没有任何元素就返回true，否则返回false
  isEmpty() {
    return !this.items.length;
  }
  // 移除栈里的所有元素
  clear() {
    this.items.length = 0;
  }
  // 返回栈里的元素个数
  size() {
    return this.items.length;
  }
}
```

### 创建一个基于对象的栈

为什么要使用对象来实现栈呢？因为在使用数组的时候，大部分方法的时间复杂度是**O(n)** 。**O(n)** 的意思是，我们需要迭代整个数组直到找到要找的那个元素，在最坏的情况下需要迭代数组的所有位置，其中的**n 代表数组的长度**。如果数组有更多的元素的话，所需要的时间会更长。，另外，**数组是元素的有序集合，为了保证元素排列有序，它会占用更多的内存空间。**

```js
class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  push(item) {
    this.items[this.count++] = item;
  }
  pop() {
    delete this.items[--this.count];
    this.count = this.count < 0 ? 0 : this.count;
  }
  peek() {
    return this.items[this.count - 1];
  }
  isEmpty() {
    return !this.items[0];
  }
  clear() {
    this.items = {};
    this.count = 0;
  }
  size() {
    return this.count;
  }
}
```
## 队列和双端队列

### 队列

队列是遵循**先进先出**(FIFO，也成为先来先服务)原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

在现实中，最常见的队列的例子就是排队。在电影院、自助餐厅、杂物店收银台，我们都会排队。排在第一位的人会先接受服务。

在计算机科学中，一个常见的例子就是打印队列。比如说我们需要打印五份文档。我们会打开每个文档，然后点击打印数据。每个文档都会发送至打印队列。第一个发送到打印队列的文档会首先被打印，以此类推，直到打印完所有文档。

#### 创建队列

使用类来创建一个队列：

```js
class Queue{
  constructor(){
    this._count = 0
    this._lowestCount = 0
    this.items = {}
  }
}
```

由于我们将要从队列的前段移除元素，同样需要一个比变量来帮助我们追踪第一个元素。因此，声明一个_lowestCount变量。

队列可用的方法：

-   enqueue()：从队列尾部添加一个/多个新的项
-   dequeue()：移除队列的第一项（即排在队列的最前面的项）并返回被移除的元素。
-   peek()：返回队列中的第一个元素——最先被添加，也将是最先被移除的元素。（仅作返回，不作移除）
-   isEmpty()：如果队列中不包含任何元素，返回true，否则返回false
-   size()：返回队列包含的元素个数，与数组的length属性类似。

```js
class Queue{
  constructor(){
    this._count = 0
    this._lowestCount = 0
    this._items = {}
  }
  size(){
    return this._count - this._lowestCount
  }
  isEmpty(){
    return this.size() === 0
  }
  enqueue(ele){
    this._items[this._count++] = ele
  }
  deueue(){
    if(this.isEmpty()) return undefined
    const res = this._items[this._lowestCount]
    delete this._items[this._lowestCount]
    this._lowestCount++
    return res
  }
}
```

### 双端队列

**双端队列**（deque，或称double-ended queue）是一种允许我们同时从前端和后端添加和移除元素的特殊队列。

双端队列在现实生活中的例子有电影院、餐厅中排队的队伍等。举个例子，一个刚买了票的人如果只是还需要再问一些简单的信息，就可以直接回到队伍的头部。另外，在队伍末尾的人如果赶时间，他可以直接离开队伍。

在计算机科学中，双端队列的一个常见应用是存储一系列的撤销操作。每当用户在软件中进行了一个操作，该操作会被存在一个双端队列中（就像在一个栈里面）。当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被后面移除了。在进行一些预先定义的一定数量的操作后，最先进行的操作会被从双端队列的前端移除。由于双端队列同时遵守了**先进先出（比如排队，第一个过来排队的人最先服务）** 和**后进先出（后面排队的有急事也可以先走）** 原则，可以说它是把队列和栈相结合的一种数据结构。

#### 创建双端队列

-   addFront：该方法在双端队列前端添加新的元素****
-   addBack：该方法在双端队列后端添加新的元素（实现方法与队列类中的**enqueue**方法相同）
-   removeFront：该方法会从双端队列前端移除第一个元素（实现方法与队列类中的**dequeue**方法相同）
-   peekFront：该方法返回双端队列前端的第一个元素（实现方法与队列类中的**peek**方法相同）
-   peekBack：该方法返回双端队列后端的第一个元素（实现方法与队列类中的**peek**方法相同）

```js
class Deque{
  constructor(){
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  // 向双端队列的前端添加元素
  addFront(ele){
    // 如果双端队列是空的，可以执行addBack方法将元素添加到双端队列中的后端
    if(this.isEmpty()){
      this.addBack(ele)
    }else if(this.lowestCount > 0){
      this.lowestCount--
      this.items[this.lowestCount] = ele
    }else{
      for(let i=this.count;i>0;i++){
        this.items[i] = this.items[i-1]
      }
      this.count ++
      this.lowestCount = 0
      this.items[0] = ele
    }
  }
}
```

-   第一个if分支：是这个双端队列是空的，在这种情况下，我们可以执行addBack方法将元素添加到双端队列中的后端。
-   第二个else if 分支：一个元素已经被从双端队列的前端移除，也就说lowestCount属性会大于等于1。这种情况下，我们只需要将lowestCount属性-1并将新元素的值放到这个键的位置上即可。
-   第三个else分支：是lowestCount为0的情况，我们可以设置一个负值的键，同时更新用于计算双端队列长度的逻辑，使其也能包含负键值。这种情况下，添加一个新元素的操作仍然能保持最低的计算成本。要在第一位添加一个新元素，我们需要将所有元素后移一位来空出第一个位置。由于我们不想失去任何已有的值，需要从最后一位开始迭代所有的值，并为元素附上索引值-1位置的值。在所有的元素都移动后，第一位将是空闲状态，这样就可以用需要添加的新元素来覆盖它了。
