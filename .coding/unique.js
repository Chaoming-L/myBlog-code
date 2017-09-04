/**
 * 数组去重
 */

// ES6实现

function unique(arr) {
    return Array.from(new Set(arr));
}


function unique2(arr) {
    if (!Array.isArray(arr)) {
        return
    }
    var newArr = [],
        obj = {};
    arr.forEach(item => {
        if (!obj[item]) {
            newArr.push(item);
            obj[item] = 1;
        }
    })

    return newArr
}

var arr = [1, 1, 33, undefined, undefined]
console.log(unique2(arr))