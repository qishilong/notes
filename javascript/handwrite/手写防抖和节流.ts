/**
 * 防抖
 * @param callback
 * @param wait
 */
function debounce<F extends (...args: any[]) => void>(callback: F, wait: number) {
  let timeId: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: Parameters<F>) {
    if (timeId !== null) {
      clearTimeout(timeId);
      timeId = null;
    }
    timeId = setTimeout(() => {
      callback.apply(this, args);
      timeId = null;
    }, wait);
  };
}

/**
 * 节流
 * @param callback
 * @param wait
 * @param immediately
 */
function throttle<F extends (...args: any[]) => void>(
  callback: F,
  wait: number,
  immediately: boolean = true
) {
  if (immediately) {
    let time: number = 0;
    let trailingTimeId: ReturnType<typeof setTimeout> | null = null;
    return function (this: unknown, ...args: Parameters<F>) {
      const remaining = wait - (Date.now() - time);
      if (remaining <= 0) {
        // Date.now() - time >= wait
        if (trailingTimeId !== null) {
          clearTimeout(trailingTimeId);
          trailingTimeId = null;
        }
        callback.apply(this, args);
        time = Date.now();
      } else {
        // 保留最后一次调用
        if (trailingTimeId !== null) {
          clearTimeout(trailingTimeId);
        }

        trailingTimeId = setTimeout(() => {
          callback.apply(this, args);
          time = Date.now();
          trailingTimeId = null;
        }, remaining);
      }
    };
  } else {
    let timeId: ReturnType<typeof setTimeout> | null = null;
    return function (this: unknown, ...args: Parameters<F>) {
      let lastArgs: Parameters<F> | null = args;
      let lastThis: unknown = this;
      if (timeId !== null) {
        return;
      }
      timeId = setTimeout(() => {
        callback.apply(lastThis, lastArgs);
        timeId = null;
        lastArgs = null;
        lastThis = null;
      }, wait);
    };
  }
}
