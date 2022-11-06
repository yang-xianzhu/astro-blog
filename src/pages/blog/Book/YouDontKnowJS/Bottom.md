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

vals[0][0] === x  // true
vlas[0][1]   // 'zxy'

vals[1][0] === y  // true
vlas[1][1]   // 'zxc'
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

#### 小结

- Map是键-值对，其中的值不只是字符串/原生类型，也可以是对象。Set是成员值(任意类型)唯一的列表。
- `WeakMap`也是`Map`，其中的键(对象)是**弱引用**的，因此当它是对这个对象的最后一个引用的时候，垃圾回收就可以回收这个项目了。`WeakSet`也是`Set`，其中的值是弱引用的，也就是说如果其中的项目是对这个对象最后一个引用的时候，就可以被垃圾回收掉。