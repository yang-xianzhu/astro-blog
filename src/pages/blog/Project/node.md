---
title: Node
description: Node
layout: ../../../layouts/MainLayout.astro
---

## 本地登录npm

1. 注册npm账号 ---[ npm官网](https://www.npmjs.com/)
2. 使用**nrm**或者**yrm**来快速切换镜像源，推荐使用**yrm**

- 手动npm切换为默认源

```shell
npm config set registry https://registry.npmjs.org
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

1. 本地登录
2. 每次发布前，修改版本号

```shell
npm version [版本号]
```

1. `npm publish`

注意：使用淘宝源会报错，需要改回默认源。

## 查看当前镜像源的延迟

```shell
npm ping
```

