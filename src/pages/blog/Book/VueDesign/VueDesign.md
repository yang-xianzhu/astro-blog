---
title: VueJs程序与设计
description: VueJs程序与设计
layout: ../../../../layouts/MainLayout.astro
---

### 权衡的艺术

#### 命令式和声明式

- 命令式更**关注过程**
- 声明式更**关注结果**

`Vue`的内部实现就是**命令式**的，但是暴露给用户的却是**声明式**的。

### 原始值的响应式方案

在`JavaScript`中，原始值是**按值传递**的，而非**引用传递**。这意味着，如果一个函数接收原始作为参数，那么形参和实参之间没有引用关系，它们是两个完全独立的值，对形参的修改不回影响实参。另外，JavaScript中的Proxy无法提供给原始值的代理，因此想要将原始值变成响应式数据，就必对其做一层包裹，也就是`ref`。

#### 引入ref的概念

由于`Proxy`的代理目标必须是非原始值，所以我们没有任何手段拦截对原始值的操作，例如：

```js
let str = 'yxz'
// 无法拦截对值的修改
str = 'hello'
```

对于这个问题，我们可以使用一个非原始值去**包裹**原始值，例：

```js
const wrapper = {
  value:'yxz'
}

const name = reactive(wrapper)
name.value // yxz
// 修改值能触发响应
name.value = 'hello'
```

但是这样做会导致两个新的问题：

- 用户为了创建一个新的响应式的原始值，不得不顺带创建一个包裹对象(有心智负担)。
- 包裹对象由用户定义，而这意味着不规范，因为用户可以随意命名。

为了解决这些问题，我们可以封装一个函数，将包裹对象的创建工作封装到函数中：

```js
// 封装一个ref函数
function ref(val){
  const wrapper = {
    value:val
  }
  // 转换成响应式对象并返回
  return reactive(wrapper)
}
```

我们把创建`wrapper`对象的工作封装到ref函数内部了，然后通过`reactive`函数将包裹对象变成响应式对象并返回出去。

```js
// 创建原始值的响应式对象
const refVal = ref(1)

effect(()=>{
  console.log(refVal.value)
})

// 触发响应
refVal.value = 2
// 1
// 2
```

但是我们还需要处理一个问题，就是如何判断一个对象是否是`ref`对象，也方便以后实现**自动脱ref**。

```js
// 其实我们可以在包装对象的时候就可以处理这个问题
function ref(val){
  const wrapper = {
    value:val
  }
  // 使用Object.defineProperty给wrapper对象定义一个不可枚举的属性_v_isRef，并且值为true
  Object.defineProperty(wrapper,'_v_isRef',{
    value:true
  })
  // 转换成响应式对象并返回
  return reactive(wrapper)
}
```

这样以后我们就可以通过`_v_isRef`来判断一个对象是否是一个ref对象了。

#### 响应式丢失问题

**ref除了能够用于原始值的响应式方案之外，还能用来解决响应式丢失问题**。我们首先来看看什么是响应式丢失，比如我们在编写Vue.js组件时，我们可以通过把数据暴露到模版上使用：

```js
<h1>{{foo}}</h1>

// js
export default {
  setup(){
    const obj = reactive({foo:1,bar:2})
    return {...obj}
  }
}
```

`h1`标签正常显示1，然而这样做会导致响应式丢失，也就是当我们修改其值的时候，不会触发重新渲染：

```js
<h1>{{foo}}</h1>

// js
export default {
  setup(){
    const obj = reactive({foo:1,bar:2})
    // 此时修改obj.foo并不会触发重新渲染
    setTimeout(()=>{
      obj.foo = 2
    })
    return {...obj}
  }
}
```

原因就是展开运算法`...`导致的。实际上以下代码是一样的：

```js
return {
  ...obj
}
// 等效于
return {
  foo:1,
  bar:2
}
```

我们可以发现，这其实就是返回一个普通对象，它并不具有任何响应式能力。把一个普通对象暴露到模版中使用，是不会在渲染函数与响应式数据之间建立响应联系的。所以当我们尝试修改obj.foo的值时，不会触发重新渲染。

```js
const obj = reactive({foo:1,bar:2})

// 将响应式对象展开到一个新的对象newObj
const newObj = {...obj}

effect(()=>{
  // 在副作用函数内通过新的对象newObj读取foo属性值
  console.log(newObj.foo)
})
// 并不会触发响应
newObj.foo = 999
```

以上代码，首先创建了一个响应式的数据对象obj，然后使用展开运算符得到一个新对象newObj，它是一个普通对象，不具有响应能力。关键点在于，副作用函数内访问的普通对象newObj，它没有任何响应能力，所以当我们尝试修改obj.foo的值时，不会触发副作用函数重新执行。

那么有没有方法能够帮助我们实现；在副作用函数内，即使通过普通对象newObj来访问属性值，也能建立响应联系呢？

```js
const obj = reactive({foo:1,bar:2})

// newObj对象具有与obj对象同名的属性，并且每个属性值都是一个对象
// 该对象具有一个访问器属性value，当读取value的时候，其实就是读取obj对象下相应的属性
const newObj = {
  foo:{
    get value(){
      return obj.foo
    }
  },
  bar:{
    get value(){
      return obj.bar
  }
}
}

effect(()=>{
  // 在副作用函数内通过新的对象newObj读取foo属性值
  console.log(newObj.foo)
})
// 这时能够触发响应
newObj.foo = 999
```

newObj中有一个访问器属性value，当读取value的值时，最终读取的是响应式数据obj下的同名属性。所以当在副作用函数内读取newObj.foo时，等价于间接读取了obj.foo的值，这样响应式数据就能与副作用函数建立响应联系。所以当我们修改newObj.foo的值时，能够触发副作用函数重新执行。

我们观察newObj对象，就可以发现很多相似之处：

```js
const newObj = {
  foo{
    get value(){
      return obj.foo
    }
  },
  bar{
    get value(){
      return obj.bar
    }
  }
}
```

`foo`和`bar`属性的结构非常像。所以我们把它们抽离成函数：

```js
function toRef(obj,val){
 const wrapper = {
    get value(){
      return obj[k]
    }，
   // 设置值
    set value(val){
      obj[k] = val
    }
  }
  return wrapper
}
```

`toRef`接收两个参数，一个参数obj是一个响应式数据，第二个参数是obj对象下的一个键。函数会返回一个类似ref结构的wrapper对象。现在我们就可以使用toRef函数去实现newObj成为响应式的数据了。

```js
const newObj = {
  foo:toRef(obj,'foo'),
  bar:toRef(obj,'bar')
}
```

我们再封装一个可以处理目标对象的所有键的函数`toRefs`：

```js
function toRefs(obj){
  const warpper = {}
  for(const k in obj){
    warpper[k]:toRef(obj,k)
  }
  return warpper
}
```

现在我们就可以一步完成对一个对象的转换：

```js
const newObj = {...toRefs(obj)}
```

我们还会通过`toRef`和`toRefs`函数转换后得到的结果视为真正的ref数据。

```js
function toRefs(obj){
  const warpper = {}
  for(const k in obj){
    warpper[k]:toRef(obj,k)
  }
  // add
  Object.defineProperty(wrapper,'_v_isRef',{
    value:true
  })
  return warpper
}
```

**ref的作用不仅仅是实现原始值的响应式方案，它还可以用来解决响应式丢失问题。**

#### 自动脱ref

`toRefs`函数解决了响应丢失问题，但同时也带来了新的问题。由于`toRefs`会把响应式数据的**第一层**属性值转换为ref，因此必须通过value属性访问值，如下所示：

```js
const obj = reactive({foo:1,bar:2})

// 将响应式对象展开到一个新的对象newObj
const newObj = {...toRefs(obj)} 
// 现在我们必须通过value访问值
newObj.foo.value // 1
newObj.bar.value // 2
```

比如我们在vue编写组件模版的时候，需要这样写，明显是增加了用户的心智负担。

```js
<template>
	<p>{{newObj.foo.value}}</p>
	<p>{{newObj.bar.value}}</p>
</template>

// 相比以上，我们肯定更希望不用每次都.value,也就是自动解包
<template>
	<p>{{newObj.foo}}</p>
	<p>{{newObj.bar}}</p>
</template>
```

需要实现此功能，需要使用proxy为newObj创建一个代理对象，通过代理来实现最终目标，现在我们就可以使用上面添加用来标记是否是`ref`对象的`_v_isRef`属性了。

```js
function proxyRefs(target){
  return new Proxy(target,{
    get(target,key,receiver){
      const value = Reflect.get(target,key,receiver)
      // 如果value是ref对象，则直接返回.value后的结果
      return value._v_isRef ? value.value : value
    }
  })
}
```

现在就可以实现自动解包ref了。实际上，我们在编写vue.js组件时。组件中的`setup`函数所返回的数据会传递给`proxyRefs`函数进行处理：

```js
export default {
  setup(){
    const obj = reactive({foo:1,bar:2})
    return {obj}
  }
}
// 已经通过proxyRefs函数处理后，可以不用.value了
<template>
	<p>{{obj.foo}}</p>
	<p>{{obj.bar}}</p>
</template>
```

不仅仅读取值需要自动脱ref，我们设置值的时候也应该有自动脱ref的能力：

```js
function proxyRefs(target){
  return new Proxy(target,{
    // 读取值
    get(target,key,receiver){
      const value = Reflect.get(target,key,receiver)
      // 如果value是ref对象，则直接返回.value后的结果
      return value._v_isRef ? value.value : value
    },
    // 设置值
    set(target,key,newValue,receiver){
      const value = target[key]
      if(value._v_isRef){
        value.value = newValue
        // 表示设置成功！
        return true
      }
      return Reflect.set(target,key,newValue,receiver)
    }
  })
}
```

上面代码所述，我们为proxyRefs函数返回一个代理对象添加了`set`函数。如果设置的属性是一个ref，则间接设置该ref的value属性的值即可。

现在reactve函数也有自动脱ref的能力了。

```js
const count = ref(0)
const obj = reactive({count})

obj.count // 0
```

#### 总结

`ref`本质上上一个**包裹对象**。因为JavaScript的proxy无法提供对原始值的代理，所以我们需要使用一层对象作为包裹，间接实现原始值的响应式方案。由于包裹对象本质上与普通对象没有任何区别，因此为了区分`ref`对象与普通响应式对象，我们还为包裹对象定义了一个标记是否是ref对象的不可枚举的属性`_v_isRef`。

ref除了用于原始值的响应式方案之外，还能用来解决响应式丢失问题。