/**
 * 得到一个新的 Promise
 * 该 Promise 的状态取决于 proms 的执行
 * proms 是一个迭代器，包含多个 Promise
 * 如果所有 Promise 成功则成功，返回的是所有 Promise 成功的数据，并且按照传入的 Promise 顺序排列
 * 只要有一个 Promise 失败则失败，并且返回第一个失败的 Promise 的原因
 * 如果传入的迭代器为空，则直接成功，并返回一个成功后的空数组
 * @param {Iterable<Promise>} iterator
 * @returns {Promise}
 */
Promise.myAll = iterator => {
  return new Promise((resolve, reject) => {
    try {
      const result = []; // 任务完成结果
      let count = 0; // 任务总数
      let resolved = 0; // 已经完成任务数量

      for (const item of iterator) {
        let i = count; // 记录当前的任务下标

        count++; // 更新任务总数

        // 将下面所有任务放入微队列
        Promise.resolve(item).then(data => {
          resolved++; // 更新已经完成的任务数量
          result[i] = data; // 更新任务完成结果并且对应任务的下标

          // 如果任务完成的数量等于任务总数（此时的任务总数值已经确定），返回结果
          if (resolved === count) {
            resolve(result);
          }
        }, reject); // 失败情况，放回失败结果
      }

      // 任务总数为0，返回结果
      if (count === 0) {
        resolve(result);
      }
    } catch (error) {
      reject(error); // 失败情况返回失败结果
    }
  });
};

// 测试
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.myAll([p1, p2, p3, Promise.reject('失败的Promise')])
  .then(result => {
    console.log(result); // [1, 2, 3]
  })
  .catch(error => {
    console.error(error);
  });
