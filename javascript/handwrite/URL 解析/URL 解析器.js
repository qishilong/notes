/**
 * 1. 使用 URL 对象
 * 如果想要查询参数，可以使用 URLSearchParams 对象
 */
const url = new URL("https://www.example.com:8080/path?param1=value1&param2=value2#hash");

console.log(url.protocol); // "https:"
console.log(url.hostname); // "www.example.com"
console.log(url.port); // "8080"
console.log(url.pathname); // "/path"
console.log(url.search); // "?param1=value1&param2=value2"
console.log(url.hash); // "#hash"

const params = new URLSearchParams(url.search);

console.log(params.get("param1")); // "value1"
console.log(params.get("param2")); // "value2"

/**
 * 2. 借用 a 标签的特性
 * @param {*} url
 */
function parseUrl(url) {
  var a = document.createElement("a");
  a.href = url;

  return {
    protocol: a.protocol,
    hostname: a.hostname,
    port: a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash,
    host: a.host,
  };
}

var result = parseUrl("http://example.com:8080/path");
console.log(result);
// 输出：
// {
//    protocol: "http:",
//    hostname: "example.com",
//    port: "8080",
//    pathname: "/path",
//    search: "",
//    hash: "",
//    host: "example.com:8080"
// }

/**
 * 3. 正则
 * @param {*} url
 */
function parseUrl(url) {
  const pattern = /^(\w+):\/\/([^/:]+)(?::(\d+))?([^?#]*)?(\?[^#]*)?(#.*)?$/;
  const matches = url.match(pattern);
  const searchObj = matches[5]
    ? matches[5]
        .slice(1)
        .split("&")
        .reduce((prev, curr) => {
          let [key, val] = curr.split("=");
          prev[key] = val;
          return prev;
        }, {})
    : {};

  return {
    protocol: matches[1],
    hostname: matches[2],
    port: matches[3] || "",
    pathname: matches[4] || "",
    search: searchObj,
    hash: matches[6] || "",
  };
}

// let url = "http://example.com:8080/path1/path2?key1=val1&key2=val2#hash";
console.log(parseUrl(url));

/**
 * 4. 正则
 * @param {*} url
 */
function parseUrl(url) {
  var match = url.match(
    /^(?:([A-Za-z]+):)?(?:\/*)([a-zA-Z0-9.-]+)?(?::([0-9]+))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/,
  );
  return (
    match && {
      protocol: match[1],
      hostname: match[2],
      port: match[3],
      pathname: match[4],
      search: match[5],
      hash: match[6],
    }
  );
}

var result = parseUrl("http://example.com:8080/path");
console.log(result);
