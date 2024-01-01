class Scheduler {
  constructor(limit = 2) {
    this.queue = [];
    this.processingCount = 0;
    this.limit = limit;
  }

  async add(promiseFunc) {
    if (this.processingCount >= this.limit) {
      // 如果当前有两个任务正在进行，则将任务入队并等待
      await new Promise((resolve) => this.queue.push(resolve));
    }

    this.processingCount++;
    const result = await promiseFunc();
    this.processingCount--;

    if (this.queue.length > 0) {
      const nextResolve = this.queue.shift();
      // 启动下一个任务
      nextResolve();
    }

    return result;
  }
}

const scheduler = new Scheduler();
const timeout = (time) => {
  return new Promise((r) => setTimeout(r, time));
};
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);
