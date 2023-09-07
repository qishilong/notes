/**
 * 函数科里化
 * 科里化最重要的作用是把多参函数变为单参函数
 */
function curry(func) {
    // 当前调用的参数
    var args = Array.prototype.slice.call(arguments, 1);
    // 保存 this
    var that = this;
    return function () {
        // 当前调用的参数
        var currentArgs = Array.from(arguments);
        // 总参数
        var totalArgs = args.concat(currentArgs);
        if (totalArgs.length >= func.length) {
            // 参数数量够了
            return func.apply(null, totalArgs);
        }
        else {
            // 当前参数数量仍然不够
            totalArgs.unshift(func);
            return that.current.apply(that, totalArgs);
        }
    };
}
