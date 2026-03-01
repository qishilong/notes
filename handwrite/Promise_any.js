/**
 * 得到一个新的 Promise，该 Promise 的状态取决于 proms 的执行
 * proms 是一个迭代器，包含多个 Promise
 * 只要有一个 Promise 成功则成功，并返回第一个成功的 Promise 的数据
 * 所有 Promise 失败则失败，返回所有 Promise 失败的数据，并且按照传入的 Promise 排序
 * 如果传入的迭代器为空，则直接失败，并返回一个空数组
 * @param {Iterable<Promise>} iterator
 * @returns
 */
Promise.myAny = iterator => {
  return new Promise((resolve, reject) => {
    try {
      const result = []; // 所有失败任务结果

      let count = 0; // 任务总数
      let rejected = 0; // 失败的任务数量

      let resolved = false; // 所有任务中是否有一个已经成功的

      for (const item of iterator) {
        let i = count; // 保存当前任务下标

        count++; // 更新任务总数

        // 将下面所有任务放入微队列
        Promise.resolve(item).then(
          data => {
            if (!resolve) {
              resolved = true;
              // 只要有一个任务成功，则成功，并返回成功任务结果
              resolve(data);
            }
          },
          error => {
            result[i] = error; // 记录失败任务结果并对应任务下标

            rejected++; // 更新失败任务数量

            // 如果失败任务数量等于任务总数（此时的任务总数值已经确定），则任务失败，并返回所有失败任务结果
            if (rejected === count) {
              reject(result);
            }
          }
        );
      }

      // 如果传入的任务数量为空，则直接失败，并返回一个空数组
      if (count === 0) {
        reject(result);
      }
    } catch (error) {
      reject(error);
    }
  });
};
