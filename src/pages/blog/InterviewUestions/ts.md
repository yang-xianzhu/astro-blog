---
title: TypeScript
description: TypeScript
layout: ../../../layouts/MainLayout.astro
---

### tsconfig.json全解析

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es6", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "declarationDir": "./dist/types", // 生成的 '.d.ts' 文件保存文件夹
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./dist", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告switch语句的fallthrough错误。（即，不允许switch的case语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基础目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。
    "esModuleInterop": true, // 支持合成模块的默认导入
  
    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  },
  /* 指定编译文件或排除指定编译文件 */
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"],
  "files": ["index.ts", "test.ts"],
  // 从另一个配置文件里继承配置
  "extends": "@tsconfig/recommended",
  // 让 IDE 在保存文件的时候根据 tsconfig.json 重新生成文件
  "compileOnSave": true // 支持这个特性需要Visual Studio 2015， TypeScript 1.8.4 以上并且安装 atom-typescript 插件
}
```

### 小技巧

#### keyof any

TypeScript有一个内置类型叫做`Record`，它的作用是根据传入的索引和值的类型构造新的索引类型。

```ts
type res = Record<'name' | 'age','hello'>

type res = {
  name: 'hello',
  age: 'hello'
}
```

它的实现就是通过映射类型的语法构造一个索引类型：

```ts
type Record<K,T> = { [P in K]: T }
```

那么我们怎么去约束K的类型呢？

我们知道JS的属性可以是`string`、`number`、`symbol`这三种类型。

那我们直接是 `K extends string | number | symbol`？

不，TypeScript有个编译选项叫做`keyofStringOnly`开启了那么就就只会用 string 作为索引，否则才是 string ｜ number | symbol。

看下 TS 源码里是怎么定义 Record 的：

```ts
type Record<K extends keyof any, T> = { [P in K]: T; };
```

如果不开启`keyofStringOnly`的时：

```ts
type res = keyof any

type res = string | number | symbol
```

开启`keyofStringOnly`：

```ts
type res = keyof any

type res = string 
```

这样我们就能动态获取当前支持的key的类型了，需要约束某个类型参数为索引 Key 时，用 keyof any 动态获取比写死 string | number | symbol 更好！

#### object 和 Record<string,any>

TypeScript 里有三个类型比较难区分，就是 object、Object、{} 这几个。

其实只要记住 **object 不能接受原始类型** 就可以了，其余两个差不多，只不过 {} 是个空对象，没有索引。

所以 number 就可以赋值给 {}、Object 类型，但是不能赋值给 object 类型：

```ts
type res = number extends object ? true : false
res ===> false

type res = number extends {} ? true : false
res ===> true

type res = number extends Object ? true : false
res ===> true
```

Record<string, any> 创建了一个 key 为任意 string，value 为任意类型的索引类型：

```ts
type res = Record<string,any>

type res = {
  [x:string]:any
}
```

#### ? 和 ??

TS支持的？的可选链语法，也可以通过`？？`指定默认值：

```ts
const name = data?.name ?? 'yxz'
```

#### 总结

- keyof any 可以动态获取 key 支持的类型，根据 `keyofStringsOnly` 的编译选项，可以用来约束索引。
- object 不能接收原始类型，而 {} 和 Object 都可以，这是它们的区别。
- object 一般会用 Record<string, any> 代替，约束索引类型更加语义化
- `?` 和 `??` 分别代表空判断和默认值，是写 TS 很常用的一个语法