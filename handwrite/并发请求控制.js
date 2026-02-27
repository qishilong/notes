const promiseLimit = (promiseTaskArr, limit) => {
  if (
    !promiseTaskArr ||
    !Array.isArray(promiseTaskArr) ||
    promiseTaskArr.length === 0 ||
    limit <= 0
  ) {
    return Promise.resolve([]);
  }

  const length = promiseTaskArr.length;

  if (length <= limit) {
    return Promise.all(promiseTaskArr.map(task => task()));
  }

  return new Promise((resolve, reject) => {
    let currentRunningCount = 0; // 当前正在运行的 Promise 数量
    let resolveCount = 0;
    let currentRunningIndex = 0; // 当前正在运行的Promise索引
    const result = [];

    // 启动下一个Promise（当并发未满）
    const next = () => {
      if (resolveCount === length) {
        resolve(result);
        return;
      }

      while (currentRunningCount < limit && currentRunningIndex < length) {
        const taskIndex = currentRunningIndex; // 保存当前任务索引
        const promiseTask = promiseTaskArr[taskIndex];
        currentRunningIndex++; // 更新当前正在运行的Promise索引

        currentRunningCount++; // 更新当前并发的数量

        promiseTask()
          .then(res => {
            result[taskIndex] = res; // 按顺序存储结果
            resolveCount++; // 更新已经处理promise的数量
            currentRunningCount--; // 更新当前并发的数量
            next(); // 尝试启动下次任务
          })
          .catch(reject); // 如果任务执行失败捕捉失败
      }
    };

    next(); // 初始启动
  });
};

// 测试代码
const promise1 = () =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(1);
      resolve(1);
    }, 1000)
  );

const promise2 = () =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(2);
      resolve(2);
    }, 1000)
  );

const promise3 = () =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(3);
      resolve(3);
    }, 1000)
  );

const promise4 = () =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(4);
      resolve(4);
    }, 1000)
  );

const promiseArr = [promise1, promise2, promise3, promise4];

promiseLimit(promiseArr, 1)
  .then(res => {
    console.log(res, '1111'); // 输出: [1, 2, 3, 4] 1111
  })
  .catch(err => {
    console.error('Error:', err);
  });

// 测试 reject
const failPromise = () => new Promise((_, reject) => setTimeout(() => reject('Fail'), 500));

// promiseLimit([promise1, failPromise, promise2], 2).catch(err => {
//   console.log('Caught error:', err); // 输出: Caught error: Fail
// });
