function getAllStr(str) {
  const result = [];
  for (let i = 0; i <= str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.substring(i, j));
    }
  }
  return result;
}
const str = "ABCD";
const result = getAllStr(str);
console.log(result);
