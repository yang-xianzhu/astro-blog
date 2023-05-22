---
title: Node
description: Node
layout: ../../../layouts/MainLayout.astro
---

## 本地登录 npm

1. 注册 npm 账号 ---[ npm 官网](https://www.npmjs.com/)
2. 使用**nrm**或者**yrm**来快速切换镜像源，推荐使用**yrm**

- - 手动 npm 切换为默认源

```shell
npm config set registry https://registry.npmjs.org

// 切换到淘宝镜像
npm config set registry https://registry.npm.taobao.org
```

1. 然后执行**npm login** 或者 **npm adduser**，然后填写用户名、密码、邮箱即可（可以通过 npm whoami 查看当前登录人）

## 给喜欢的包 Star

- 加 Star

```shell
npm star [包名]
```

- 取消 Star

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

其原理就是：当你查看的项目中的**pageage.json**文件中，设置了**homepage**属性，通过**npm docs/home**就能打开对应的主页，没有设置**homepage**属性时，npm 会继续寻找其中的**repository**属性，这时候打开的就是项目在 github 中的托管地址 url 上拼接**#readme**，如果你**repository**属性也没设置，那么就会打开 npm 官网中包的所在地址

## 查看某个包的代码仓库

```shell
npm repo [包名]
```

它是根据其项目中的**pageage.json**文件中的**repository**属性，来打开对应的 url。

## 快速给一个包提 issues

```shell
npm bugs [包名]
```

它是根据项目中的**pageage.json**中的**bugs**属性，来打开对应的 url。

## 查看某个包的详细信息

```shell
npm v [包名]
```

## 查看某个包的所有历史版本

```shell
npm v [包名] versions
```

## npm 发布包

1. 本地登录：`npm login`
2. 每次发布前，修改版本号

```shell
npm version [版本号]
```

3. 发布：`npm publish`
4. 更新：
   1. 修改版本号（最好复合 semver 规范）
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

##### package.json 文件

###### private 属性：

记录当前的项目是否是私有的。当值为 true 时，npm 是不能发布它的，这是防止私有项目或模块发布出去的方式。

###### main 属性：

设置程序的入口，如果有 main 属性，实际上是**找到对应的 main 属性查找文件的**。

###### scripts 属性：

- **scripts 属性用于配置一些脚本命令**，以**键值对**的形式存在
- 配置后我们可以通过**npm run**命令的 key 来执行这个命令
- npm start 和 npm run start 的区别是什么？
  - 它们是等价的
  - 对于常用的 start、test、stop、restart 可以省略掉 run 通过 npm start 等方式运行

###### dependencies 属性：

- dependencies 属性是**指定无论开发环境还是生成环境都需要依赖的包**
- 通常是我们项目实际开发用到的一些库的模块 vue、pina、vue-router、axios 等
- 生产所需要的依赖

###### devDependencies 属性

- 一些包**在生产环境是不需要的，比如 webpack、babel 等**
- 这些时候我们会通过**npm install 包名 --save-dev**或**npm install 包名 -D**，将它安装到 devDependencies 属性中
- 开发所需要的依赖

###### peerDependencies 属性：

- 还有一种项目依赖关系是**对等依赖**，也就是**你依赖的一个包，它必须是以另外一个宿主包为前提的**
- 比如 element-plus 是依赖于 vue3 的，ant Design 是依赖于 react、react-dom

###### engines 属性：

- engines 属性\*_用于指定 Node 和 NPM 的版本号_
- 在安装的过程中，**会先检查对应的引擎版本，如果不符合就会报错**
- 事实上也可以指定所在的操作系统"os":["darwin","linux"]，但很少用到

browserslist 属性：

- 用于配置打包后到 JavaScript 浏览器到兼容情况。
- 否则我们需要手动的添加 polyfills 来让支持某些语法。
- 也就是说它是为了 webpack 等打包工具服务的一个属性

###### 依赖的版本管理

- semver 版本规范是 X.Y.Z：
  - `X主版本号`：当你做了不兼容的 API 修改（可能不兼容之前的版本）
  - `Y次版本号`：当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）
  - `Z修订号`：当你做了向下兼容的问题修正（没有新功能，修复了之前版本的 bug）
- `^`和 `~`的区别：
  - x.y.z：表示**一个明确的版本号**。
  - ^x.y.z：表示**x 是保持不变**的，**y 和 z 永远安装最新的版本**。
  - ~x.y.z：表示**x 和 y 保持不变**的，**z 永远安装最新的版本**。

##### 安装 npm 包

- 全局安装：npm install 包名 -g
- 项目（局部）安装：npm install 包名，此时包会自动安装到文件夹下的`node_modules`下

##### package-lock.json 文件解析

- name：项目名称
- version：项目版本
- lockfileVersion：lock 文件版本
- requires：使用 requires 来跟踪模块的依赖关系
- dependencies：项目的依赖
  - 比如当前项目依赖 axios，但是 axios 依赖 follow-redireacts
  - axios 中的属性如下：
  - `version`：表示实际安装的 axios 的版本
  - `resolved`：用来记录下载的地址，registry 仓库中的位置
  - `requires/dependcies`：记录当前模块的依赖
  - `integrity`：用来从缓存中获取索引，再通过索引去获取压缩包文件（**安装包的时候会优先利用这个字段去缓存里找，找不到再去`resolved`里下载**）

## npm install 的原理

![npm install原理.drawio.png](/npm%20install%E5%8E%9F%E7%90%86.drawio.png)

##### npm 命令

官网文档：https://docs.npmjs.com/cli-documentation/cli

- `npm rebuild`：重新构建 node_modules 包

- `npm cache clean`：清除缓存

## npm 镜像

- 查看 npm 镜像：`npm config get registry`
- 设置 npm 镜像：
  - 淘宝镜像：`npm config set registry https://registry.npm.taobao.org`
  - 默认镜像：`npm config set registry https://registry.npmjs.org`

## npx

```json
// package.json
“scripts”:{
  "build":"webpack"
}
```

上面的代码执行脚本 build 执行流程是：

首先去`node_modules`下的`.bin`文件找到 webpack 文件执行，也可以自己手动在终端先切换到`node_modules`下的`.bin`文件并执行`npx webpack`。

## pnpm 包管理器

官网：https://pnpm.io/zh/motivation

#### pnpm 的优点：

- 快速：比其他包管理器快**2**倍
- 高效：node_modules 中的文件链接自特定的内容寻址存储库
- 支持 monorepos：pnpm 内置支持单仓多包
- 严格：pnpm 默认创建了一个非平铺的 node_modules，因此代码无法访问任意包

#### 硬链接

当使用**npm**或**yarn**时，如果有 100 个项目，并且所有项目都有一个相同的依赖包，那么，在硬盘上就需要**保存 100 份该相同依赖包的副本**。

如果是使用**pnpm**，依赖包将被**存放到一个统一的位置**，因此：

- 如果你对**同一依赖包使用相同的版本**，那么**硬盘上只有一个依赖包的一份文件**；
- 如果你对**同一依赖包需要使用不同的版本**，则仅有**版本之间不同的文件会被存储起来**。
- 所有文件都保存在硬盘上的统一位置：
  - 当安装软件包时，其包含的所有文件都会**硬链接**到此位置，而不会占用额外的硬盘空间；
  - 这让我们在项目之间方便地**共享**相同版本的依赖包；

#### 常用命令：

- 获取当前获取的 store 目录：pnpm store path
- 从 store 中删除当前未被引用的包来释放 store 空间：pnpm store prune

## package.json 详解

#### 1、简介

npm 允许在`package.json`文件里面，使用`scripts`字段定义脚本命令。

```json
{
  // ...
  "scripts": {
    "dev":"cross-env NODE_OPTIONS=--max_old_space_size=12000          vue-cli-service serve"
    "build": "node build.js"
  }
}
```

里面的`scirpts`字段是一个对象。它的每一个属性，对应一段脚本。比如，`build`命令对应的脚本是`node build.js`。

命令行使用`npm run`命令，就可以执行这段脚本。

```bash
$ npm run build
# 等同于执行
$ node build.js
```

这些定义在`pageage.json`里面的脚本，就称为 npm 脚本。它的优点很多。

```js
- 项目的相关脚本可以集中在一个地方。
- 不同项目的脚本命令，只要功能相同，就可以有同样的对外接口。用户不需要知道怎么测试你的项目，只要运行`npm run test`即可。
- 可以利用npm提供的很多辅助功能。
```

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数`npm run `命令。

```bash
$ npm run
```

#### 2、原理

npm 脚本的原理非常简单。每当执行`npm run`，就会自动新建一个 shell 在这个 shell 里面执行指定的脚本命令。因此，只要是 shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，`npm run`新建的这个 shell，会将当前目录`node_modules/.bin`子目录加入`PATH`变量，执行结束后，再将`PATH`变量恢复原样。

这意味着，当前目录的`node_modules/.bin`子目录，都可以直接用脚本名调用，而不必加上路径，比如，当前项目等依赖里面有 Mocha（一款 test 库），只要直接写`mocha test`就可以了。

```json
"test":"mocha test"
```

而不用写成下面这样。

```json
"test":"./node_modules/.bin/mocha test"
```

由于 npm 脚本的唯一要求就是可以在 shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。npm 脚本的退出码，也遵守 shell 脚本规则。如果退出码不是`0`，npm 就认为这个脚本执行失败。

#### 3、通配符

由于 npm 脚本是 shell 脚本，因为可以使用 shell 通配符。

```json
"lint":"jshint *.js"
"lint":"jshint **.js"
```

`*`代表任意文件名，`**`表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将`*`转义。

```json
"test":"tap test/\*.js"
```

#### 4、传参

向 npm 脚本传入参数，要使用`--`标明。

```json
"lint":"jshint **.js"
```

向上面的`npm run lint`命令传入参数，必须写成下面这样。

```shell
$ npm run lint -- --reporter checkstyle > checkstyle.xml
```

也可以在`package.json`里面再封装一个命令。

```json
"lint":"jshint **.js"
"lint:checkstyle":"npm run lint -- --reporter checkstyle > checkstyle.xml"
```

##### 5、执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用`&`符号。

```shell
$ npm run script.js & npm run script2.js
```

如果是续发执行（即只有前一个任务成功后，才执行下一个任务），可以使用`&&`符号。

```shell
$ npm run script1.js && npm run script2.js
```

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：`script-runner`、`npm-run-all`、`redrun`。

##### 6、默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值，这两个脚本不用定义，就可以直接使用。

```json
"start":"node start.js"
"install":"node-gyp rebuild"
```

上面代码中，`npm run start`的默认值是`node serve.js`，前提是项目根目录下有`server.js`这个脚本；`npm run install`的默认值是`node-gyp rebuild`，前提是项目根目录下有`binding.gyp`文件。

#### 7、钩子

npm 脚本有`pre`和`post`两个钩子。举例来说，`build`脚本命令的钩子就是`prebuild`和`postbuild`。

```json
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行`npm run build`的时候，会自动按照下面的顺序执行。

```shell
npm run prebuild && npm run build && npm run postbuild
```

因此，可以在这两个钩子里面，完成一些准备工作和清理工作。

```json
"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

npm 默认提供下面这些钩子

```md
- prepublish，postpublish
- preinstall，postinstall
- preuninstall，postuninstall
- preversion，postversion
- pretest，posttest
- prestop，poststop
- prestart，poststart
- prerestart，postrestart
```

自定义的脚本命令也可以加上`pre`和`post`钩子。比如，`myscirpt`这个脚本命令，也有`premyscript`和`postmyscript`钩子。不过，双重的`pre`和`post`无效，比如`prepretest`和`postpostrest`是无效的。

npm 提供了一个`npm_lifectcle_event`变量，返回当前正在运行的脚本名称。比如`pretest`、`test`、`posttest`等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的`npm script`命令编写代码。

```js
// 获取当前正在运行的脚本名称
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === "test") {
  console.log(`Running the test task!`);
}

if (TARGET === "pretest") {
  console.log(`Running the pretest task!`);
}

if (TARGET === "posttest") {
  console.log(`Running the posttest task!`);
}
```

注意，`prepublish`这个钩子不仅会在`npm publish`命令之前运行，还会在`npm install`（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm4 引入了一个新的钩子`prepare`，行为等同于`prepublish`，而从 npm5 开始，`prepublish`将只在`npm publish`命令之前运行。

#### 8、简写形式

四个常见的 npm 脚本有简写形式。

```md
- npm start 是 npm run start 简写
- npm stop 是 npm run stop 的简写
- npm test 是 npm run test 的简写
- npm restart 是 npm run stop && npm run restart && npm run start 的简写
```

`npm start`、`npm stop`和`npm restart`都比较好理解，而`npm restart`是一个复合命令，实际上会执行三个脚本命令：`stop`、`restart`、`start`。执行顺序如下：

```md
1、prerestart
2、prestop
3、stop
4、poststop
5、restart
6、prestart
7、start
8、poststart
9、postrestart
```

##### 9、变量

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

首先，通过`npm_package`前缀，npm 脚本可以拿到`package.json`里面的字段。

```json
{
  "name": "foo",
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

那么，变量`npm_package_name`返回`foo`，变量`npm_package_version`返回`1.2.5`。

```js
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

上面代码中，我们通过环境变量`process.env`对象，拿到`package.json`的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`npm_package_`前缀也支持嵌套的`package.json`字段。

```md
"repository": {
"type": "git",
"url": "xxx"
},
scripts: {
"view": "echo $npm_package_repository_type"
}
```

上面代码中，`repository`字段的`type`属性，可以通过`npm_package_repository_type`取到。

下面是另外一个例子。

```md
"scirpts":{
"install":"foo.js"
}
```

上面代码中，`npm_package_scripts_install`变量的值等于`foo.js`。

然后， npm 脚本还可以通过`npm_config`前缀，拿到 npm 的配置变量，即`npm config get xxx`命令返回的值。比如，当前模块的发行标签，还可以通过`npm_config_tag`取到。

```md
"view": "echo $npm_config_tag",
```

注意，`package.json`里面的`config`对象，可以被环境变量覆盖。

```md
{
"name" : "foo",
"config" : { "port" : "8080" },
"scripts" : { "start" : "node server.js" }
}
```

上面代码中，`npm_package_config_port`变量返回的是`8080`。这个值可以用下面的方法覆盖。

```shell
$ npm config set foo:port 80
```

最后，`env`命令可以列出所有环境变量。

##### 10、常用脚本示例

```json
// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```
