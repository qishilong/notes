const inToRoman = (number) => {
  if (number < 1 || number > 3999) {
    return `${number} 不是一个有效的数字，请输入从 1 到 3999 之间的数字。`;
  }
  const romanNumberArr = [
    { value: 1000, number: "M" },
    { value: 900, number: "CM" },
    { value: 500, number: "D" },
    { value: 400, number: "CD" },
    { value: 100, number: "C" },
    { value: 90, number: "XC" },
    { value: 50, number: "L" },
    { value: 40, number: "XL" },
    { value: 10, number: "X" },
    { value: 9, number: "IX" },
    { value: 5, number: "V" },
    { value: 4, number: "IV" },
    { value: 1, number: "I" },
  ];
  let result = "";
  for (const item of romanNumberArr) {
    while (number >= item.value) {
      result += item.number;
    }
  }

  return result;
};

const result = inToRoman(1999);
console.log(result);
