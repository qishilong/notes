/**
 * 1. all
 * 2. any
 * 3. race
 * 4. allSettled
 * 5. resolve
 * 6. reject
 * 7. finally
 * 8. catch
 */

/**
 * 判断一个是不是 promise 对象
 * @param {*} obj
 */
function isPromise(obj) {
  return !!(obj && typeof obj === "object" && typeof obj.then === "function");
}

/**
 * 得到一个新的 Promise
 * 该 Promise 的状态取决于 proms 的执行
 * proms 是一个迭代器，包含多个 Promise
 * 如果所有 Promise 成功则成功，返回的是所有 Promise 成功的数据，并且按照传入的 Promise 顺序排列
 * 只要有一个 Promise 失败则失败，并且返回第一个失败的 Promise 的原因
 * 如果传入的迭代器为空，则直接成功，并返回一个成功后的空数组
 * @param {*} obj
 */
Promise.myAll = (obj) => {
  return new Promise((resolve, reject) => {
    try {
      const result = [];
      // 任务总数
      let all = 0;
      // 已经完成的数量
      let fulfilled = 0;
      for (const item of obj) {
        let i = all;
        all++;
        Promise.resolve(item).then((data) => {
          fulfilled++;
          result[i] = data;
          if (all === fulfilled) {
            resolve(result);
          }
        });
      }
      if (all === 0) {
        resolve(result);
      }
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * 几乎和 all 相反
 * 得到一个新的 Promise，该 Promise 的状态取决于 proms 的执行
 * proms 是一个迭代器，包含多个 Promise
 * 只要有一个 Promise 成功则成功，并返回第一个成功的 Promise 的数据
 * 所有 Promise 失败则失败，返回所有 Promise 失败的数据，并且按照传入的 Promise 排序
 * 如果传入的迭代器为空，则直接失败，并返回一个空数组
 * @param {*} obj
 */
Promise.myAny = (obj) => {
  return new Promise((resolve, reject) => {
    try {
      const result = [];
      let all = 0;
      let isResolve = false;
      let rejected = 0;
      for (let item of obj) {
        let i = all;
        all++;
        Promise.resolve(item).then(
          (data) => {
            if (!isResolve) {
              isResolve = true;
              resolve(data);
            }
          },
          (res) => {
            rejected++;
            result[i] = res;
            if (all === rejected) {
              reject(result);
            }
          },
        );
      }
      if (all === 0) {
        reject(result);
      }
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * 返回的 Promise 和第一个有结果的 Promise 一致
 * @param {*} obj
 */
Promise.myRace = (obj) => {
  return new Promise((resolve, reject) => {
    for (const item of obj) {
      Promise.resolve(item).then(resolve, reject);
    }
  });
};

/**
 * 等待所有 Promise 有结果后，该方法返回的 Promise 完成，并且按照顺序将所有结果汇总
 * @param {*} obj
 */
Promise.myAllSettled = (obj) => {
  const result = [];
  for (const item of obj) {
    result.push(
      Promise.resolve(item).then(
        (data) => {
          return {
            status: "fulfilled",
            value: data,
          };
        },
        (res) => {
          return {
            status: "rejected",
            value: res,
          };
        },
      ),
    );
  }
  return Promise.all(result);
};

/**
 * 返回一个已完成的 Promise
 * 特殊情况：
 * 1. 如果 data 本身是 ES6 的 Promise 对象，直接返回
 * 2. 传递的对象是 PromiseLike(Promise A+)，返回新的 Promise，状态和其保持一致即可
 * @param {*} obj
 */
Promise.myResolve = (obj) => {
  if (obj in Promise) {
    return obj;
  }
  return new Promise((resolve, reject) => {
    if (isPromise(obj)) {
      obj.then(resolve, reject);
    } else {
      resolve(obj);
    }
  });
};

/**
 * 得到一个被拒绝的 Promise
 * @param {*} obj
 */
Promise.myReject = (obj) => {
  return new Promise((resolve, reject) => {
    reject(obj);
  });
};

/**
 * 无论成功还是失败都会执行回调函数
 * @param {*} fn
 */
Promise.prototype.finally = (fn) => {
  return Promise.resolve().then(
    (data) => {
      fn();
      return data;
    },
    (res) => {
      fn();
      return res;
    },
  );
};

/**
 * 仅处理失败的场景
 * @param {*} fn
 */
Promise.prototype.catch = (fn) => {
  return Promise.resolve().then(null, fn);
};

const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve(1);
    }, 1000);
  });
};

const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve(2);
    }, 2000);
  });
};
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3);
      resolve(3);
    }, 3000);
  });
};
const promise4 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(4);
      reject(4);
    }, 4000);
  });
};
const promiseArr = [promise1, promise2, promise3, promise4];

Promise.myAll(promiseArr).then((res) => console.log(res));
Promise.all(promiseArr).then((res) => console.log(res));

const promise5 = Promise.resolve(3);
const promise6 = 42;
const promise7 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
const arr = [promise5, promise6, promise7];

Promise.myAll(arr).then((res) => console.log(res));
Promise.all(arr).then((values) => {
  console.log(values);
});
