---
title: CSS新世界
description: css
layout: ../../../../layouts/MainLayout.astro
---

### 字数少的时候居中显示，字数多的时候左对齐显示

```css
div {
  width: fit-content;
  margin: auto;
}
```

### inset 属性

```css
div {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

/* 等同于 */
div {
  position: absolute;
  inset: 0;
}
```

### flex 属性单值语法对应的计算值

| 单值语法      | 等同于（flex-grow、flex-shrink、flex-basis） | 备注                 |
| ------------- | -------------------------------------------- | -------------------- |
| flex：initial | flex：0 1 auto                               | 初始值，常用         |
| flex：0       | flex：0 1 0%                                 | 适用场景少           |
| flex：none    | flex：0 0 auto                               | 推荐                 |
| flex：1       | flex：1 1 0%                                 | 推荐                 |
| flex：auto    | flex：1 1 auto                               | 适用场景少，但很有用 |

### 当 img 标签没有 src 属性的时候，自动填充一个占位背景色/背景图

```css
img:not([src]): {
  background: deepskyblue;
}
```
