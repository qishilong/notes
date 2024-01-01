function parseQueryString(url) {
  const queryString = url.split("?")[1];
  if (!queryString) {
    return {};
  }

  const paramsArray = queryString.split("&");
  const paramsObject = {};

  paramsArray.forEach((param) => {
    const [key, value] = param.split("=");
    const decodedKey = decodeURIComponent(key);
    const decodedValue = value ? decodeURIComponent(value) : null;

    if (paramsObject.hasOwnProperty(decodedKey)) {
      if (!Array.isArray(paramsObject[decodedKey])) {
        paramsObject[decodedKey] = [paramsObject[decodedKey]];
      }
      paramsObject[decodedKey].push(decodedValue);
    } else {
      paramsObject[decodedKey] = decodedValue;
    }
  });

  return paramsObject;
}

// 例子
const url = "https://example.com/path?name=John&age=25&city=New%20York&city=1";
const queryParams = parseQueryString(url);
console.log(queryParams);
