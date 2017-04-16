---
title: 实现链式调用LazyMan
subtitle: "原型链 链式调用实现"
author: "Damon"
header-img: "post-bg-js-version.jpg"
date: 2017-04-09 09:43:13
tags:
    - JS
    - 前端面试
---

## 前言

昨天面试碰到一条非常有意思的面试题，关于链式调用和流程控制的写法，下面把我自己的实现分享一下。

---

## 题目

实现下面的函数:

```
LazyMan(“Hank”)
//Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)
// Hi! This is Hank!
// 等待10秒..
// Wake up after 10
// Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)
// Hi This is Hank!
// Eat dinner~
// Eat supper~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)
// 等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

```

这道题看起来很简单,不就是jquery经常使用的链式调用吗?
但是看到最后一步sleepfirst,就发现实现没有想象中那么简单.

## 代码实现

废话不多说直接上代码:

```
function _LazyMan(man) {
    var self = this;
    // 任务队列
    self.task = [];
    var fn = function () {
        console.log('I am ' + man);
        self.next();
    }

    // 向队列尾中加入一个任务
    self.task.push(fn);

    // 这里使用setTimeout,是确保链式调用上所有任务都加入队列后,在JS下一个事件循环,开始第一个任务
    setTimeout(function () {
        self.next();
    }, 0)

    return self;
}

_LazyMan.prototype.firstSleep = function (second) {
    var self = this;

    var fn = function () {
        setTimeout(function () {
            console.log('Wake up after ' + second + ' s!');
            self.next();
        }, second * 1000)
    }

    // 向队列尾开头加入一个任务
    self.task.unshift(fn);

    return self;
}

_LazyMan.prototype.sleep = function (second) {
    var self = this;

    var fn = function () {
        setTimeout(function () {
            console.log('Wake up after ' + second + ' s!');
            self.next();
        }, second * 1000)
    }

    // 向队列尾中加入一个任务
    self.task.push(fn);
    return self;
}

_LazyMan.prototype.eat = function (food) {
    var self = this;

    var fn = function () {
        console.log('eat ' + food);

        self.next();
    }

    // 向队列尾加入一个任务
    self.task.push(fn);
    return self;
}

// next实现
_LazyMan.prototype.next = function () {
    // 删除队列的第一位元素
    var runFunc = this.task.shift();

    // 如果renFunc 不是undefined,那么执行runFunc
    runFunc && runFunc();

}

function LazyMan(man) {
    return new _LazyMan(man);
}

LazyMan('Hank').firstSleep(1).sleep(2).eat('egg');

/* 运行结果 */
// Wake up after 1 s!
//     I am Hank
// Wake up after 2 s!
//     eat egg

```
## 总结

实现要点:
1. 在实例上创建一个任务队列数组(先进先出).
2. 实现一个next方法,按照先进先执行的规则,依次执行并删除队列中的函数.
3. 在实例化LazyMan的时候,使用setTimeout执行第一次next方法.

* 注:setTimeout的延时为0时并不会立即触发，一个是浏览器自身就有一个几毫秒更新频率，另一个就是异步队列的问题，
setTimeout中的回调函数会加入等待队列，在等待延迟触发的过程中，有新的同步脚本需要执行的话，新的同步脚本不会排在setTimeout的回调函数之后，而是立即执行。
















