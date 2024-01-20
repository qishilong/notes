/**
 * 重试函数
 * @param {*} fn 要重试的方法
 * @param {*} times 重试的次数
 */
function retry(fn, times) {
  return new Promise((resolve, reject) => {
    function loop(time) {
      fn()
        .then(resolve)
        .catch((err) => {
          if (time <= times) {
            loop(time + 1);
          } else {
            reject(err);
          }
        });
    }
    loop(1);
  });
}

function downloadFile() {
  return new Promise((resolve, reject) => {
    // 异步下载文件
    setTimeout(() => {
      reject("test");
    }, 1000);
  });
}

retry(() => downloadFile(), 3)
  .then((data) => console.log("文件下载成功"))
  .catch((err) => console.error("文件下载失败：", err));
