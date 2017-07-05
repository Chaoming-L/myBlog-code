---
title: JS深复制与浅复制
subtitle: 深复制函数实现
date: 2017-07-03 10:00:53
author: "Damon"
header-img: "/img/about-bg.jpg"
tags:
    - JS
    - 前端面试
---

## 前言

前段时间学习函数式编程,里面有一个重要的概念就是,函数永远不要对数据作修改。 不修改数据，意味着输入一个变量，经过计算后返回的永远都是一个新的变量。 这么做的好处是让数据可以进行所谓的时间旅行，在任何的时间可以回溯到系统的之前的任意状态，而不引起副作用。

well！ 复制JS的基本数据类型，再简单不过了，直接创建一个新变量然后进行赋值，这么做就完成简单赋值. 如下:
```
var foo = 'go';
var copy = foo; 
foo = 'gooooooo';
console.log(copy)   // 'go'
```
但是,如果复制对象不是基本数据类型,那么就会就会出现以下状况:
```
var object = { obj: { a: 1, b: 2 } };
var copy = object;
object.obj.a = 100
console.log(copy)   //  { obj: { a: 100, b: 2 } }
```
由此可见, copy.obj 只是对object.obj 的一个引用。(这就是浅复制)   
这并不是我们所期待的结果.我们想要的是,copy对象与object之间再没有任何关系,无论我们怎么修改object。
所以,这就产生了深复制的需求(复制品 与 被复制品的数据完全独立,修改其中一个对象不会改变另外一个对象)。

## 实现

前面,介绍浅复制和深复制。JS原生没有实现深复制的api,所以只能我们自己造轮子。（万恶的javascript,为什么就没有深复制api呢... 可能是为了省点内存吧?）
```
function deepClone(obj) {
    if (typeof obj !== 'object') {
        return obj
    }
    var newObj = Array.isArray(obj) ? [] : {}

    for (var key in obj) {
        var val = obj[key]
        if (typeof obj[key] === 'object') {
            newObj[key] = deepClone(val)
        } else {
            newObj[key] = val
        }
    }
    return newObj
}

var src = { ss: { w: 1 }, j: [1, { s: 3, j: [2, 4] }] }
var copy = deepClone(src)

src.ss.w = 444
copy.ss.w = '真的6'
console.log(JSON.stringify(src))    // { ss: { w: 444 }, j: [1, { s: 3, j: [2, 4] }] }
console.log(JSON.stringify(copy))   // { ss: { w: '真的6' }, j: [1, { s: 3, j: [2, 4] }] }
```
嗯. 以上可以看到复制品和被复制品之间,相互是独立的. 这样我们就可以放心操作他们修改他们,而不必担心任何副作用了(除了多占浏览器一丁点内存外).