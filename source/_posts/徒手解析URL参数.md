---
title: 徒手解析URL参数
subtitle: "手写代码"
date: 2017-06-19 14:19:00
author: "Damon"
header-img: "/img/about-bg.jpg"
tags:
    - JS
    - 前端面试
---


## 题目

不借助第三方库的条件下，用 JS 编写函数从下面的 URL 串中解析出所有的参数：

```
http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled
```
期望的返回结果格式如下：
```
{
  user: 'anonymous',
  id: [123, 456],     // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京',        // 中文
  enabled: true,      // 未指定值的 key 约定值为 true
}
```
## 代码实现

```
var URL = 'http://www.domain.com/?user=anonymous&id=0&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled'

function getURLParams (url) {
  if (url && typeof url !== 'string') {
    return {}
  }

  // 如果没传URL,默认解析浏览器当前URL
  let URL = url || window.location.href
  let searchOfURL = URL.split('?')[1] || null

  //如果没有查询参数,那么直接返回
  if (!searchOfURL) {
    return {}
  }

  // 处理查询参数
  let params = decodeURIComponent(searchOfURL).split('&').map(item => {
    let param = item.split('='),
        key   = param[0],
        value = param[1] || true;

    if (typeof value === 'string' && !isNaN(Number(value))) {
      value = Number(value)
    }

    return { key, value }

  }).reduce((params, item) => {
    const { key, value } = item

    // 判断key是否存在, 注意:不能使用 if (!params[key]) ,因为可能出现值为 0 的情况
    if ( typeof params[key] === 'undefined') {
      params[key] = value
    } else {
      // 存在key,那么把相同value放数组内
      params[key] = Array.isArray(params[key]) ? params[key].concat(value) : [].concat(params[key], value)
    }

    return params
  }, {})

  return params
}

console.log(getURLParams(URL))

// 运行结果
// { user: 'anonymous',
//   id: [ 0, 456 ],
//   city: '北京',
//   d: true,
//   enabled: true }
```