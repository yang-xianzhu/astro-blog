---
title: JavaScript设计模式
description: JavaScript设计模式
layout: ../../../../layouts/MainLayout.astro
---

### 状态模式

**状态模式：**当一个对象的内部状态发生改变时，会导致其行为的改变，这看起来像是改变了对象。

#### 分支语句的弊端

比如一些游戏开发中的人物的移动功能模块，比如移动是有多个方向的，比如上、下、左、右等。此时可能我们会写出这样的代码：

```javascript
function moveType(type){
  if(type ==='top'){
    console.log('向上移动')
  }else if(type ==='bottom'){
     console.log('向下移动')
  }else if(type ==='left'){
     console.log('向左移动')
  }else if(type ==='right'){
     console.log('向右移动')
  }
}
```

每一条if语句都代表着一个移动方向，但是如果以后需求需要添加一个向上左移动的需求，那我们还得继续添加if条件判断语句...

对于这种可以减少代码中的条件判断语句，并且使每种**判断情况独立存在**，而且也更**方便管理**，有什么方法可以实现呢？没错，就是设计模式中的**状态模式**：**每一种条件作为对象内部的一种状态，面对不同判断结果，它其实就是选择对象内的一种状态。**

#### 动手实现

```javascript
const MoveState = function (){
  const Types = {
    top(){
      console.log('top')
    },
    bottom(){
      console.log('bottom')
    },    
    left(){
      console.log('left')
    },
    right(){
      console.log('right')
    }
  }

  function action(type){
    Types[type] && Types[type]()
  }
  return {
    action
  }
}

const move = MoveState()
move.action('left')  
// left
```

以上这个就展示了**状态模式**的基本雏形了。对于状态模式，主要目的就是**将条件判断的不同结果转化为状态对象的内部状态，既然是状态对象的内部状态，所以一般作为状态对象内部的私有变量，然后给外部提供一个能够调用状态对象内部的接口方法对象。**

#### 状态优化

```javascript
const MoveState = function(){
  // 内部状态的私有变量
  let _currentState = {}
  
  // 移动与状态方法映射
  const Types = {
    top(){
      console.log('top')
    },
    bottom(){
      console.log('bottom')
    },    
    left(){
      console.log('left')
    },
    right(){
      console.log('right')
    }
  }

  // 控制移动对象
  const Actions = {
    changeMoveState(){
      const arg = arguments
      // 重置内部状态
      _currentState = {}
      if(!arg.length) return 
      for(let i = 0; i<arg.length ;i++){
        // 向内部状态中添加动作
        _currentState[arg[i]] = true
      }
      // 返回当前对象，方便链式调用
      return this
    },
    start(){
      console.log('开始移动!')
      for(const k in _currentState){
        // 如果有动作，则移动
       Types[k] && Types[k]()
      }
    }
  }

  return {
    change:Actions.changeMoveState,
    start:Actions.start
  }
}

const move = new MoveState()
move.change('left','top').start()
// 开始移动
// left
// top
```

#### 小结

状态模式既是解决程序中的雍肿的分支判断语句问题，将每个分支转换为一种状态独立出来，方便每种状态的管理又不至于每次执行时遍历所有分支。在程序中到底产出哪种行为结果，决定选择哪种状态，而选择何种状态又是持续运行时决定的。当然**状态模式最终目的即是简化分支判断流程**。

### 策略模式

**策略模式**：将定义的一组算法封装起来，使其互相之间可以替换。封装的算法具有一定独立性，不会随着客户端变化而变化。

#### 促销活动

那么我们理解了设计模式中的策略模式有什么应用场景呢？比如我们做一些电商类的项目，比如每一年的双十一都会搞一些促销活动，一些商品8折、一些9折出售，然后区分用户等级：普通用户购买金额满100返30，钻石用户满100返50。可能一开始我们看到这样的需求就会写出这样的代码：

```javascript
// 8折
function parcent80(price){...}
// 9折
function parcent80(price){...}
// 满100返30
function return30(price){...}
// 满100返50
function return50(price){...}
```

这样写是不好的，我们应该内部封装一个对象，然后通过返回的接口对象供外部实现对内部对象的调用，策略模式是不需要管理状态、状态间没有依赖关系、策略之间可以互相替换、在策略对象内部保存的是互相独立的一些算法。

#### 策略对象

为实现对每种促销方式，我们首先需要将这些算法封装在一个策略对象内，然后对每一种促销方式的策略调用时，直接对策略对象中的算法调用即可，而策略算法又独立地封装在策略对象内。为了方便我们的管理与使用，我们需要返回一个调用接口对象来实现对策略算法的调用。

```javascript
// 促销方式的策略对象
const PriceStrategy = function(){
  // 内部算法对象
  const stragtegy = {
     // 8折
     parcent80(price){
      return price * 100 * 80 / 10000  
     },
     // 9折
     parcent90(price){
     return price * 100 * 90 / 10000    
     },
     // 满100返30
     return30(price){
     // 假如price是100 那么就返回130
     return +price + parseInt(price / 100) * 30  
     },
     // 满100返50
     return50(price){
     // 同理 
     return +price + parseInt(price / 100) * 50 
     }
  }
    // 返回策略算法调用接口
    return function(mode,price){
     return stragtegy[mode] && stragtegy[mode](price)
    }
}()

// 假如要求一个价格为300的商品的钻石用户的优惠价格
const price = PriceStrategy('parcent80',300)
// price ----> 240
```

策略模式使我们在外部看不到算法的具体实现，我们只需要通过策略对象返回的接口方法直接调用内部封装的某种策略算法就可以了。

#### 思考哪些地方使用到了这种模式？

在vue、react等这些数据驱动的框架出现之前，我们开发者都是在使用DOM驱动的框架，比如大名鼎鼎的**jQuery**，相信大家都对以下代码都不陌生。

```javascript
$('div').animate({width:'200px',1000,'linear'})
$('div').animate({width:'200px',1000,'swing'})
```

没错的！jQuery中的缓冲函数/动画函数就是用策略模式来实现的，比如它内部给我们提供的linear、swing的两种曲线就是两种策略算法。

#### 扩展-表单验证

当然，除了上面这种促销使用到策略模式，还有很多地方都可以用上策略模式来简化我们实现业务需求。比如很常见的表单验证需求。

```javascript
// 表单正则验证策略对象
const InputStrategy = function (){
  const  strategy = {
    // 判断是否为空
    notNull(value){
      return /\s+/.test(value) ? '请输入内容!' : `内容是:${value}`
    },
    // 判断是否是一个数字
    checkNumber(value){
      return /^[0-9]+(\.[0-9]+)?$/.test(value) ? `数字是:${value}` : '请输入数字!'
    }
  }
  // 对外暴露接口 
  return {
    check:function(type,value){
      // 去除首尾空白符
      value = value.replace(/^\s+|\s+$/g,'')
      return strategy[type] ? strategy[type](value) : '没有该类型的检测方法'
    }
  }
}()
// 检验输入的是否为空
const res = InputStrategy.check('notNull','标题')
console.log(res)    // 内容是:标题
const res1 = InputStrategy.check('checkNumber','1111')
console.log(res1)   // 数字是:1111
```

#### 小结

策略模式最主要的特色是创建一系列策略算法，每组算法处理的业务都是相同的，只是处理的过程或者处理的结果不一样，所以它们又是可以相互替换的，这样就解决了算法与使用者之间的耦合。在测试层面上讲，由于每组算法之间的独立性，该模式更方便对每组算法进行单元测试，保证算法的质量。

策略模式的优点：

1. 策略模式封装了一组代码簇，并且封装了代码互相之间独立，便于对算法的重复引用，提高了算法的复用率。
2. 策略模式与继承相比在类的继承中继承的方法是被封装在类中，因此当需求很多算法时，就不得不创建出多种类，这样会导致算法与算法的使用者耦合在一起，不利于算法的独立演化，并且在类的外部改变类的算法难度也是极大的。
3. 同状态模式（也是设计模式中的一种）一样，策略模式也是一种**优化分支判断语句**的模式，采用策略模式对算法封装使得算法更利于维护。