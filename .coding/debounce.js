/**
 * 函数去抖(如果有连续事件响应, 则在事件结束后的延迟一段时间触发)
 * @param {function}  function 需要去抖的函数
 * @param {number} delay 调用延迟时间
 */
function debounce(func, delay) {
    let timer;
    return function () {
        let context = this, arg = arguments;

        clearTimeout(timer);

        timer = setTimeout(function () {
            func.apply(context, arg)
        }, delay)

    }
}


/**
 * 函数节流（如果有连续事件响应，则每间隔一定时间段触发）
 * @param {function} func 需要节流的函数
 * @param {number} wait  触发间隔
 */

function throttle(func, wait) {
    let startTime;
    return function () {
        let context = this, arg = arguments, currentTime = +new Date();

        if (!startTime) {
            startTime = currentTime
        }

        if (currentTime - startTime > wait) {
            func.apply(context, arg)
            startTime = currentTime
        }
    }
}




function say(n) {
    console.log(`hello ${n}`)
}

var call = throttle(say, 1000)
// 滚动结束1s后执行say
window.onscroll = () => { call('ass!') }