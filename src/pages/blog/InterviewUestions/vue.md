---
title: Vue
description: Vue面试题
layout: ../../../layouts/MainLayout.astro
---

### 说说虚拟DOM

虚拟DOM就是用来`js`对象来描述真实DOM的，用来最小化找出新旧DOM的差异，以及减少对比性能，比如我们使用`Vue`编程是**声明式**的，其实这也是Vue底层用**命令式**的代码帮我们封装好了，我们可以直接用**声明式**来编码，其实用虚拟DOM的更新技术理论上不可能比原生JavaScript操作DOM更快的。

### 父子组件的渲染顺序（vue2）

- 同步组件

  - 加载阶段

  ```vue
  父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
  ```

  - 更新阶段

  ```vue
  父beforeUpdate->子beforeUpdate->子updated->父updated
  ```

  - 销毁阶段

  ```vue
  父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
  ```

- 异步组件 即通过 `()=> import('...')`方式引入组件

  - 加载阶段

  ```vue
  父beforeCreate->父created->父beforeMount->父mounted->子beforeCreate->子created->子beforeMount->子mounted
  ```

  - 更新阶段

  ```vue
  父beforeUpdate->子beforeUpdate->子updated->父updated
  ```

  - 销毁阶段

  ```vue
  父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed 
  ```

  

### v-if和v-show的使用场景

v-if：是通过动态删除和创建整个DOM元素的，相对而言更消耗性能，一般适用于非频繁切换显示/隐藏

v-show：是通过css的display：none来隐藏整个dom元素的，适用于频繁切换的应用场景

v-for和v-if的优先级

通过源码可以知道，当v-for和v-if同时使用在一个标签上，在vue2里v-for的优先级是比v-if高的，vue3中v-if优先级更高。

### 对vuex的理解

  vuex是用于`状态集中管理`和`数据共享`的，比如一些用户信息、token一般可以存储在vuex和localStorage，搭配使用。

  五大核心属性

- state   存储数据
- mutations  唯一可以直接修改state里面的数据的地方  `不可以执行异步代码`
- actions     `可以执行异步代码`，用于派发mutations来修改数据，可以在这里发请求
- getters   可以简化我们取vuex里面的数据，比如计算购物车的总价，类似于`计算属性`
- modules  当我们的项目很大的时候，vuex里面的数据多了，就很难去阅读了，可以`分模块`，比如用户信息模块  新闻列表模块等

### vue中的路由导航守卫

- 全局前置守卫

可以使用`router.beforeEach`注册一个全局前置守卫：

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

当一个导航被触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫`resolve`完之前一直处于`等待中`。

每个守卫方法接受两个参数：

- `to`：即将要进入的目标 用一种标准化的方式
- `from`：当前导航正要离开的路由 用一种标准化的方式
- `next`:**确保 next** 在任何给定的导航守卫中都被**严格调用一次**。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。这里有一个在用户未能验证身份时重定向到`/login`的**错误用例**：

可以返回的值如下：

- `false`：取消当前的导航。如果浏览器的URL改变了（可能是用户手动或者浏览器后退按钮），那么URL地址会重置到`from`路由对应的地址。
- 一个路由地址：通过一个路由地址跳转到一个不同的地址，就像调用`router.push()`一样，你可以设置诸如`repace:true` 或 `name:'home'`之类的配置。当前的导航被中断，然后进行一个新的导航，就和`from`一样。

- 全局解析守卫

可以用`router.beforeResolve`注册一个全局守卫。这和`router.beforeEach`类似，因为它在`每次导航`时都会触发，但是确保在导航被确认之前，`同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用`

`router.beforeResolve` 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

- 全局后置钩子

路由页面`跳转成功之后`执行的一个钩子，这里一般可以用于修改页面标题，声明页面等事情。

- 路由独享守卫

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

`beforeEnter` 守卫 **只在进入路由时触发**，不会在 `params`、`query` 或 `hash` 改变时触发。例如，从 `/users/2` 进入到 `/users/3` 或者从 `/users/2#info` 进入到 `/users/2#projects`。它们只有在 **从一个不同的** 路由导航时，才会被触发。

- 组件内守卫

可以在路由组件内直接定义路由导航守卫(传递给路由配置的)

可配置API

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from,next) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
    next(vm=>{
      console.log(vm)  // vm就可以拿到当前组件实例对象
    })
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
```

#### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### keep-alive的使用

```js
<keep-alive includes="['Son']">  
  // includes 是要指定哪些组件需要缓存，可以写成数组/正则/字符串，与组件里的name配对
  // excludes 指定哪些组件不需要缓存  .....
  // 需要缓存的组件
  <router-view />
</keep-alive>
```

### 有没有自定义过一些指令

- 一键copy文字
- 图片加载不出来，显示默认图片
- 表单自动获取焦点


### data、props、methods、watch、computed的优先级

`props` > `methods` > `data` > `computed` > `watch`

computed与watch的应用场景

computed：当多个数据依赖一个数据的时候，用computed，具有缓存性，必须有返回值，因为是依赖计算出来的这个值

watch：当一个数据依赖多个数据的时候，用watch，watch里面可以执行异步代码，computed不行.

### 生命周期

##### vue2:

`beforeCreate=>created `

 创建前创建完毕，

beforeCreate此时还没有el和data和methods,数据代理还没开始

created此时已经有data和methods了，数据代理也开始了

`beforeMount>mounted`

挂载前挂载完毕

beforeMount可以发送ajax请求，开启定时器、发布订阅等操作了

mounted 此时已经有DOM结构了，可以操作dom，但是不建议这么做

`beforeUpdata==>updated`

数据更新会触发这两个钩子，不能在updated这个钩子函数里面更新数据，这样会一直触发这个函数，会形成死循环。

`beforeDestroy==>destroyed`

beforeDestroy一般在这个钩子上，做一些收尾工作，比如==清除定时器==、==取消订阅==、==清除自定义事件==等.

##### vue3:

beforeDestroy 改为 beforeUnmount

destroyed 改为 unmounted

> vue2中当没有指定el要挂载的元素，beforeCreate和created都会触发
>
> vue3不会

### 对vue3有了解过吗

vue3中响应式用到了ES6中的 `Proxy` 代理对象，但是对于基本数据类型，还是用了Object.defineProperty来做响应式。

vue3中打包速度和更好支持TS，还有组合式API，数据和方法都整合到了setup函数里面（setup执行时机比beforeCreate还快，setup里面的this -undefined），比传统vue2的optionsApi能够更好更优雅的管理代码，可以把每个功能模块拆成一个hooks模块，需要就引入这个模块。

vue3中的Proxy性能更好，因为proxy侦听的对象本身，而defineProerty是遍历对象的每个属性，在性能消耗方面，vue3性能消耗更低。

由于Proxy，vue3能侦听到数组被修改，而vue2不能，但能通过那其中方法去改变（改变原数组的方法）,都知道，vue2中给对象后新增的属性是丢失了响应式的，而vue3没有，后新增的属性也是响应式的

新增了watchEffect API，它是一个函数，接受一个回调函数，它是非惰性的。在这个函数里面用到了某个数据，当你读取或修改了这个数据，就会被这个函数侦听到，从而触发这个回调函数，就可以在这个会回调里面写一些自定义逻辑了

移除了过滤器：因为像过滤器能实现的，用computed和methods也能实现，用过滤器，反而还有学习成本。

用到的内置api要单独按需引入

```js
例如：import {ref,reactive,watchEffect} from 'vue'
```

更好的浏览器红利

新增了 `ref`、`reactive` 函数

### vue3中做过哪些性能优化

reatvie与shallowReactive的区分使用场景，当一个数据结构是深层次的，但要做响应式的只有第一层的话，可以用shallowReactive

```js
import { shallowReactive } from 'vue'
exprot default {
  name:'xxx',
  setup(){
    const data = shallowReactive({
      name:'杨某某',
      age:18
    })
    return {data}
  }
}
```

### vue中nextTick的作用与原理

vue更新页面是采用了异步更新的，如果我们想要获取到最新的DOM，可以用vue给我们提供的nextTick，在它的回调里面可以拿到更新后的DOM元素,但是vue是不推荐我们直接操作DOM的,nextTick底层用了`promise.then`方法，如果浏览器不支持，就会使用`mutationObserver`、`setTimeout`

- nextTick的细节：如果你没有提供回调，它会返回一个`promise对象`，所以可以使用`async`、`await`

- 原理：

  vue更新数据是异步更新的，当发现数据变更，会开启一个队列，推进这个队列，当多次数据变更只会推进一次，这样会减少一些不必要的更新和计算。

### Vue.use原理 

概念:

如果插件是一个对象，必须提供 `install` 方法

如果插件是一个函数，它会被作为 `install` 方法，install方法调用时，会将Vue构造函数作为参数传入

> 注意:该方法需要在调用new Vue() `之前` 被调用

### vue中的token持久化存储

vue中存储token，一般像token这样的数据都要做持久化的，我们都知道存储在本地localStorage里面的数据只有在用户主动去清除才会被清除的，是持久的，但是还有一个问题，存储在localStorage里的数据不是响应式的，我们可以也存一份到vuex里，我们可以借助一个插件-- `persistedstate` 来做token持久化。

```js
1、安装
npm i persistedstate
2、导入插件
import persistedstate from 'vuex-persistedstate'
3、使用
modules: {},
plugins: [
  // 使用vuex数据持久化插件
  persistedstate({
    paths: ['tokenObj']
  })
]
```

### 当修改data时vue的组件重渲染是异步还是同步

vue更新数据是采用了异步策略的。当我们修改了数据，vue会开启一个队列，当多次触发修改数据，也只会被推进这个队列一次，因为这样可以避免不必要的计算更新视图，所以vue给我们提供了一个 `nextTick` 函数，它的回调里面可以拿到最新的dom。

### vue多组件嵌套通信方式

eventBus 事件总线  `适用于任意组件间通信`

props，从父组件逐层往下传递数据...

消息订阅与发布  需要安装插件

vue2.x后新增的provide与inject

发送方：

```js
import { provide } from 'vue'
provide('事件名',要传递的数据)
```

接收方：

```js
import { inject } from 'vue'
const res = inject('事件名')   // res 得到的就是数据
```

### this.$off 源码

```js
Vue.prototype.$off = function (event, fn) {
  var vm = this;   // 保存this
  // 当没有传参数，清空所有event事件
  if (!arguments.length) {
    vm._events = Object.create(null);  // 创建一个空对象
    return vm   // 返回这个空对象
  }
  // 当传入的是一个数组，遍历数组里的每一项并清空该事件
  if (Array.isArray(event)) {
    for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
      vm.$off(event[i$1], fn); 
    }
    return vm
  }
  // specific event
  var cbs = vm._events[event];
  if (!cbs) {
    return vm
  }
  if (!fn) {   // 如果没有传入回调函数，则只移除这个回调的监听器
    vm._events[event] = null;
    return vm
  }
  // specific handler
  var cb;
  var i = cbs.length;
  while (i--) {
    cb = cbs[i];
    if (cb === fn || cb.fn === fn) {
      cbs.splice(i, 1);
      break
    }
  }
  return vm
};
```

### 为什么vue中methods对象this能到data里面的数据---原理

```ts
function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      {
        if (typeof methods[key] !== 'function') {
          warn(
            "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
            "Did you reference the function correctly?",
            vm
          );
        }
        if (props && hasOwn(props, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a prop."),
            vm
          );
        }
        if ((key in vm) && isReserved(key)) {
          warn(
            "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
            "Avoid defining component methods that start with _ or $."
          );
        }
      }
      / bind绑定函数的的this指向vue构造函数 /
      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
}
```



### vue3的patch打补丁做了些什么

- 对比新旧vNode的tag`标签`有没有改变，没有再对比的`props`有没有改变

```js
// oldVNode 旧节点 newVnode  新节点
function ptach(oldVNode,newVnode){
if(oldVNode.tag === newVnode.tag){
 // 存储旧节点
  const el = oldVNode.el
  // props
  const oldProps = oldVNode.props || {}
  const newProps = newVNode.props || {}
  // 遍历新对象
  for(const key in newProps){
    const oldValue = oldProps[key]
    const newValue = newProps[key]
    // 当新旧的props发生改变了，把最新的props赋值给旧的节点
    if(newVlaue !== oldValue){
      el.setAttribute(key,newValue)
    }
  }
  // 遍历旧对象
  for(const key in oldProps){
    // 如果旧对象没有key
    if(!(key in newProps)){
      el.removeAttribute(key)
    }
  }
  // children
  const oldChildren = oldVNode.children
  const newChildren = newVNode.children
  if(typeof newChildren = 'string'){
  }
}
}
```

### vue3的细节

- compunted返回的是一个ref对象
- watch不能直接侦听一个字符串/数字，需要侦听的是`ref`对象

### 函数式组件

- 优点：
  - `函数式组件` 不会有状态，不会有 `响应式数据` ，也没有自己的 `生命周期钩子` 这些东西，所以性能比普通组件性能要好。
  - `函数式组件` 和普通的对象类型的组件不同，它不会被看作成一个真正的组件，我们知道在 `patch` 过程中，如果遇到一个节点是组件的` vnode` ，会递归执行子组件的初始化过程；而函数式组件的 `render` 生成的是普通的 `vnode` ，不会又递归的子组件的过程，因此渲染开销会低很多。

### computed的细节

```js
computed:{
  a(){
    return 100
  },
  b({a}){   // 入参可以拿到当前组件实例对象
    return a+100
  }
}
```

这样就不会在组件刷新时重新获取`getter`了，这也是性能优化的一种手段。

### vue3的渲染机制

- 渲染管线：

  从高层面的视角看，Vue组件挂载后发生了如下这几件事：

  - `编译`：Vue模板被编译为了`渲染函数`:即用来返回虚拟DOM数的函数。这一步骤可以通过构建步骤提前完成，也可以通过使用运行时编译器即时完成。
  - `挂载`：运行时渲染器调用渲染函数，遍历返回的虚拟DOM数，并基于它的创建实际的DOM节点。这一步会作为`响应式副作用`执行，因此它会追踪其中所用到的所有响应式依赖。
  - `更新`：当一共依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟DOM树。运行时渲染器遍历这颗新树，将它与旧树进行比较`diff`，然后将必要的更新应用到真实DOM上去。

- 模板 vs 渲染函数：

  Vue 模板会被预编译成虚拟 DOM 渲染函数。Vue 也提供了 API 使我们可以不使用模板编译，直接手写渲染函数。在处理高度动态的逻辑时，渲染函数相比于模板更加灵活，因为你可以完全地使用 JavaScript 来构造你想要的 vnode。

  那么为什么 Vue 默认推荐使用模板呢？有以下几点原因：

  1. 模板更贴近实际的 HTML。这使得我们能够更方便地重用一些已有的 HTML 代码片段，能够带来更好的可访问性体验、能更方便地使用 CSS 应用样式，并且更容易使设计师理解和修改。
  2. 由于其确定的语法，更容易对模板做静态分析。这使得 Vue 的模板编译器能够应用许多编译时优化来提升虚拟 DOM 的性能表现 (下面我们将展开讨论)。

  在实践中，模板对大多数的应用场景都是够用且高效的。渲染函数一般只会在需要处理高度动态渲染逻辑的可重用组件中使用。想了解渲染函数的更多使用细节可以去到[渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html) 章节继续阅读。

- 树结构打平：

  - 当这个组件需要重渲染时，只需要遍历这个打平的树而非整棵树。这也就是我们所说的**树结构打平**，这大大减少了我们在虚拟 DOM 协调时需要遍历的节点数量。模板中任何的静态部分都会被高效地略过。

### vue渲染流程

`template` 模板 或 `render` 渲染函数转换成 `vnode`虚拟节点，然后通过`mountElement`函数渲染成`element`真实DOM，再 `append(#app)`

> 注意：render渲染函数和template模板最终都会渲染成虚拟节点，但是render函数优先级更高，但是vue更推荐我们使用template模板写法，简单并且可以得益于diff时对于静态节点做静态提升的性能优化。



### vue中的custom render

- 简介：允许用户自定义目标渲染平台
- 动机：不再局限于浏览器dom平台，可以把vue的开发模型扩展到其他平台。
- 使用：
  - createRennder：创建渲染器
  - 实现渲染接口：
    - createElement：创建元素
    - Insert:插入元素到容器内
    - setElementText:设置元素到文字
    - createtext：创建一个文字
    - parebNode:返回元素到父节点
    - remove：移除元素
    - patchProp:设置props
  - createApp:基于renderer创建app实例
- 原理