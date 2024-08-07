/**
 * 并发请求
 * @param {string[]} urls 待请求的 url 数组
 * @param {number} maxNum 最大并发数量
 */
function concurrenceRequest(urls, maxNum) {
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    // 下一个请求的下标
    let index = 0;
    // 返回结果
    const result = [];
    // 请求完成的数量
    let count = 0;
    // 发送请求
    async function request() {
      if (index === urls.length) {
        return;
      }
      const i = index;
      const url = urls[index];
      index++;
      console.log(url);
      try {
        const res = await fetch(url);
        result[i] = res;
      } catch (err) {
        result[i] = err;
      } finally {
        count++;
        if (count === urls.length) {
          resolve(result);
        }
        request();
      }
    }
    const times = Math.min(urls.length, maxNum);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}

const urls = [];

for (let i = 0; i < 100; i++) {
  urls[i] = `https://www.aaa.com/request&a=${i}`;
}
concurrenceRequest(urls, 10).then((res) => console.log(res));

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
    }, 1000);
  });
};
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3);
      resolve(3);
    }, 1000);
  });
};
const promise4 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(4);
      resolve(4);
    }, 1000);
  });
};
const promiseArr = [promise1, promise2, promise3, promise4];

// 控制并发
const pLimit = (pList, limit) => {
  return new Promise((resolve, reject) => {
    let runCount = 0;
    let resolvedCount = 0;
    const pListLength = pList.length;
    const result = [];

    const nextP = (p, count) => {
      p().then((res) => {
        result[count] = res;
        resolvedCount++;
        if (pList.length) {
          const pNext = pList.shift();
          nextP(pNext, runCount);
          runCount++;
        } else if (resolvedCount === pListLength) {
          resolve(result);
        }
      });
    };

    while (runCount < limit && pList.length) {
      const p = pList.shift();
      nextP(p, runCount);
      runCount++;
    }
  });
};

pLimit(promiseArr, 3).then((res) => {
  console.log(res, "1111");
});
