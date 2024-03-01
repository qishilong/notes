/**
 * 函数防抖
 * 写法1
 * @param fn
 * @param wait
 */
// function debounce(callback: Function, time: number) {
//   let timer: number | undefined = undefined;
//   return function () {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     const args = arguments;
//     timer = setTimeout(function () {
//       callback.apply(null, args);
//     }, time);
//   };
// }

/**
 * 函数防抖
 * 写法二
 * @param fn
 * @param wait
 */
const debounce = <F extends (...arg: any[]) => void>(fn: F, wait: number) => {
  let timeId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};

// 函数节流
function throttle(callback: Function, time: number, isImmediately: boolean) {
  if (isImmediately === undefined) {
    isImmediately = true;
  }
  if (isImmediately) {
    // 时间戳实现
    let t: number | undefined = undefined;
    return function () {
      if (!t || Date.now() - t >= time) {
        callback.apply(null, arguments);
        t = Date.now(); // 更新当前时间戳
      }
    };
  } else {
    // setTimeout 实现
    let timer: number | undefined = undefined;
    return function () {
      if (timer) {
        return;
      }
      const args = arguments;
      timer = setTimeout(function () {
        callback.apply(null, args);
        timer = undefined;
      }, time);
    };
  }
}
