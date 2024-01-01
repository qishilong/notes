function parseURL(url) {
  // 利用 a 标签的方法
  // const parser = document.createElement("a");
  // parser.href = url;

  // 利用 URL 对象的方法
  const parser = new URL(url);
  const params = {};

  // 利用 URLSearchParams 的方法
  // const searchParams = new URLSearchParams(parser.search);
  // searchParams.forEach((value, key) => {
  //   if (params.hasOwnProperty(key)) {
  //     if (!Array.isArray(params[key])) {
  //       params[key] = [params[key]];
  //     }
  //     params[key].push(value);
  //   } else {
  //     params[key] = value;
  //   }
  // });

  // 利用 searchParams 的方法
  for (const [key, value] of parser.searchParams.entries()) {
    if (params.hasOwnProperty(key)) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]];
      }
      params[key].push(value);
    } else {
      params[key] = value;
    }
  }

  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    hash: parser.hash,
    username: parser.username,
    password: parser.password,
    origin: parser.origin,
    href: parser.href,
    params: params,
  };
}

// 例子
const url = "https://www.example.com:8080/path/to/resource?name=John&age=25&name=1#section1";
const parsedURL = parseURL(url);

console.log(parsedURL);
