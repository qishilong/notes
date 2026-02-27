/**
 * 实现方式一
 */
// class Scheduler {
//   constructor(maxConcurrency) {
//     this.maxConcurrency = maxConcurrency; // 最大可并发数量
//     this.currentConcurrency = 0; // 当前并发任务数
//     this.queue = []; // 阻塞的任务队列
//   }

//   async add(fn) {
//     // 若当前正在执行的任务达到最大限制，阻塞在此处，等待前面的任务执行完成之后在，再将任务队列中任务取出执行
//     if (this.currentConcurrency >= this.maxConcurrency) {
//       await new Promise(resolve => this.queue.push(resolve));
//     }

//     this.currentConcurrency++; // 更新当前并发数

//     try {
//       const res = await fn(); // 执行此函数
//       return res; // 返回函数执行后的结果
//     } finally {
//       // 无论成功还是失败，都必须执行清理逻辑
//       this.currentConcurrency--; // 执行完毕，更新当前并发数
//       this.queue.length && this.queue.shift()(); // 如果阻塞任务队列中有值，将resolve弹出并执行
//     }
//   }
// }

/**
 * 实现方式二
 * 有并行限制的 Promise 调度器
 * 最多同时运行 maxConcurrency 个任务，超出的任务排队等待
 */
class Scheduler {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency; // 最大并发数
    this.currentConcurrency = 0; // 当前正在运行的任务数
    this.taskQueue = []; // 等待队列
  }

  /**
   * 添加一个任务（返回 Promise 的工厂函数）
   * @param {() => Promise} promiseFn
   * @returns {Promise}
   */
  add(promiseFn) {
    return new Promise((resolve, reject) => {
      // 将任务及其 resolve/reject 包装后放入队列
      this.taskQueue.push({ promiseFn, resolve, reject });
      this._run();
    });
  }

  /** 尝试从队列中取出任务执行 */
  _run() {
    while (this.currentConcurrency < this.maxConcurrency && this.taskQueue.length > 0) {
      const { promiseFn, resolve, reject } = this.taskQueue.shift();

      this.currentConcurrency++;

      promiseFn()
        .then(resolve, reject)
        .finally(() => {
          this.currentConcurrency--;
          this._run(); // 一个任务完成后继续调度
        });
    }
  }
}

/* ===================== 测试 ===================== */

const timeout = time => new Promise(resolve => setTimeout(() => resolve(time), time));

const scheduler = new Scheduler(1); // 最大并发数为 2

const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(val => {
      console.log(`任务 ${order} 完成，耗时 ${val}ms`);
    });
};

const timeoutError = time => new Promise((_, reject) => setTimeout(() => reject(time), time));

const addErrorTask = (time, order) => {
  scheduler
    .add(() => timeoutError(time))
    .catch(reason => {
      console.log(`任务 ${order} 完成失败，耗时 ${reason}ms`);
    });
};

// 预期输出顺序：2 3 1 4
// 时间线：
// 0~1000ms : task1(1000) 和 task2(500) 同时开始
// 500ms    : task2 完成 → 输出 2，task3(300) 开始
// 800ms    : task3 完成 → 输出 3，task4(400) 开始
// 1000ms   : task1 完成 → 输出 1
// 1200ms   : task4 完成 → 输出 4
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// addErrorTask(100, '5');
// addErrorTask(200, '6');
// addErrorTask(300, '7');
