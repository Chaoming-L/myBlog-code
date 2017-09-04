/* 深复制对象(使用递归方法)
*  @return {obj}  返回一个深复制后的对象
*  @param obj {obj}  需要复制的对象
*/
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
console.log(JSON.stringify(src))
console.log(JSON.stringify(copy))