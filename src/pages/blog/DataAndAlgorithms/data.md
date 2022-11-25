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
### 利用WeakMap创建栈

`WeakMap`可以存储键值对，其中键是对象，值可以是任意数据类型。

```js
const items = new WeakMap()

class Stack{
  constructor(){
    items.set(this,[])
  }
  push(item){
   const e = items.get(this)
   e.push(item)
  }
  pop(){
   const e = items.get(this)
   return e.pop()
  }
  // ...
}
```

### 用栈解决问题

栈的时机应用非常广泛。在**回溯**问题中，它可以存储访问过的任务或路径、撤销的操作。

##### 利用栈实现从十进制到二进制的转换

```js
function decimalToBinary(decNumber){
  const stack = new Stack()
  let number = decNumber
  let rem,
      bomaryString = ''
  while(number > 0){
    rem = Math.floor( number % 2 )
    stack.push(rem)
    number = Math.floor( number / 2)
  }
  while( !stack.isEmpty()){
    bomaryString += stack.pop().toString()
  }
}

decimalToBinary(10)   // 1010
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

-   addFront：该方法在双端队列前端添加新的元素
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

## 链表

### 链表

要存储多个元素，数组（或列表）可能是最常用的数据结构。数组给我吗提供了便利的`[]`语法来访问其元素。然而这种数据结构有一个缺点：（在大多数语言中）数组的大小是固定的，从数组的起点或中间插入或移除项的成本很高，因为需要移动元素。（尽管JavaScript有来自Array类的方法，比如spilce可以帮助我们做这些事情，但背后的实现都是一样的）。

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和指向下一个元素的引用（也称指针或链接）组成。

相对于传统的数组，链表的一个好处在于：添加或移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。在数组中，我们可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，则需要从起点（表头）开始迭代链表直到找到所需的元素。

现实中也有一些链表的例子。就是康加舞队。每个人都是一个元素，手就是链向下一个人的指针。可以向队列中添加人-只需要找到想加入的点，断开连接，插入一个人，再重新连接起来。

另外一个例子就是寻宝游戏。你有一条线索，这条线索就是指向寻找下一个线索的地点的指针。你顺着这条链接其下一个地点，得到另外一条指向再下一处的线索。得到链表中间的线索的唯一办法，就是从起点（第一条线索）顺着链表寻找。

### 双向链表

**双向链表**和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接，而在双向链接中，链接是双向的；一个链向下一个元素，另外一个链向前一个元素。

双向链表一般提供两种迭代的方法：从头到尾、从尾到头。

在单向链表中，如果迭代时错过了要找的元素，就需要回到起点，重新开始迭代。这是双向链表的一个优势。

### 循环链表

**循环链表**可以像链表一样只有单向引用，也可以像单向链表一样有双向引用。循环

链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针不是引用`undefined`，而是指向第一个元素。

### 有序链表

**有序链表**是指保持元素有序的链表结构。除了使用排序算法之外，我们还可以将元素插入到正确的位置来保证链表的有序性。

## 集合

### 构建数据集合

**集合**是由一组**无序且唯一**（即不能重复）的项组成。该数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。

在数学中，集合是一组不同对象的集。**空集**就是不包含任何元素的集合。用`{}`来表示。你可以把集合想象成一个既没有重复元素，也没有顺序概念的数组。

### 创建集合类

```js
class MySet{
  constructor(){
    this.items = {}
  }
}
```

这里使用了对象而不是数组来表示集合，JavaScript的对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的。

-   add：向集合添加一个新元素
-   delete：从集合移除一个元素
-   has： 如果元素在结合中，返回true，否则返回false
-   clear：移除集合中的所有元素
-   size：返回集合所包含元素的数量。和数组的length属性类似
-   values：返回一个包含集合中所有值（元素）的数组

#### 实现has方法

```js
has(ele){
  return ele in this.items
}
```

使用JavaScript的in运算符来检验给定元素是否是items对象的属性，又或者是以下这种写法：

```js
has(ele){
  return Object.prototype.hasOwnProperty.call(this.items,ele)
}
```

Object原型有`hasOwnProperty`方法。该方法返回一个表明对象是否具有特定属性的布尔值。`in`运算符则返回表示对象在原型链上是否有特定属性的布尔值。

我们也可以使用this.items.hasOwnProperty(ele)。但是，如果这样的话，代码检查工具，比如ESLint会抛出一个错误。错误的原因不是所有的对象都继承了Object.prototype，甚至继承了Object.prototype的对象上的hasOwnProperty方法也有可能被覆盖，导致代码不能正常工作。所以使用Object.prototype.hasOwnProperty.call是更安全的做法。

#### 实现add方法

```js
add(ele){
  if(!this.has(ele)){
    this.items[ele] = ele
    return true
  }
    return false
  
}
```

添加一个元素的时候，把它同时作为键和值保存，因为这样有利于查找该元素。

#### 实现delete和clear方法

```js
delete(ele){
  if(this.has(ele)){
    delete this.items[ele]
    return true
  }
  return false
}

clear(){
  this.items = {}
}
```

#### 实现size方法

返回集合中有多少个元素

```js
size(){
  return Object.keys(this.items).length
}
```

这里直接使用了Object类的一个内置方法。

#### 实现values方法

```js
values(){
  return Object.values(this.items)
}
```

### 多重值（袋）

**多重值（或袋）** 在计算集合中元素**出现次数**时很有用，它在数据库系统中得到了广泛运用。

## 字典和散列表

在字典（或映射）中，我们用[键，值]对的形式来存储数据。在散列表中也是一样（也是一[键，值]对的形式来存储数据）。但是两种数据结构的实现方式略有不同，例如字典中的每个键只能有一个值。

### 字典

在字典中，存储的是[键，值]对，其中**键名是用来查询特定元素**的。字典和集合很相似，集合以[值，值]的形式存储元素，字典则是以[键，值]的形式来存储元素。字典也称作**映射、符号表或关联数组**。在计算机科学中，字典经常用来保存对象的引用地址。

### 散列表

**散列**算法的作用是尽可能快地在数据结构中找到一个值。我们找到在很多数据结构中，要想获取一个值，可能需要迭代整个数据结构来找到它。如果使用散列函数就知道值的具体位置，因此能够快速检索到该值。**散列函数的作用是给定一个键值，任何返回值在表中的地址**。

当我们在关系型数据库（MySQL、Oracle）中创建一个新的表时。一个不错的做法是同时创建一个索引来更快地查询到记录的key。在这种情况下，散列表可以用来保存键和对表中记录的引用。另外一个很常见的应用是使用散列表来表示对象。JavaScript语言内部就是使用散列表来表示每个对象。此时，对象的每个属性和方法（成员）被存储为key对象类型，每个key指向对应 对象成员。