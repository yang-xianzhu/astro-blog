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

