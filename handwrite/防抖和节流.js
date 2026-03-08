/**
 * 防抖
 * @param {Function} callback
 * @param {number} wait
 * @param {boolean} immediate - 是否首次立即执行
 */
function debounce(callback, wait, immediate = false) {
  let timeId = null;
  return function (...args) {
    if (timeId !== null) {
      clearTimeout(timeId);
    }

    if (immediate && timeId === null) {
      return callback.apply(this, args);
    }

    timeId = setTimeout(() => {
      try {
        if (!immediate) {
          callback.apply(this, args);
        }
      } finally {
        timeId = null;
      }
    }, wait);
  };
}

/**
 * 节流
 * @param {Function} callback
 * @param {number} wait
 * @param {boolean} immediately 是否立即首次执行
 */
function throttle(callback, wait, immediately = true) {
  if (immediately) {
    // 时间戳实现
    let time = 0;
    let trailingTimeId = null;
    return function (...args) {
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
    // setTimeout 实现
    let timeId = null;
    let lastArgs = null;
    let lastThis = null;
    return function (...args) {
      lastArgs = args;
      lastThis = this;
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
