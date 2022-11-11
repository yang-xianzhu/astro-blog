---
title: 下卷
description: books
layout: ../../../../layouts/MainLayout.astro
---

### 集合

#### Map

ES6之前我们需要存储键值对的集合时，只能使用对象作为映射，但对象作为映射的主要缺点**是不能使用非字符串值作为键**。

看看下面例子：

```js
const obj  = { name:'yxz'},
      obj1 = {name:'yzz'}

const res = {}

res[obj] = 'hello'
res[obj1] = 'hey'

res[obj]   // 'hey'
res[obj1]  // 'hey'
```

因为obj和ojb1两个对象字符串化都是`[object Object]`，所以res对象相当于设置了一个key，而后面的赋值把前面的覆盖掉了。

而ES6新增了一个数据结构`map(...)`，它的key和传统对象的key的区别是：`map(...)`的key可以是任意类型的，而传统对象的key只能是字符串类型。

##### 用法

```js
const obj = {
   name:'刘德华'
}

const obj1 ={
   name:'黎明'
}

const m = new Map()

// 设置一对值
m.set(obj,'ldh')
m.set(obj1,'lm')

// 读取值
m.get(obj)  // 'ldh'
m.get(obj1) // 'lm'
```

> 注意这里不能像对象那样使用**[]**来获取key的值，但同等可以使用**get(...)**方法来获取。

##### 从map中删除一个元素

需要从map中删除一个元素，不能像对象那样使用`delete操作符`，取而代之的是`delete(...)`方法。

```js
const x = {
  name:'张学友'
}

const y = {
  name:'周星驰'
}

const m = new Map()

// 设置一对值
m.set(x,'zxy')
m.set(y,'zxc')
// 集合里元素个数
m.size. // 2
// 删除一个元素
m.delete(x)   
// 集合里元素个数
m.size  // 1
```

##### 清空map中的所有元素

```js
const x = {
  name:'张学友'
}

const y = {
  name:'周星驰'
}

const m = new Map()

// 设置一对值
m.set(x,'zxy')
m.set(y,'zxc')

m.size.  // 2
m.clear()
m.size.  // 0
```

map(...)构造器也可以接受一个`iterable`，这个迭代器必须产生一列数组，每个数组的第一个元素是键(key)，而第二个元素是值(value)。跟entries(...)方法产生的形式是完全一样的。

```js
const m = new Map()

const x = {
  name:'张学友'
}

const y = {
  name:'周星驰'
}

const m2 = new Map( m.entries() )
// 等价于以下
const m3 = new Map( m )
```

因为map的实例是一个`iterable`，它的默认迭代器与`entries()`相同，所以更推荐使用后面的简写方式。

##### 手动指定map的项目

```js
const x = {
  name:'张学友'
}

const y = {
  name:'周星驰'
}

const m = new Map([
  [x,'zxy'],
  [y,'zxc']
])

m.get(x)  // zxy
m.get(y)  // zxc
```

##### map值

要从map中得到一个值，可以使用`values(...)`方法，它会返回一个迭代器。

```js
const m = new Map()

const x = {
  name:'张学友'
}

const y = {
  name:'周星驰'
}

m.set(x,'zxy')
m.set(y,'zxc')

const vals = [ ...m.values() ]

vals  // ['zxy','zxc']
Array.from( m.values() )  // ['zxy','zxc']
```

##### Map键

需要得到一列键，可以使用`keys(...)`，它会返回map中键上的迭代器。

```js
const m = new Map()

const x = {
  name:'张学友'
}

const y = {
  name:'周星驰'
}

m.set(x,'zxy')
m.set(y,'zxc')

const keys = [ ...m.keys() ]

keys[0] === x  // true
keys[1] === y  // true
```

需要确定一个map中是否有给定的键，可以使用`has(...)`方法

```js
cosnt m = new Map()

const x = {
  name:'发哥'
}

const y = {
  name:'周星驰'
}

m.set(x,'cool')

m.has(x)   // true
m.has(y)   // false
```

map的本质是允许你把某些额外的信息(值)关联到一个对象(键)上，而无需把这个信息放到对象中。对于map来说，尽管可以使用任意类型的值作为键，但通常我们只会使用对象，因为字符串或者其他基本类型已经可以作为普通对象的键来使用了。也就是说，**除非某些或者全部键需要是对象，否则可以继续使用普通对象来作为映射，这种情况下map才是更加合适的。**

> 如果使用对象作为映射的键，这个对象后来被丢弃(所有的引用解除)，试图让垃圾回收回收其内存，那么map本身仍然会保持其项目，也就是仍然引用其项目，不被垃圾回收掉。

##### 利用两个平行数组来模拟map

```js
const keys = [],
      vlaues = []

const x = {id:1},
      y = {id:2}

keys.push(x)
values.push('id---1')

key.push(y)
values.push('id---2')

key[0]  === x  // true
key[1]  === y  // true

values[0] // 'id---1'
values[1] // 'id---2'
```

这样可以模拟实现伪map，但是这样做的缺点是：访问的时间复杂度不再是`O(1)`，而是`O(n)`了。

#### WeakMap

前面说到如果使用对象作为映射的键，这个对象后来被丢弃(所有的引用解除)，试图让垃圾回收回收其内存，那么map本身仍然会保持其项目，也就是仍然引用其项目。那么就可以使用`WeakMap`来解决这个问题。

WeakMap是map的变体，二者的多数外部行为特性是一样的，区别在于内部内存分配(垃圾回收)的工作方式。也可以说`Map`是**强引用**，而`WeakMap`则是**弱引用**的。

WeakMap**只接受对象作为键**，这点与Map不同，**Map既可以使用对象，也可以使用简单类型作为键**。这些对象是被弱持有的，也就是说如果对象本身被垃圾回收的话，在`WeakMap`中的这个项目也会被移除。

与`Map`类型，`WeakMap`的API说类似的，但是WeakMap没有`clear()`、`size`方法/属性，也不会暴露任何键、值或项目上的迭代器。

```js
const m = new WeakMap()

const x = {
  id:'007'
}

m.set(x,'凌凌漆')

m.has(x)  // true
```

和`Map`一样，通过`weakMap`可以把信息与一个对象**软关联**起来。而在对这个对象没有完全控制权的时候，这个功能特别有用！比如DOM元素。如果作为映射键的对象可以被删除，并支持垃圾回收，那么`WeakMap`就是合适人选了。

> 注意：WeakMap只是弱引用它的键，并不是值，这一点很重要。

```js
const m = new WeakMap()

const x = {id:1},
      y = {id:2}

m.set(x,y)

x = null  // 垃圾回收
y = null  // 没有垃圾回收
```

#### Set

`Set`是一个值的集合，其中的值是唯一的（当重复会被忽略）。

`Set`的API和Map类似。只是`add(...)`方法替换了`get(...)`，没有`get(...)`方法。

```js
const s = new Set()

const x = {id:1},
      y = {id:2}

s.add(x)
s.add(y)
s.add(x)

s.size. // 2

s.delte(y)
s.size. // 1

s.clear()
s.size  // 0
```

`Set(...)`构造器形式和`Map(...)`类似，都可以接受一个iterable，比如另外一个Set或者仅仅是一个值的数组。与`Map(...)`接受一个项目(entry)列表(键/值数组的数组)不同，`Set(...)`接受的是值(vlaue)列表，也就是值的数组。

```js
const x = {id:1},
      y = {id:2}

const s = nwe Set([x,y])
```

`Set(...)`不需要`get(...)`是因为不会从集合中取一个值，而是使用`has(...)`判断一个值是否存在。

```js
const x = {id:1},
      y = {id:2}

const s = nwe Set([x])

s.has(x)  // true
s.has(y)  // false
```

> 除了会把-0和0当作是一样的而不加区别之外，**has(...)**中的比较算法和**Object.is(...)**几乎是一样的。

##### Set迭代器

Set的迭代器和Map一样。对于Set来说，二者行为特性不同，但它和Map迭代器的行为是对成的。

```js
const s = new Set()

const x = {id:1},
      y = {id:2}

s.add(x).add(y)  // 没错！支持链式调用

const keys = [ ...s.keys() ],
      values = [ ...s.values() ],
      entries = [ ...s.entries() ]

keys[0] === x  // true
keys[1] === y  // true

values[0] === x  // true
values[1] === y  // true

entries[0][0] === x  // true
entries[0][1] === x  // true

entries[1][0] === y  // true
entries[1][1] === y  // true
```

`keys(...)`和`values(...)`迭代器都从set中yieId出一列不重复的值。`entries(...)`迭代器yieId出一列项目数组，其中的数组的两个项目都是唯一set值。set的默认迭代器是它的`values(...)`迭代器。

Set固有的**唯一性**是它最有用的特性！

```js
const s = new Set([1,2,3,1,'1',6])

const arr = [ ...s ]

arr   // [1,2,3,'1',6]
```

set的唯一性不允许强制转换，也就是说`1`和`'1'`是不同的值。

##### 应用场景

- Tabs：比如日常开发中，项目的`Tabs`头部页签，可以用Set来维护，因为它是唯一的，不会因为点击一样的页面出现相同的Tabs。
- 数组去重

#### WeakSet

就像WeakMap弱引用它的键一样，WeakSet对其值也是弱引用的( Set没有键 )。

```js
const s = new WeakSet()

const x = {id:1},
      y = {id:2}

s.add(x).add(y)

x = null  // x可以被垃圾回收
y = null  // y可以被垃圾回收
```

> 注意：WeakSet的值必须是对象，而并不像Set一样可以是原生类型值。

#### 总结

- Map是键-值对，其中的值不只是字符串/原生类型，也可以是对象。Set是成员值(任意类型)唯一的列表。
- `WeakMap`也是`Map`，其中的键(对象)是**弱引用**的，因此当它是对这个对象的最后一个引用的时候，垃圾回收就可以回收这个项目了。`WeakSet`也是`Set`，其中的值是弱引用的，也就是说如果其中的项目是对这个对象最后一个引用的时候，就可以被垃圾回收掉。

### Proxy-代理

我们都知道`Vue3`不再采用`Object.defineProperty`来实现响应式系统了，取而代之的是ES6新增的`Proxy`代理。

因为`Object.defineProperty`有众多缺点：

- 需要手动去遍历对象绑定`Get`、`Set`，所以当数据结构很复杂时，还需要递归绑定，所以Vue2初始化`data`时会造成一定的性能损失。
- 无法侦听到对象新增的属性，所以Vue2给我们提供了`$set`API。

> 所以Vue2是通过重写数组的那七个改变原数组的方法来实现修改数组实现响应的。

相比ES6的Proxy代理来说，`Object.defineProperty`的好处就是兼用IE，但是如今IE已经走远了，所以尤大当时设计Vue3的时候选择ES6新增的Proxy真是艺高人胆大。

以上说到的缺点，proxy都能解决，这就是proxy的强大之处。代理是一种由你创建的特殊对象，它**封装**另外一个普通对象，或者说挡在这个普通对象的前面。你可以在代理对象上注册特殊的处理函数，代理上执行各种操作的时候会调用这个程序。这些处理函数除了把操作转发给原始目标/被封装对象之外，还有机会执行额外的逻辑。

`MDN`上这样定义`Proxy`：Proxy对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义(比如**属性查找**、**赋值**、**枚举**、**函数调用**)等。

#### 用法

我们可以代理一个对象，当我们试图访问对象属性的时候，它拦截[[Get]]运算。

```js
const obj = { a: 1 };

const handles = {
  get(target, key, context) {
    // target === obj
    // context === p
    console.log("监听到你读取的是:", key);
    return Reflect.get(target, key, context);
  },
};

const p = new Proxy(obj, handle);

console.log(p.a)
// 监听到你读取的是:a
// 1     
```

我们在`handles`对象上声明了`get(...)`处理函数，它接受一个target对象的引用(这里是obj)、key属性名(这里是'a')以及接收者(这里是p)。

除了`Get`操作，还有`Set`操作：

```js
const obj = { a: 1 };

const handle = {
  set(target, prop, value) {
    console.log(`监听到你在修改obj对象中的:${prop}，要修改的值是:${value}`);
    Reflect.set(target, prop, value);
    // 表示成功
    return true;
  },
};

const p = new Proxy(obj, handle);

p.a = 666;
// 监听到你在修改obj对象中的:a，要修改的值是:666
```

#### Reflect

这里使用了Reflect转发，你不知道的JavaScript-中卷这样定义它：它是持有对应于各种可控的元编程任务的静态函数。这些函数一对一对应着代理可以定义的处理函数方法。

这些函数一部分看起来和Object上的同名函数类似：

- Reflect.getOwnPropertyDescriptor( ... )
- Reflect.defineProperty( ... )
- Reflect.getPrototypeof( ... )
- Reflect.setPrototypeof( ... )
- Reflect.preventExtenions( ... )
- Reflect.isExtensible( ... )

一般来说这些工具和Object.对应的工具行为方式类似。但是，有一个区别是如果第一个参数(即目标对象)不是对象的时候，Object.相应工具会试图把它类型转换为一个对象。而这种情况下，Reflect.方法只会抛出一个错误。

- Reflect.get(...)：

  举例：Reflect.get( obj,'foo' )提取obj.foo

- Reflect.set(...)：

  举例：Reflect.set(obj,'foo',66)实际上就是执行`obj.foo = 66`

Reflect的元编程能力提供了模拟各种语法特性的编程等价物，把之前隐藏的抽象操作暴露出来。

#### 代理的局限性

以下一些操作无法被拦截：

```js
const obj ={ a:1,b:2 }
const handles = {...}
                
const p = new Proxy(obj,handles)

// 以下操作不会触发handles，并从代理p对象转发到目标obj上
typeof obj
String(obj)
obj + ''
obj == p
obj === p
```

#### 可取消代理

普通代理总是陷入到目标对象，并且在创建之后不能修改，只要还保持着对这个代理的引用，代理的机制就将维持下去。但是，可能会存在这样的情况，比如你想要创建一个在你想要停止它作为代理时便可以被停用的代理。那就可以使用**可取消代理**。

```js
const obj = { a: 1 };

const handle = {
  get(target, key, context) {
    console.log(`监听到你在修改obj对象中的:${key}`);
    Reflect.get(target, key, context);
  },
};

const { proxy: p, revoke: prevoke } = Proxy.revocable(obj, handle);

p.a; // 监听到你在修改obj对象中的:a

prevoke()  // 取消代理
p.a  // TypeError
```

可取消代理用`Proxy.revocable(...)`创建，这是一个普通函数，而不像`Proxy(...)`一样是构造器。除此之外，它接收的两个参数是：`target`和`handles`。

和new Proxy(...)不一样，Proxy.revocable(...)的返回值不是代理本身。而是一个有两个属性，分别是`proxy`和`revoke`的对象，我们使用对象解构，把这两个属性分别赋值给了`p`和`prevoke`。

一旦取消代理，任何对它的访问(触发他的任意trap：比如Get、Set)都会抛出TypeError。

可取消代理的应用场景：在你的应用中把代理分发到第三方其中管理你的模型数据，而不是给出真实模型本身的引用，如果你的模型对象改变或者被替换，就可以使分发出去的代理失效/取消，这样第三方能够知晓变化并请求更新到这个模型的引用。

#### 小结

1. Proxy通常搭配`Reflect`一起使用（Vue3源码中也使用到）。
2. Proxy的出现，正好解决了`Object.defineProperty`的众多缺点。