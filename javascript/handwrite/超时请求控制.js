/**
 * 可以使用 XMLHttpRequest 对象和 Fetch API 实现超时请求控制
 */

/**
 * 封装 XMLHttpRequest 对象并实现超时请求控制
 * @param {*} url
 * @param {*} timeout
 * @param {*} callback
 */
const ajax = (options) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method || "GET", options.url);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };

    if (options.headers) {
      Reflect.ownKeys(options.headers).forEach((key) => {
        xhr.setRequestHeader(key, options.headers[key]);
      });
    }

    const params = options.params;

    // 将对象形式的参数转化成查询字符串
    if (params && typeof params === "object") {
      params = Reflect.ownKeys(params)
        .map((key) => {
          return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        })
        .join("&");
    }

    xhr.timeout = options.timeout || 5000; // 设置默认超时时间

    xhr.ontimeout = function () {
      xhr.abort(); // 终止请求
      reject({
        status: 408,
        statusText: "请求超时",
      });
    };

    xhr.send(params);
  });
};

ajax({
  method: "GET",
  url: "https://baidu.com",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: "value",
  },
  timeout: 10000, // 设置超时时间为10秒
})
  .then(function (response) {
    console.log("成功获取数据：", response);
  })
  .catch(function (error) {
    console.error("发生错误：", error.status, error.statusText);
  });

/**
 * 利用 Fetch 和 Promise.race 实现超时请求控制
 * @param {*} url
 * @param {*} options
 * @param {*} timeout
 */
const fetchWithTimeout = (url, options, timeout) => {
  return Promise.race([
    fetch(url, options),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout),
    ),
  ]);
};

const url = "https://example.com/api";
const timeout = 5000; // 5秒超时

fetchWithTimeout(url, {}, timeout)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

/**
 * 利用 Fetch 和 AbortController 实现超时请求控制
 * @param {*} url
 * @param {*} options
 * @param {*} timeout
 */
const fetchWidthTimeoutFn = async (url, options, timeout) => {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    } else {
      throw error;
    }
  }
};

const urlFn = "https://example.com/api";
const timeoutFn = 5000; // 5秒超时

try {
  const data = await fetchWidthTimeoutFn(url, {}, timeout);
  console.log(data);
} catch (error) {
  console.error("Error:", error);
}
