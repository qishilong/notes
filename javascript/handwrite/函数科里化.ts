/**
 * 函数科里化
 * 科里化最重要的作用是把多参函数变为单参函数
 */
function curry(func: Function) {
    // 当前调用的参数
    const args = Array.prototype.slice.call(arguments, 1);
    // 保存 this
    const that = this;
    return function () {
        // 当前调用的参数
        const currentArgs = Array.from(arguments);

        // 总参数
        const totalArgs = args.concat(currentArgs);

        if (totalArgs.length >= func.length) {
            // 参数数量够了
            return func.apply(null, totalArgs);
        } else {
            // 当前参数数量仍然不够
            totalArgs.unshift(func);
            return that.curry.apply(that, totalArgs);
        }
    };
}