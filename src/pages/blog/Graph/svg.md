---
title: SVG
description: SVG
layout: ../../../layouts/MainLayout.astro
---

## 引言

SVG 是一种`XML`语言，可以用来绘制矢量图形，SVG 可以通过定义必要的线和形状来创建一个图形，也可以修改已有的位图，或者将这两种方式结合起来创建图形。图形和其组成部分可以形变、合成、或者通过滤镜完全改变外观。

加载慢是 SVG 的一个缺点。但是 SVG 也有自身的优点，比如它实现了 DOM 接口（比 Canvas 方便），不需要安装第三方扩展。

## 基本要素

HTML 提供了定义标题、段落、表格等等内容的元素。以此类推，SVG 也提供了一些元素。用于定义圆形、矩形、简单或者复杂的曲线。一个简单的 SVG 文档由`<svg>`根元素和基本的形状元素构成。另外一个`g`元素，它用来把若干个基本形状编成了一个组。

SVG 可以变得更加复杂。SVG 支持渐变、旋转、动画、滤镜效果、与 JavaScript 交互等等功能，但是所有这些额外的语言特性，都需要在一个定义好的图形区域内实现。

- SVG 的元素和属性必须按标准格式书写，因为 XML 是区分大小写的（这一点和 HTML 不同）
- SVG 里的属性值必须用引号引起来，就算是数值也必须这样做。

## 坐标定位

##### 网格

对于所有元素，SVG 使用的坐标系统或者说网格系统，和 Canvas 用的差不多（所有计算机绘图都差不多）。这种坐标系统是：以页面的左上角（0，0）坐标点，坐标以像素为单位，x 轴正方向是向右，y 轴正方向是向下。

示例

```html
<rect x="0" y="0" width="100" height="100" />
```

定义一个矩形，即从左上角开始，向右延展 100px，向右延展 100px，形成一个 100\*100 大的矩形。

##### 什么是“像素”？

基本上，在 SVG 文档中的 1 个像素对应输出设备（比如显示屏）上的一个像素。但是这种情况是可以改变的，否则 SVG 的名字里也不至于会有“Scalable”（可缩放）这个词。如同 CSS 可以定义字体的绝对大小和相对大小，SVG 也可以定义绝对大小（比如使用“pt”或“cm”标识维度）同时 SVG 也能使用相对大小，只需给数字，不标明单位，输出时就会采用用户的单位。

在没有进一步规范说明的情况下，1 个用户单位等同于 1 个屏幕单位。

用户单位和屏幕单位的映射关系被称为`用户坐标系统`。除了缩放之外，坐标系统还可以旋转、倾斜、翻转。默认的用户坐标系统 1 用户像素等于设备上的 1 像素（但是设备上可能会自己定义 1 像素到底是多大）。在定义了具体尺寸单位的 SVG 中，比如单位是“cm”或“in”，最终图形会以实际大小的 1 比 1 比例呈现。

## 基本形状

矩形

`rect`元素会在屏幕上绘制一个矩形。其实只要 6 个基本属性就可以控制它在屏幕上的位置和形状。

```html
<rect x="60" y="10" rx="10" ry="10" width="30" height="30" />
```

- x：矩形左上角的 x 位置
- y：矩形左上角的 y 位置
- width：矩形的宽度
- height：矩形的高度
- rx：圆角的 x 方位的半径
- ry：圆角的 y 方位的半径

圆形

`circle`元素会在屏幕上绘制一个图形。它只有 3 个属性来设置圆形。

```html
<circle cx="25" cy="75" r="20" />
```

r：圆的半径

cx：圆心的 x 的位置

cy：圆心的 y 的位置

椭圆

Ellipase 是`circle`元素更通用的形式，你可以分别缩放圆的 x 半径和 y 半径（通常数学家称之为长轴半径和短轴半径）。

```html
<ellipse cx="75" cy="75" rx="20" ry="5" />
```

rx：椭圆的 x 半径

ry：椭圆的 y 半径

cx：椭圆中心的 x 位置

cy：椭圆中心的 y 位置

线条

`Line`绘制直线。它取两个点的位置作为属性，指定这条线的起点和终点位置。

```html
<line x1="10" x2="50" y1="110" y2="150" stroke="black" stroke-width="5" />
```

x1：起点的 x 位置

y1：起点的 y 位置

x2：终点的 x 位置

y2：终点的 y 位置

折线

PolyLine 是一组连接在一起的直线。因为它可以有很多的点，折线的所有点位置都放在一个 points 属性中：

```html
<polyline
  points="60, 110 65, 120 70, 115 75, 130 80, 125 85, 140 90, 135 95, 150 100, 145"
/>
```

points

点集数列。每个数字用空白、逗号、终止命令符或者换行符分隔开。每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标。所以点列表（0,0），（1,1），（2,2）可以写成这样：“0 0，11，22”。

多边形

polygon 和折线很像，它们都是由连接一组点集的直线构成。不同的是，`polygon`的路径在最后一个点处自动回到第一个点。需要注意的是，矩形也是一种多边形，如果需要更多灵活性的话，你也可以用多边形创建一个矩形。

```html
<polygon
  points="50, 160 55, 180 70, 180 60, 190 65, 205 50, 195 35, 205 40, 190 30, 180 45, 180"
/>
```

points

点集数列。每个数字用空白符、逗号、终止命令或者换行符分隔开。每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标。所以点列表（0，0），（1，1）和（2，2）可以写成这样：“0 0，1 1，2 2”。路径绘制完后闭合图形，所以最终点的直线将从位置（2，2）连接到位置（0，0）。

路径

`path`可能是 SVG 中最常用的形状。你可以用 path 元素绘制矩形（直角矩形或者圆角矩形）、圆形、椭圆、折线形、多边形，以及一些其他形状，例如贝塞尔曲线、2 次曲线等曲线。

path 元素的形状是通过属性`d`定义的，属性`d`的值是一个“命令+参数”的序列。

每一个命令都用一个关键字母来表示，比如，字母“M”表示的是“Mome to”命令，当解析器读到这个命令时，它就知道你是打算移动到某个点。跟在命令后面的，是你需要移动到那个点的 x 和 y 轴坐标。比如移动到（10，10）这个点的命令，应该写成“M 10 10”。这一字符结束后，解析器就会去读下一段命令。每一个命令都有两种表示方式，一种是用**大写字母**，表示采用**绝对定位**。另一种是用**小写字母**，表示采用**相对定位**（例如：从上一个点开始，向上移动 10px，向左移动 7px）。

因为属性 d 采用的是用户坐标系统，所以不需标明单位。

## 填充和边框

Fill 和 Strokes 属性

上色

大多数基本的涂色可以通过在元素设置这两个属性来搞定：`fill`属性和`stroke`属性。`fill`属性设置对象内部的颜色，`stroke`属性设置绘制对象的线条的颜色。可以使用在 HTML 中的 CSS 颜色命名方案定义它们的颜色，比如颜色名（red）、rgb 颜色（rgb（255，0，0））、十六进制值、rgba 值，等等。

```html
<rect
  x="10"
  y="10"
  width="100"
  height="100"
  stroke="blue"
  fill="purple"
  fill-opacity="0.5"
  stroke-opacity="0.8"
/>
```

在 SVG 中可以分别定义填充色和边框色的不透明度，属性`fill-opacity`控制填充色的不透明度，属性`stroke-opacity`控制描边的不透明度。

> 在 FireFox3+支持 rgba 值，并且能够提供同样的效果，但是为了在其他浏览器中保持兼容，最好将它和填充/描边的不透明度分开使用。如果同时指定了 rgba 值和填充/描边不透明度，它们将都被调用。

描边

除了颜色属性，还有其他一些属性用来控制绘制描边的方式。

`stroke-width`属性定义了描边的宽度。注意，**描边是以路径为中心绘制的**。

`stroke-linecap`：

- `butt`：用直边结束线段，它是常规做法，线段边界 90 度垂直于描边的方向、贯穿它的终点。
- `square`：效果差不多，但是会稍微超出`实际路径`的范围，超出的大小由`stroke-width`控制。

- `round`：表示边框的终点是圆角，圆角的半径也是由于`stroke-width`控制的。

还有一个`stroke-linejoin`属性，用来控制两条描边线段之间，用什么方式连接。

每条折线都是两个线段连接起来的，连接处的样式由`stroke-linejoin`属性控制，它有三个可用的值，`miter`是默认值，表示用方形画笔在连接处形成尖角，`round`表示用圆角连接，实现平滑效果。最后还有一个`bevel`，连接处会形成一个斜接。

最后，你还可以通过指定`stroke-dasharray`属性，将虚线类型应用在描边上。

```html
<?xml version="1.0" standalone="no"?>
<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <path
    d="M 10 75 Q 50 10 100 75 T 190 75"
    stroke="black"
    stroke-linecap="round"
    stroke-dasharray="5,10,5"
    fill="none"
  />
  <path
    d="M 10 75 L 190 75"
    stroke="red"
    stroke-linecap="round"
    stroke-width="1"
    stroke-dasharray="5,5"
    fill="none"
  />
</svg>
```

`stroke-dasharray`属性的参数，是一组用逗号分隔的数字组成的数列。注意，和`path`不一样，这里的数字必须用逗号分隔（空格会被忽略）。每一组数字，第一个用来表示填色区域的长度，第二个用来表示非填色区域的长度。所以在上面的例子里，第二个路径会先作 5 个像素单位的填色，紧接着是 5 个空白单位，然后又是 5 个单位的填色。如果想要更复杂的虚线模式，你可以定义更多的数字。

第一个例子指定了 3 个数字，这种情况下，数字会循环两次，形成了一个偶数的虚线模式（奇数个循环两次变偶数个）。所以该路径首先渲染 5 个空白单位，10 个填色单位，5 个空白单位。通过两次循环得到偶数模式，并将这个偶数模式不断重复。

另外还有一些关于填充和边框的属性，包括`fill-rule`，用于定义如何给图形重叠的区域上色；`stroke-miterlimit`，定义什么情况下绘制或不绘制边框连接的`miter`效果；还有`stroke-dashoffset`，定义虚线开始的位置。

使用 CSS

除了定义对象的属性外，你可以通过 CSS 来样式化`填充`、`描边`。语法和在 HTML 里使用 CSS 一样，只不过你要把`background-color`、`border`改成`fill`和`stroke`。注意，不是所有的属性都能用 CSS 来设置。上色和填充的部分一般是可以用 CSS 来设置的，比如`fill`、`stroke`，`stroke-dasharray`等，但是不包括渐变和图案等功能。另外，`width`、`height`，以及路径的命令等等，都不能用 CSS 设置。判断它们能不能用 CSS 设置还是比较容易的。

> 备注：SVG 规范将属性区分成 properties 和其他 attributes，前者可以用 CSS 设置，后者则不能。

CSS 可以利用 style 属性插入到元素的行间：

```html
<rect
  x="10"
  height="180"
  y="10"
  width="180"
  style="stroke: black; fill: red;"
/>
```

或者，它可以被移到你所包含的一个特殊的样式部分，不过不是像 HTML 那样把这样的部分塞进`<head>`部分，而是把它包含在一个叫做`<defs>`的区域。

`<defs>`表示定义，这里面定义一些不会在 SVG 图形中出现、但是可以被其他使用的元素。

```html
<?xml version="1.0" standalone="no"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <style>
      <![CDATA[
             #MyRect {
               stroke: black;
               fill: red;
             }
          ]]>
    </style>
  </defs>
  <rect x="10" height="180" y="10" width="180" id="MyRect" />
</svg>
```

一些可以在 HTML 里使用的 CSS，在 SVG 里可能无法正常工作，比如`before`和`after`伪类。

## 渐变

除了简单填充颜色和描边，还可以创建和并在填充和描边上应用渐变色。

有两个类型的渐变：`线性渐变`和`径向渐变`。你必须给渐变内容指定一个 id 属性，否则文档内的其他元素就不能引用它。为了让渐变能被重复使用，渐变内容需要定义在`<defs>`标签内部，而不是定义在形状上面。

线性渐变

线性渐变沿着直线改变颜色，要插入一个线性渐变，你需要在 SVG 文件的`defs元素`内部，创建一个`<linearGradient>`节点。

```html
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="Gradient1">
      <stop class="stop1" offset="0%" />
      <stop class="stop2" offset="50%" />
      <stop class="stop3" offset="100%" />
    </linearGradient>
    <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="red" />
      <stop offset="50%" stop-color="black" stop-opacity="0" />
      <stop offset="100%" stop-color="blue" />
    </linearGradient>
    <style type="text/css">
      <![CDATA[
              #rect1 { fill: url(#Gradient1); }
              .stop1 { stop-color: red; }
              .stop2 { stop-color: black; stop-opacity: 0; }
              .stop3 { stop-color: blue; }
            ]]>
    </style>
  </defs>

  <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100" />
  <rect
    x="10"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#Gradient2)"
  />
</svg>
```

以上是一个应用了线性渐变的`<rect>`元素的示例。线性渐变内部有几个`<stop>`节点，这些节点通过指定位置的 offset（偏移）属性和 stop-color（颜色中值）属性来说明在渐变的特定位置上应该是什么颜色；可以直接指定这两个属性值，也可以通过 CSS 来指定他们的值，该例子中混合使用了这两种方法。例如：该示例中指明了渐变开始颜色为红色，到中间位置时变成半透明的黑色，最后变成蓝色。虽然你可以根据需求按照自己的喜好插入很多中间颜色，但是偏移量应该始终从 0%开始（或者 0 也可以，百分号可以不要），到 100%（或 1）结束。如果`stop`设置的位置有重合，将使用 XML 树中较晚设置的值。而且，类似于填充和描边，你也可以指定属性`stop-opacity`来设置某个位置的半透明度（同样，对于 FF3 你也可以设置 rgba 值）。

```html
<stop offset="100%" stop-color="yellow" stop-opacity="0.5" />
```

使用渐变时，我们需要在一个对象的属性`fill`或属性`stroke`中引用它，这跟你在 CSS 中使用 url 引用元素的方法一样。在例子中，url 只是一个渐变的`引用`，我们已经给这个渐变一个 ID`Gradient`。想要附加它，将属性`fill`设置为`url(#Gradient)`即可。现在对象就变成多色的了，也可以用同样的方式处理`stroke`。

`linearGradient`元素还需要一些其他的属性值，它们指定了渐变的大小和出现范围。渐变的方向可以通过两个点来控制，它们分别是属性 x1、x2、y1、y2，这些属性定义了渐变路线走向。渐变色默认是水平方向的，但是通过修改这些属性，就可以旋转该方向。下例中的 Gradient2 创建了一个垂直渐变。

```html
<linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1"></linearGradient>
```

> 备注：可以在渐变上使用`xlink:href属性`。如果使用了该属性时，一个渐变的属性和颜色中值（stop）可以被另一个渐变包含引用。在例子中，就不需要在 Grandient2 中重新创建全部的颜色中值（stop）。
>
> ```html
> <linearGradient id="Gradient1">
>   <stop id="stop1" offset="0%" />
>   <stop id="stop2" offset="50%" />
>   <stop id="stop3" offset="100%" />
> </linearGradient>
> <linearGradient
>   id="Gradient2"
>   x1="0"
>   x2="0"
>   y1="0"
>   y2="1"
>   xmlns:xlink="http://www.w3.org/1999/xlink"
>   xlink:href="#Gradient1"
> />
> ```
>
> 尽管通常你可能在文档的顶部就定义了 Gradient1，但在结点上直接包含了 xlink 的命名空间。

径向渐变

径向渐变与线性渐变相似，只是它是从一个点开始发散绘制渐变。创建径向渐变需要在文档的`defs`中添加`radialGradient`元素。

```html
<?xml version="1.0" standalone="no"?>
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="RadialGradient1">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>

  <rect
    x="10"
    y="10"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#RadialGradient1)"
  />
  <rect
    x="10"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#RadialGradient2)"
  />
</svg>
```

中值（stops）的使用方法与之前一致，但是现在这个对象的颜色是中间是红色的，且向着边缘的方向渐渐的变成蓝色。跟线性渐变一样，`<radialGradient>`节点可以有多个属性来描述其位置和方向，但是它更加复杂。径向渐变也是通过两个点来定义其边缘位置，两点中的第一个点定义了渐变结束所围绕的圆环，它需要一个中心点，由 cx 和 cy 属性以半径 r 来定义，通过设置点我们可以移动范围并改变它的大小，如上面例子的第二个<rect>所展示的。

第二个点被称为焦点，由 fx 和 fy 属性定义。第一个点描述了渐变边缘位置，焦点则描述了渐变的中心，如下例。

中心和焦点

```html
<?xml version="1.0" standalone="no"?>

<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>

  <rect
    x="10"
    y="10"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#Gradient)"
    stroke="black"
    stroke-width="2"
  />

  <circle
    cx="60"
    cy="60"
    r="50"
    fill="transparent"
    stroke="white"
    stroke-width="2"
  />
  <circle cx="35" cy="35" r="2" fill="white" stroke="white" />
  <circle cx="60" cy="60" r="2" fill="white" stroke="white" />
  <text x="38" y="40" fill="white" font-family="sans-serif" font-size="10pt">
    (fx,fy)
  </text>
  <text x="63" y="63" fill="white" font-family="sans-serif" font-size="10pt">
    (cx,cy)
  </text>
</svg>
```

因为如果焦点如之前描述的那样被移到圆圈的外面，渐变将不能正确呈现，所以该点会被假定在圆圈范围内。将认为该点雨中心点的位置一致。

线性渐变和径向渐变都需要一些额外的属性用于描述渐变过程，这里我希望额外提及一个`spreadMethod`属性，该属性控制了当渐变到达终点的行为，但是此时该对象尚未被填充颜色。这个属性可以有三个值：pad、reflect 或 repeat。Pad 就是目前我们见到的效果，即当渐变到终点时，最终的偏移颜色被用于填充对象剩下的空间。reflect 会让渐变一直持续下去，不过它的效果是与渐变本身是相反的，以 100%偏移位置的颜色开始，逐渐偏移到 0%位置的颜色，然后再回到 100%偏移位置的颜色。repeat 也会让渐变继续，但是它不会像 reflect 那样反向渐变，而是跳到最初的颜色然后继续渐变。

spreadMethod

```html
<?xml version="1.0" standalone="no"?>

<svg width="220" height="220" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient
      id="GradientPad"
      cx="0.5"
      cy="0.5"
      r="0.4"
      fx="0.75"
      fy="0.75"
      spreadMethod="pad"
    >
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient
      id="GradientRepeat"
      cx="0.5"
      cy="0.5"
      r="0.4"
      fx="0.75"
      fy="0.75"
      spreadMethod="repeat"
    >
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient
      id="GradientReflect"
      cx="0.5"
      cy="0.5"
      r="0.4"
      fx="0.75"
      fy="0.75"
      spreadMethod="reflect"
    >
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>

  <rect
    x="10"
    y="10"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#GradientPad)"
  />
  <rect
    x="10"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#GradientRepeat)"
  />
  <rect
    x="120"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#GradientReflect)"
  />

  <text x="15" y="30" fill="white" font-family="sans-serif" font-size="12pt">
    Pad
  </text>
  <text x="15" y="140" fill="white" font-family="sans-serif" font-size="12pt">
    Repeat
  </text>
  <text x="125" y="140" fill="white" font-family="sans-serif" font-size="12pt">
    Reflect
  </text>
</svg>
```

两种渐变都有一个叫做`gradientUnits(渐变单元)`的属性，它描述了用来描述渐变的大小和方向的单元系统。该属性有两个值：`userSpaceOnUse`、`objectBoundingBox`。默认值为`objectBoundingBox`，我们目前看到的效果都是在这种系统下的，它大体上定义了对象的渐变大小范围，所以你只要指定从 0 到 1 的坐标值，渐变就会自动的缩放到对象相同大小。userSpaceOnUse 使用绝对单元，所以你必须知道对象的位置，并将渐变放在同样地位置上。上例中的 radialGradient 需要被重写成:

```html
<radialGradient
  id="Gradient"
  cx="60"
  cy="60"
  r="50"
  fx="35"
  fy="35"
  gradientUnits="userSpaceOnUse"
></radialGradient>
```

你也可以利用属性`gradientTransform`给渐变添加额外的变化。如果对象边界框不是一个正方形，处理`gradientUnits='objectBoundingBox'`还有一些其他警告。

## 图案

patterns（图案）是 SVG 中用到的最让人混淆的填充类型之一。它的功能非常强大。它跟渐变一样，`<pattern>`需要放在 SVG 文档的`<defs>`内部。

```html
<?xml version="1.0" standalone="no"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <linearGradient id="Gradient1">
      <stop offset="5%" stop-color="white" />
      <stop offset="95%" stop-color="blue" />
    </linearGradient>
    <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
      <stop offset="5%" stop-color="red" />
      <stop offset="95%" stop-color="orange" />
    </linearGradient>

    <pattern id="Pattern" x="0" y="0" width=".25" height=".25">
      <rect x="0" y="0" width="50" height="50" fill="skyblue" />
      <rect x="0" y="0" width="25" height="25" fill="url(#Gradient2)" />
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="url(#Gradient1)"
        fill-opacity="0.5"
      />
    </pattern>
  </defs>

  <rect
    fill="url(#Pattern)"
    stroke="black"
    x="0"
    y="0"
    width="200"
    height="200"
  />
</svg>
```

在 pattern 元素内部你可以包含任何之前包含过的其他基本形状，并且每个形状都可以使用之前学习过的任何样式样式化，包括渐变和半透明。这里在 pattern 中绘制两个矩形（两个矩形互相重叠，一个矩形是另一个矩形大小的两倍，且用于填充整个 pattern）和一个圆。

pattern 容易混淆的事是，pattern 定义了一个单元系统以及他们的大小。上面例子中，在 pattern 元素定义了`width`和`height`属性，用于描述在重复下一个图案之前应该跨过多远。如果你想要在绘制时偏移矩形的开始点，也可以使用 x 和 y 属性，原因如下。

就像前面使用了`gradientUnits`属性，同样的`pattern`也有一个属性`patternUnits`用于描述我们使用的属性单元。这同之前使用的`objectBoundingBox`默认值一样，所以当一个值为 1 时，它被缩放到应用 pattern 对象的宽高值。因此，我们希望 pattern 垂直和水平重复 4 次，所以宽高被设置为 0.25，这一位置 pattern 的宽高仅为总外框大小的 0.25。

与渐变不同，pattern 有第二个属性`patternContentUnits`，它描述了`pattern`元素基于基本形状使用的单元系统，这个属性默认值为`userSpaceOnUse`，与`patternUnits`属性相反，这意味着除非你至少指定其中一个属性值（`patternContentUnits`或`patternUnits`），否则在`pattern`中绘制的形状将与`pattern`元素使用的坐标系不同，当你手写着部分时会容易混淆。为了使上例子生效，必须考虑边框（200 像素）大小和实际希望`pattern`垂直和水平重复 4 次的需求。这意味着每个 pattern 单元应该是`50*50`的方形，pattern 中的两个矩形和圆形的大小会被缩放适应到一个 50\*50 的边框里，任何我们绘制在边框外的内容都不会显示。因为我们希望 pattern 从边框的左上角里开始，所以 pattern 也必须偏移 10 像素，也就是 pattern 的``x`和`y`属性需要调整为`10/200=0.05`。

如果对象改变了大小，pattern 会自适应其大小，但是对象里面的内容不会自适应。所以当我们在 pattern 中还是放置 4 个重复的 pattern 时，组成 pattern 的对象将不会保持相同的大小，同时在他们之间会有大片空白区域。通过改变`patternContentUnits`属性，可以把所有的元素放到相同的单元系统中：

```html
<pattern
  id="Pattern"
  width=".25"
  height=".25"
  patternContentUnits="objectBoundingBox"
>
  <rect x="0" y="0" width=".25" height=".25" fill="skyblue" />
  <rect x="0" y="0" width=".125" height=".125" fill="url(#Gradient2)" />
  <circle
    cx=".125"
    cy=".125"
    r=".1"
    fill="url(#Gradient1)"
    fill-opacity="0.5"
  />
</pattern>
```

因为 pattern 内容与 pattern 本身处于相同的单元系统中，所以我们不同偏移边框以使 pattern 在正确的位置上开始，并且即使对象变大，pattern 也会自动的缩放以保证 pattern 内部的对象数目和重复不变。这与`userSpaceOnUse`系统不同，userSpaceOnUse 系统中如果对象改变大小，pattern 本身会保持不变，只是重复更多次去填满边框。

它有一点点的副作用，在 Gecko 中的圆如果半径设置得小于 0.075（尽管半径应该设置的比这个值大得多。

在你想要使用 pattern 的时候，可能你并不中意这些方法中的任何一个，pattern 通常都是有确认的大小并且重复他们自己，与对象形状独立开来。要想创建这种 pattern，pattern 和它的内容必须在当前用户空间中绘制，这样当对象在做如下操作时他们不会改变形状：

```html
<pattern
  id="Pattern"
  x="10"
  y="10"
  width="50"
  height="50"
  patternUnits="userSpaceOnUse"
>
  <rect x="0" y="0" width="50" height="50" fill="skyblue" />
  <rect x="0" y="0" width="25" height="25" fill="url(#Gradient2)" />
  <circle cx="25" cy="25" r="20" fill="url(#Gradient1)" fill-opacity="0.5" />
</pattern>
```

这意味着如果你后续改变了对象大小，pattern 也不会缩放。上述三个举例在下图中放在一个矩形中展示，高度被轻微拉伸到 300px。

## 文本

在 SVG 中有两种截然不同的文本模式。一种是写在图像中的文本，另外一种是 SVG 字体。

基础

在一个 SVG 文档中，`text 元素内部可以放任何的文字。

```html
<text x="10" y="10">Hello World!</text>
```

属性 x 和属性 y 决定了文本在视口中显示的位置。属性`text-color`，可以有这些值：`start`、`middle`、`end`或`inherit`，允许决定从这一点开始的文本流的方向。

和形状元素类似，属性`fill`可以给文本填充颜色，属性`stroke`可以给文本描边，形状元素和文本元素都可以引用渐变或图案，相比较 CSS2.1 只能绘制简单的彩色文字，SVG 显得更具有优势。

设置字体属性

文本的一个至关重要的部分是它显示的字体。SVG 提供了一些属性，类似于它们的 CSS 同行，用来激活文本选区。下面每个属性可以被设置为一个 SVG 属性或者称为一个 CSS 声明：`font-family`、`font-style`、`font-weight`、`font-variant`、`font-stretch`、`font-size`、`font-size-adjust`、`kerning`、`letter-spacing`、`word-spacing`、`text-decoration`。

其他文本相关的元素

tspan

该元素用来标记大块文本的子部分，它必须是一个`text`元素或者别的`tspan`元素的子元素。一个典型的用法是把句子中的一个词变成粗体红色。

```html
<text>
  <tspan font-weight="bold" fill="red">This is bold and red</tspan>
</text>
```

`tspan`元素有以下的自定义属性：

x 为容器设置一个新绝对`x`坐标。它覆盖了默认的当前的文本位置。这个属性可以包含一个数列，它们将一个一个地应用到`tspan`元素内的每一个字符上。

dx 从当前位置，用一个水平偏移开始绘制文本。这里，你可以提供一个值数列，可以应用到连续的字体，因此每次累积一个偏移。

此外还有属性 y 和属性 dy 作垂直转换。

rotate 把所有字符旋转一个角度。如果是一个数列，则使每个字符旋转分别旋转到那个值，剩下的字符根据最后一个值旋转。

textLength 这是一个很模糊的属性，给出字符串的计算长度。它意味着如果它自己的度量文字和长度不满足这个提供的值，则允许渲染引擎精细调整字形的位置。

tref

`tref`元素允许引用已经定义的文本，高效地把它复制到当前位置。你可以使用`xlink:href`属性，把它指向一个元素，取得其文本内容。你可以独立于源样式化它、修改它的外观。

```html
<text id="example">This is an example text.</text>

<text>
  <tref xlink:href="#example" />
</text>
```

textPath

该元素利用它的`xlink:href`属性取得一个任意路径，把字符对齐到路径，于是字体会环绕路径、顺着路径走：

```html
<path id="my_path" d="M 20,20 C 40,40 80,40 100,20" fill="transparent" />
<text>
  <textPath xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#my_path">
    This text follows a curve.
  </textPath>
</text>
```

## 基础变形

平移

你能把元素移动一段距离，甚至你可以根据相应的属性定位它。`translate()`变形方法专门效力于这个目的。

```html
<rect x="0" y="0" width="10" height="10" transform="translate(30,40)" />
```

该示例将呈现一个矩形，移到点（30，40），而不是出现在点（0，0）。

如果没有指定第二个值，它默认被赋值为 0。

旋转

旋转一个元素是相当常见的任务。使用`rotate()`变形就可以了：

```html
<rect x="20" y="20" width="20" height="20" transform="rotate(45)" />
```

该示例展示了一个方形，旋转了 45 度。`rotate()`的值是用角度指定的。

斜切

利用一个矩形制作一个斜菱形。可用`skewX()`变形和`skewY()`变形。每个需要一角度以确定元素斜切到多远。

缩放

`scale()`变形改变了元素的尺寸。它需要两个数字，作为比率计算如何缩放。0.5 表示收缩到 50%。如果第二个数字被忽略了，它默认等于第一个值。

用`matrix()`实现复杂变形

组合一些变形，可以直接用`matrix(a,b,c,d,e,f)`变形设置结果矩阵。

如果使用了变形，你会在元素内部建立了一个新的坐标系统，应用了这些变形，你为该元素和它的子元素指定的单位可能不是 1:1 像素映射。但是依然会根据这个变形进行歪曲、斜切、转换、缩放操作。

```html
<g transform="scale(2)">
  <rect width="50" height="50" />
</g>
```

上面示例中的结果 矩形将是 100px100px。

SVG 嵌在 SVG 内部

比起 HTML，SVG 允许你无缝嵌入别的 svg 元素里。因此你可以利用内部的 svg 元素的属性`viewBox`、属性`width`和属性`height`简单创建一个新的坐标系统。

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <svg width="100" height="100" viewBox="0 0 50 50">
    <rect width="50" height="50" />
  </svg>
</svg>
```

以上示例基本上跟它上面的示例有着同样的效果，也就是矩形将是指定的两倍大。

## 剪切和遮罩

擦除已经创建的元素的部分内容，看似矛盾，但是如果打算在 SVG 中创建一个半圆形，这将会很有用。

- Clipping 用来移除在别处定义的元素的部分内容。在这里，任何半透明效果都是不行的。它只能要么显示要么不显示。
- Masking 允许使用透明度和灰度值遮罩计算得到的软边缘。

创建剪切

```html
<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <clipPath id="cut-off-bottom">
      <rect x="0" y="0" width="200" height="100" />
    </clipPath>
  </defs>

  <circle cx="100" cy="100" r="100" clip-path="url(#cut-off-bottom)" />
</svg>
```

在（100，100）创建一个圆形，半径是 100。属性`clip-path`引用了一个带单个 rect 元素的`<clipPath>`元素。它内部的这个矩形将把画布的上半部分涂黑。注意，`clipPath`元素经常放在一个`defs`元素内。

然而，该 rect 不会被绘制。它的像素数据将用来确定：**圆形的哪些像素需要最终被呈现出来**。因为矩形只是覆盖了圆形的上半部分，所以下半部分消失了。

遮罩

遮罩的效果最有用的即是渐变。如果你想要让一个元素淡出，你可以利用遮罩效果实现这一点。

```html
<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <linearGradient id="Gradient">
      <stop offset="0" stop-color="white" stop-opacity="0" />
      <stop offset="1" stop-color="white" stop-opacity="1" />
    </linearGradient>
    <mask id="Mask">
      <rect x="0" y="0" width="200" height="200" fill="url(#Gradient)" />
    </mask>
  </defs>

  <rect x="0" y="0" width="200" height="200" fill="green" />
  <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)" />
</svg>
```

你看到有一个绿色填充的矩形在底层，一个红色填充的矩形在上层。后者有一个`mask`属性指向一个`mask`元素。`mask`元素的内容是一个单一的`rect`元素，它填充了一个透明到白色的渐变。作为红色矩形继承`mask`内容的`alpha`值（透明度）的结果。

用`opacity`定义透明度

opacity 属性可以用来设置整个元素的透明度：

```html
<rect x="0" y="0" width="100" height="100" opacity=".5" />
```

上面的矩形将绘制为半透明。填充和描边还有两个属性是`fill-opacity`和`stroke-opacity`，分别用来控制填充和描边的不透明度。需要注意的是描边将绘制在填充的上面。因此，如果你在一个元素上设置了描边透明度，但它同时设有填充，则描边的一半应用填充色，另一半应用背景色。

利用广为人知的 CSS 技术

Web 开发工具箱中有一个很有用的工具箱是`display:none`。它虽然无几悬念，但是依然可以在 SVG 上使用该 CSS 属性，连同 CSS2 定义的`visibility`和`clip`属性。为了恢复以前设置的`display:none`，知道这一点很重要：所有的 SVG 元素的初始`display`值都是`inline`。

## 元素

animate

动画元素放在形状元素的内部，用来定义一个元素的某个属性如何踩着时点改变。在指定持续时间里，属性从开始值变成结束值。

示例

```html
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <rect width="10" height="10">
    <animate
      attributeName="rx"
      values="0;5;0"
      dur="10s"
      repeatCount="indefinite"
    />
  </rect>
</svg>
```

animateTransform

`animateTransform`元素变动了目标元素上的一个变形属性，从而允许动画控制转换、缩放、旋转或斜切。

```html
<?xml version="1.0"?>
<svg
  width="120"
  height="120"
  viewBox="0 0 120 120"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <polygon points="60,30 90,90 30,90">
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0 60 70"
      to="360 60 70"
      dur="10s"
      repeatCount="indefinite"
    />
  </polygon>
</svg>
```

circle

`<circle>`SVG 元素是一个 SVG 的基本形状，用来创建圆，基于一个圆心和一个半径。

```html
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" />
</svg>
```

clipPath

SVG 元素`<clipPath>`定义了一条剪切路径，可作为其他元素的`clip-path`属性的值。

剪切路径限制了图形的可见范围。从概念上来说，如果图形超出了当前剪切路径所包围的区域，那么超出部分将不会被绘制。

```html
<svg viewBox="0 0 100 100">
  <clipPath id="myClip">
    <!--
      圆圈外的所有东西都会被裁剪掉，因此不可见。
    -->
    <circle cx="40" cy="35" r="35" />
  </clipPath>

  <!-- 作为引用元素（英文原文：for reference）的黑色心形 -->
  <path
    id="heart"
    d="M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z"
  />

  <!--
    和上述黑色心形形状相同的红色心形，剪切路径是上面定义的圆；
    红色心形只有在圆内的部分可见。
  -->
  <use clip-path="url(#myClip)" xlink:href="#heart" fill="red" />
</svg>
```

从概念上讲，剪切路径等于给引用元素设置了一个自定义的可视区域。因此，它虽然会影响一个元素的绘制，但不会影响这个元素本身的几何形状，比如被剪切元素（通过`clip-path`属性引用了`<clipPath>`的元素及其子元素）的包围盒和没有被剪切时相同。

默认情况下，`pointer-events`不会在被剪切掉的区域（不可见的区域）内触发。举个例子，如果一个半径为 10 的圆形被剪切成半径 5 的圆形，那么这个圆在半径为 5 以外的区域不会响应`click`事件。

defs

SVG 允许我们定义以后需要重复使用的图形元素。建议把所有需要再次使用的引用元素定义在`defs`元素里面。这样做可以增加 SVG 内容的易读性和无障碍。在`defs`元素中定义的图形元素不会直接呈现。你可以在你的视口的任意地方利用`<use>`元素呈现这些元素。

```html
<svg
  width="80px"
  height="30px"
  viewBox="0 0 80 30"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="Gradient01">
      <stop offset="20%" stop-color="#39F" />
      <stop offset="90%" stop-color="#F3F" />
    </linearGradient>
  </defs>

  <rect x="10" y="10" width="60" height="10" fill="url(#Gradient01)" />
</svg>
```

desc

SVG 绘画中的每个容器元素或图形元素都可以提供一个`desc`描述性字符串，这些描述只是纯文本的。如果当前的 SVG 文档片段在视媒体中呈现，desc 元素不会呈现为图形的一部分。替代性提词既可以看到也可以听到，它显示了 desc 元素但是不会显示路径元素或者别的图形元素。`desc`元素提升了 SVG 文档的无障碍。

ellipse

`ellipase`元素是一个 SVG 基本形状，用来创建一个椭圆，基于一个中心坐标以及它们的`x`半径和`y`半径。

椭圆不能精确指定椭圆的倾向，但是可以利用`transform`属性实现旋转。

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="50" rx="100" ry="50" />
</svg>
```
