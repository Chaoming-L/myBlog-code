---
title: ImagePreview组件
date: 2017-10-17 14:21:45
tags: 
---

# 组件设计总结

---
## react组件设计
按照组件的使用方式来划分,有两种方式:
- `静态方法` 
>- 把组件的一系列逻辑封装成一个函数,使用时直接调用函数.


- `react.Component` 
>- 把组件封装成component形式,如: `<Component props />`

---


## imagePreivew组件设计思路
以上两种设计模式,哪种适合imagePreview呢?  看以下分析

* 封装成`Component形式`

```jsx

import {ImagePreview} from 'react-gm';

// 使用演示
class example extends React.Component {
    // 需要状态控制浮层的显示
    state = {
        showImagePreview: false
    };
    
    hanleOpen() {
       this.setState({showImagePreview: true});
    }
    
    handleClose() {
       this.setState({showImagePreview: true});
    }

    render() {
        return (
            <div>
                <img src="1" onClick={this.handleOpen.bind(this)} />
                {/* 浮层需要埋点,使用很繁琐 */}
                {this.state.showImagePreview && 
                 <ImagePreview  handleClose={this.handleClose.bind(this/>
                }
            </div>
        )
    }
}

```

* 封装成`静态方法`

```jsx

import {ImagePreview} from 'react-gm';

// 使用演示
class example extends React.Component {
    render() {
        return (
            <div>
                <img src="1" onClick={() => ImagePreview()} />
            </div>
        )
    }
}

```
对比可以看出来,组件封装成静态方法的形式,特别适用浮层类组件.   
* 使得组件自己管理自己的显示状态
* 无需埋点


---

## 预览大图的实现
实现大图居中显示有N种方法,ImagePreview实现居中使用了`object-fit`

* 定义: `object-fit` 只能用于『可替换元素』(replaced element) 。所谓可替换元素，是指元素的内容和表现不是由CSS控制的，独立渲染的外部元素，比如： `img`、 `object`、 `video` 和 `表单元素`，如`textarea`、 `input`，`audio` 和 `canvas`在一些特殊情况下，也可以作为可替换元素。

*注意: *使用`object-fit`的使用一定要设置`size`*

`object-fit` 有五个可选值，分别是：

* `fill` 默认值。填充，可替换元素填满整个内容区域，可能会改变长宽比。
* `contain` 包含，保持长宽比，保证可替换元素完整显示，长宽比和内容区域的长宽比不一致时，内容区域会出现空白。
* `cover` 覆盖，保持长宽比，保证内容区域被填满，所以可替换元素可能会被切掉一部分，从而不能完整展示。
* `none` 顾名思义，就是什么都没有啦，当然不是什么都没有啦，而且千万不要以为和`fill`是一样的！实际效果是，保持可替换元素原尺寸和比例。
* `scale-down` 等比缩小。效果类似 `contain` 或 `none`

直观一点可以看图: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit

### one more thing
当元素被 `object-fit` 裁切的时候，你一定想知道如何控制裁切的位置。 所以, `object-position` 就是为了解决这个问题的。

`object-position` 不难理解，类似 background-position，不多说。

### 浏览器兼容
* IE全部不支持
* Chrome 31+
* Safari 7.1+ 
* Firefox 36+

---
## scrollIntoViewIfNeeded
缩略图滚动上使用`scrollIntoViewIfNeeded`,使当前图片保持在视图范围内(改变元素的scrollLeft)

---