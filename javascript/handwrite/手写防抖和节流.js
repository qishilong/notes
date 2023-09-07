// 函数防抖
function debounce(callback, time) {
    var timer = undefined;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        var args = arguments;
        timer = setTimeout(function () {
            callback.apply(null, args);
        }, time);
    };
}
// 函数节流
function throttle(callback, time, isImmediately) {
    if (isImmediately === undefined) {
        isImmediately = true;
    }
    if (isImmediately) {
        // 时间戳实现
        var t_1 = undefined;
        return function () {
            if (!t_1 || Date.now() - t_1 >= time) {
                callback.apply(null, arguments);
                t_1 = Date.now(); // 更新当前时间戳
            }
        };
    }
    else {
        // setTimeout 实现
        var timer_1 = undefined;
        return function () {
            if (timer_1) {
                return;
            }
            var args = arguments;
            timer_1 = setTimeout(function () {
                callback.apply(null, args);
                timer_1 = undefined;
            }, time);
        };
    }
}
;
