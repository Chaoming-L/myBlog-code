---
title: JS排序算法
subtitle: "数组 排序"
author: "Damon"
header-img: "post-bg-js-version.jpg"
date: 2017-06-16 13:41:37
tags:
    - JS
    - 前端面试
---

## 前言

这篇博文将会写一些自己日常用到的js排序算法.  排序算法一次性写完,个人感觉不太实际,所以会陆续更新比较好.

---

## 代码实现

### 快速排序

```
/*  输入数组快速排序
*   @params arr {Array}
*   @return {Array}
*/
function quickSort(arr) {
  while (arr.length <= 1) {
    return arr
  }

  let midNumber = Math.floor(arr.length / 2),
      // 从排序的数组中取出中位元素(splice会修改原来数组)
      midValue = arr.splice(midNumber,1),
      left = [],
      right = []

  for (var i = arr.length - 1; i >= 0; i--) {
    // 所有元素跟中位元素比较大小, 小于中位数的放在左边数组
    if (arr[i] < midValue[0]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat(midValue,quickSort(right))
}

var arr = [2,3,22,11,1]

quickSort(arr)  // [1,2,3,11,22]

```

### Array.prototype.sort()


sort() 方法在适当的位置对数组的元素进行排序，并返回数组。默认排序顺序是根据字符串Unicode码点。
sort(compareFunction) 使用compareFunction进行进阶排序需求。

排序怎么能忘记JS原生的排序方法sort呢?  come on!  二话不说,代码撸起来..

```
var fruit = ['cherries', 'apples', 'bananas'];
fruit.sort();
// ['apples', 'bananas', 'cherries']

var scores = [1, 10, 21, 2];
scores.sort();
// [1, 10, 2, 21]
// 注意10在2之前,
// because '10' comes before '2' in Unicode code point order.

var things = ['word', 'Word', '1 Word', '2 Words'];
things.sort();
// ['1 Word', '2 Words', 'Word', 'word']
// 在Unicode中, 数字在大写字母之前,
// 大写字母在小写字母之前.

```

sort 方法可以使用 函数表达式 方便地书写：

```
var numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers);

// [1, 2, 3, 4, 5]

```

对象可以按照某个属性排序：

```
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];

items.sort(function (a, b) {
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  // a 必须等于 b
  return 0;
});

```

compareFunction 可能需要对元素做多次映射以实现排序，尤其当 compareFunction 较为复杂，且元素较多的时候，某些 compareFunction 可能会导致很高的负载。使用 map 辅助排序将会是一个好主意。基本思想是首先将数组中的每个元素比较的实际值取出来，排序后再将数组恢复。

```
// 需要被排序的数组
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 对需要排序的元素进行 位置临时存储 和 元素前处理
var mapped = list.map((item, i) => (
 { index: i, value: item.toLowerCase() }
))

// 对处理后的数据进行对个值的排序
mapped.sort((a, b) => {
    return +(a.value > b.value) || +(a.value === b.value) - 1
})

// 根据索引得到排序结果
list.map((item) => list[item.index] )

```