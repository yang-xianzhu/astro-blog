---
title: Vite
description: Vite构建工具
layout: ../../../layouts/MainLayout.astro
---

# vite 配置说明

## css：

### module

- **localConvention**：修改生成的配置对象的 key 的展示形式（驼峰还是中划线形式）。
- **scopeBehaviour**：配置当前的模块化行为是模块化还是全局化（有 hash 就是开启了模块化的一个标志）。
- **generateScopedName**：自定义 css 模块化类名规则。
- **hashPrefix**：自定义生成 hash 值。
- globalMoudlePaths：不想参与到 css 模块化的文件路径（String[]）

module 最后会传给 postcss

### preprocessorOptions

主要用来配置 css 预处理器的一些全局参数，适用形式===> key + config，如：sass:{}。

- **globalVars**：设置全局 less 变量

```
globalVars = {
  mainColor:'deepskybule'
}
```

### devSourcemap

用来开启 css 在浏览器快速找到原文件的配置，boolean 类型。

## path

nodes 端去读取文件或者操作文件的时候，如果发现你用的是相对路径，则会使用 process.cwd()来进行对应的路径拼接。

- \_\_dirname：是 node 注入的变量，**始终返回的是当前文件的所在目录**。
- path.resolve：用来解决 mac 和 windows 路径的\ /不一样，做了一些处理。

## resolve

- alias：别名，用于配置路径别名。

## Svg

是一种可伸缩矢量图形。

优点：

1.  svg 不会失真
1.  尺寸小

缺点：无法很好的去表示层次丰富的图片信息。

## 打包

### 为什么打包出来的图片等静态资源会携带 hash 值？

因为浏览器是有缓存机制的。静态资源名字只要不改，那么他就会直接使用缓存的。所以每次打包后改动过的资源需要生成不同的 hash，避免代码改动了，浏览器请求的还是原来的资源。

## build

```ts
build:{
  rollupOptions:{
    // 控制打包后的产物的配置
    output:{
      // hash代表将你的文件名和文件内容组合计算得来的结果。
      assetFileNames:'[hash].[name].[ext]'
    }
  },
  // 当静态资源大于4kb就转换成base64
  assetsInlineLimit: 4096,
  // 配置打包后的产物的文件命名，默认是dist
  outDir: 'build',
  // 配置打包后的静态资源文件名，默认是assets
  assetsDirs:'assets',
  // 清除输出目录的所有文件，每次打包都清除旧的打包产物，生成新的，默认是true
  emptyOutDir:true
}
```

## vite 插件-plugins

### 插件是什么？

vite 会在不同的生命周期里调用不同的插件达到不同的目的。

vite-aliases 插件：

- 官网：<https://github.com/Subwaytime/vite-aliases>
- 简述：可以帮助我们自动生成路径别名，检查你当前目录下所有在内的所有文件，并帮助我们去生成别名。
- 安装：npm i vite-aliases -D
- 使用：

```ts
import { ViteAliases } from "vite-aliases";

plugins: [ViteAliases()];
```

### 手写一个 vite 插件

vite 插件 plugins 数组里面必须是一个个对象。

```ts
import type { PluginOption } from "vite";
import fs from "fs";
import path from "path";

// 区分：文件和文件夹函数
function diffDirAndFile(dirFilesArr = [], basePath = "") {
  const result = {
    dirs: [], // 存储目录文件
    files: [], // 存储普通文件
  };
  dirFilesArr.forEach((name) => {
    const currentFileStat = fs.statSync(
      path.resolve(__dirname, `${basePath}/${name}`)
    );
    const isDirectory = currentFileStat.isDirectory();
    // 如果是目录就返回true，否则返回false
    if (isDirectory) {
      result.dirs.push(name);
    } else {
      result.files.push(name);
    }
  });
  return result;
}

// 读取文件函数
function getSrcDir() {
  // 同步读取scr下的所有目录
  const result = fs.readdirSync(path.resolve(__dirname, "./src"));
  const diffResult = diffDirAndFile(result, "./src");

  const resoleAliases = {};
  diffResult.dirs.forEach((dirName) => {
    const key = `@${dirName}`;
    const dirPath = path.resolve(__dirname, `./src/${dirName}`);
    resoleAliases[key] = dirPath;
  });
  return resoleAliases;
}

export function myAliases(options = {}): PluginOption {
  return {
    name: "vite-Yzz-aliases",
    // enforce: 'pre',
    config(config, env) {
      // config：配置对象
      // env：mode：string（development开发模式，production生产模式），command：string
      // config函数可以返回一个对象，这个对象是部分的viteconfig配置（就是自己想改的一部分）

      // 读取src文件下的所有目录
      const resolveAliases = getSrcDir();
      config.resolve = {
        // 如果用户原本配置了resolve.alias，则合并操作，否则直接使用。
        alias: config.resolve?.alias
          ? [...config.resolve?.alias, ...resolveAliases]
          : [resolveAliases],
      };
    },
  };
}
```

## vite-plugin-html 插件

一般用于动态的设置 html 的 title 等属性，它内部使用的是 ejs（<%= title %>）模板语法，ejs 在服务端用得比较频繁可能经常会去修改 index.html 的内容。

## vite-plugin-mock 插件

1.  安装插件：

```pnpm
# 因为该插件以来mockjs
pnpm add mockjs
pnpm add vite-plugin-mock -D
```

2.  文档：<https://github.com/vbenjs/vite-plugin-mock>
3.  vite 中使用：

```ts
import { viteMockServe } from "vite-plugin-mock";

plugin: [viteMockServe()];
```

4.  注意事项：该插件会自动读取项目根目录的 mock 文件
5.  配置 mock 接口数据：

```ts
// mock/index.ts
module.exports = [
  {
    method: "post",
    url: "/api/list",
    response: ({ body }) => {
      return {
        code: 200,
        msg: "success",
        data: [
          {
            title: "海贼王",
            id: "001",
          },
          {
            title: "七龙珠",
            id: "002",
          },
        ],
      };
    },
  },
];
```

获取当前的根目录：process.cwd()
