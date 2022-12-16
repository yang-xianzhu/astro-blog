---
title: React
description: React
layout: ../../../layouts/MainLayout.astro
---

## 类组件中的 setState 是同步的还是异步的

**react18 之后一定是异步**，setState 设计为异步，可以显著的提升性能：（在 react18 之前，setState 在 setTimeout 里面是同步执行的）

- 如果每次调用 setState 都进行一次更新，那么意味着 render 函数会被频繁调用，界面重新渲染，这样效率是很低的；
- 最好的方法应该是**获取到多个更新，之后进行批量更新，每次 setState 操作都推入到一个队列（queue）里面，然后批量处理**；

如果同步更新 state，但是还没有执行 render 函数，那么 state 和 props 不能保持同步

- state 和 props 不能保持一致性，会在开发中产生很多的问题

## react 中为什么需要 setState

因为 vue 中通过对数据进行劫持，当我们修改数据的时候，会触发 set 重新渲染更新，vue2 使用的`Object.defineProperty`，vue3 使用的是 ES6 中的`Proxy`。而 react 并没有对数据进行劫持，所以**需要显式的调用 setState 方法告知 react 数据已经发生改变了**。

## react 和 vue 对数据管理和界面渲染的流程解析

- vue 中，当我们修改属性时，就会触发 set，然后重新调用内部的 render 函数，进行 diff 对比，重新渲染。
- react 中（类组件中），当我们显示调用 this.setState()方法时，进行重新 render，然后进行 diff 对比，尽管有时候数据并没有发生改变，只是调用了 this.setState()，也是会重新渲染，我们可以通过`shouldComponentUpdate`方法进行判断需不需要更新，该钩子里返回 true 代表需要更新渲染，false 则代表不需要重新渲染。

## redux 中间件是干嘛的

redux 会在整个生命周期的不同阶段去调用不同的中间件以达到不同的目的。
