---
title: React
description: React
layout: ../../../layouts/MainLayout.astro
---

待...

## 类组件中的setState是同步的还是异步的

**react18之后一定是异步**，setState设计为异步，可以显著的提升性能：（在react18之前，setState在setTimeout里面是同步执行的）

-   如果每次调用setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；
-   最好的方法应该是**获取到多个更新，之后进行批量更新，每次setState操作都推入到一个队列（queue）里面，然后批量处理**；

如果同步更新state，但是还没有执行render函数，那么state和props不能保持同步

-   state和props不能保持一致性，会在开发中产生很多的问题

## react中为什么需要setState

因为vue中通过对数据进行劫持，当我们修改数据的时候，会触发set重新渲染更新，vue2使用的`Object.defineProperty`，vue3使用的是ES6中的`Proxy`。而react并没有对数据进行劫持，所以**需要显式的调用setState方法告知react数据已经发生改变了**。

## react和vue对数据管理和界面渲染的流程解析

-   vue中，当我们修改属性时，就会触发set，然后重新调用内部的render函数，进行diff对比，重新渲染。
-   react中（类组件中），当我们显示调用this.setState()方法时，进行重新render，然后进行diff对比，尽管有时候数据并没有发生改变，只是调用了this.setState()，也是会重新渲染，我们可以通过`shouldComponentUpdate`方法进行判断需不需要更新，该钩子里返回true代表需要更新渲染，false则代表不需要重新渲染。
