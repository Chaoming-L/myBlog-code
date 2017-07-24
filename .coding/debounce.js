/**
 * 函数去抖(如果有连续事件响应, 则在事件结束后的延迟一段时间触发)
 * @param {function}  function 需要去抖的函数
 * @param {number} delay 调用延迟时间
 */
function debounce(func, delay) {
    let timer;
    return function () {
        let context = this, arg = arguments;
        // 由于事件持续相应,定时器会在每次相应中清除掉.
        // 最终使得,事件停止相应之前的建立的最后一个定时器生效
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
        // 大于间隔时间才马上执行函数, 然后更新函数执行时间
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