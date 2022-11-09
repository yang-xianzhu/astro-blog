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