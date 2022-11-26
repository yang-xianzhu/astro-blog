---
title: Node
description: Node
layout: ../../../layouts/MainLayout.astro
---

## 本地登录npm

1. 注册npm账号 ---[ npm官网](https://www.npmjs.com/)
2. 使用**nrm**或者**yrm**来快速切换镜像源，推荐使用**yrm**

- - 手动npm切换为默认源

```shell
npm config set registry https://registry.npmjs.org

// 切换到淘宝镜像
npm config set registry https://registry.npm.taobao.org
```

1. 然后执行**npm login** 或者 **npm adduser**，然后填写用户名、密码、邮箱即可（可以通过npm whoami查看当前登录人）

## 给喜欢的包Star

- 加Star

```shell
npm star [包名]
```

- 取消Star

```shell
npm unstar [包名]
```

- 查看收藏列表

```shell
npm stars
```

## 查看某个包的文档

此操作通过执行命令，然后快速的打开包的文档！

```shell
# 此命令会尝试猜测包文档URL的可能位置，一般没有自定义的话，就会打开包的github地址。
npm docs [包名] or npm home [包名]
```

例如快速打开**lodash**官方文档==> `npm home lodash`

**npm docs** 或者 **npm home** 命令在不接参数时，会在当前项目中，通过**pageage.json**文件中的**homepage**配置，来打开对应的地址。

例如：

```shell
"homepage":"https://github.com/yang-xianzhu/yang-xianzhu.github.io"
"repository":{
"type":"git"
"url":"https://github.com/yang-xianzhu/yang-xianzhu.github.io"
}
```

其原理就是：当你查看的项目中的**pageage.json**文件中，设置了**homepage**属性，通过**npm docs/home**就能打开对应的主页，没有设置**homepage**属性时，npm会继续寻找其中的**repository**属性，这时候打开的就是项目在github中的托管地址url上拼接**#readme**，如果你**repository**属性也没设置，那么就会打开npm官网中包的所在地址

## 查看某个包的代码仓库

```shell
npm repo [包名]
```

它是根据其项目中的**pageage.json**文件中的**repository**属性，来打开对应的url。

## 快速给一个包提issues

```shell
npm bugs [包名]
```

它是根据项目中的**pageage.json**中的**bugs**属性，来打开对应的url。

## 查看某个包的详细信息

```shell
npm v [包名]
```

## 查看某个包的所有历史版本

```shell
npm v [包名] versions
```

## npm发布包

1. 本地登录：`npm login`
2. 每次发布前，修改版本号

```shell
npm version [版本号]
```

3. 发布：`npm publish`
4. 更新：
   1. 修改版本号（最好复合semver规范）
   2. 重新发布：`npm publish`

删除发布的包：`npm unpublish`

> 注意：使用淘宝源会报错，需要改回默认源。

## 查看当前镜像源的延迟

```shell
npm ping
```

## 安装依赖

```shell
安装开发环境依赖，在package.json文件的devDependencies节点下
npm install [包名] --save-dev / -D

安装生产环境依赖，在package.json文件的dependencies节点下
npm install [包名] --save / -S
```

## 项目配置

#### 初始化项目

npm init -y：所有配置都使用默认配置。

#### 项目配置

##### package.json文件

###### private属性：

记录当前的项目是否是私有的。当值为true时，npm是不能发布它的，这是防止私有项目或模块发布出去的方式。

###### main属性：

设置程序的入口，如果有main属性，实际上是**找到对应的main属性查找文件的**。

###### scripts属性：

- **scripts属性用于配置一些脚本命令**，以**键值对**的形式存在
- 配置后我们可以通过**npm run**命令的key来执行这个命令
- npm start 和 npm run start的区别是什么？
  - 它们是等价的
  - 对于常用的start、test、stop、restart可以省略掉run通过npm start等方式运行

###### dependencies属性：

-  dependencies属性是**指定无论开发环境还是生成环境都需要依赖的包**
- 通常是我们项目实际开发用到的一些库的模块vue、pina、vue-router、axios等
- 生产所需要的依赖

###### devDependencies属性

- 一些包**在生产环境是不需要的，比如webpack、babel等**
- 这些时候我们会通过**npm install  包名 --save-dev**或**npm install 包名 -D**，将它安装到devDependencies属性中
- 开发所需要的依赖

###### peerDependencies属性：

- 还有一种项目依赖关系是**对等依赖**，也就是**你依赖的一个包，它必须是以另外一个宿主包为前提的**
- 比如element-plus是依赖于vue3的，ant Design是依赖于react、react-dom

###### engines属性：

- engines属性**用于指定Node和NPM的版本号*
- 在安装的过程中，**会先检查对应的引擎版本，如果不符合就会报错**
- 事实上也可以指定所在的操作系统"os":["darwin","linux"]，但很少用到

browserslist属性：

- 用于配置打包后到JavaScript浏览器到兼容情况。
- 否则我们需要手动的添加polyfills来让支持某些语法。
- 也就是说它是为了webpack等打包工具服务的一个属性

###### 依赖的版本管理

- semver版本规范是X.Y.Z：
  - `X主版本号`：当你做了不兼容的API修改（可能不兼容之前的版本）
  - `Y次版本号`：当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）
  - `Z修订号`：当你做了向下兼容的问题修正（没有新功能，修复了之前版本的bug）
- `^`和 `~`的区别：
  - x.y.z：表示**一个明确的版本号**。
  - ^x.y.z：表示**x是保持不变**的，**y和z永远安装最新的版本**。
  - ~x.y.z：表示**x和y保持不变**的，**z永远安装最新的版本**。

##### 安装npm包

- 全局安装：npm install 包名 -g
- 项目（局部）安装：npm install 包名，此时包会自动安装到文件夹下的`node_modules`下

##### package-lock.json文件解析

- name：项目名称
- version：项目版本
- lockfileVersion：lock文件版本
- requires：使用requires来跟踪模块的依赖关系
- dependencies：项目的依赖
  - 比如当前项目依赖axios，但是axios依赖follow-redireacts
  - axios中的属性如下：
  - `version`：表示实际安装的axios的版本
  - `resolved`：用来记录下载的地址，registry仓库中的位置
  - `requires/dependcies`：记录当前模块的依赖
  - `integrity`：用来从缓存中获取索引，再通过索引去获取压缩包文件（**安装包的时候会优先利用这个字段去缓存里找，找不到再去`resolved`里下载**）

## npm install的原理

![npm install原理.drawio.png](/npm%20install%E5%8E%9F%E7%90%86.drawio.png)

##### npm命令

官网文档：https://docs.npmjs.com/cli-documentation/cli

- `npm rebuild`：重新构建node_modules包

- `npm cache clean`：清除缓存

## npm镜像

- 查看npm镜像：`npm config get registry`
- 设置npm镜像：
  - 淘宝镜像：`npm config set registry https://registry.npm.taobao.org`
  - 默认镜像：`npm config set registry https://registry.npmjs.org`

## npx

```json
// package.json
“scripts”:{
  "build":"webpack"
}
```

上面的代码执行脚本build执行流程是：

首先去`node_modules`下的`.bin`文件找到webpack文件执行，也可以自己手动在终端先切换到`node_modules`下的`.bin`文件并执行`npx  webpack`。