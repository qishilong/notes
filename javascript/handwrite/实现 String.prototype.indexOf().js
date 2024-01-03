const myIndexOf = (source, target) => {
  for (let i = 0, len = source.length - target.length + 1; i < len; i++) {
    let find = true;
    for (let j = 0, targetLen = target.length; j < targetLen; j++) {
      if (source[i + j] !== target[j]) {
        find = false;
        break;
      }
    }
    if (find) {
      return i;
    }
  }
  return -1;
};

const source = "hello world",
  target = "llo";
const result = myIndexOf(source, target);
console.log(result);
