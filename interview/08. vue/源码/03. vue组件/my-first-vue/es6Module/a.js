var num = 34343;

// 默认导出  { default: fn }
export default function (a, b) {
  return a + b;
}

// 具名导出（普通导出） { double: fn}
export function double(a) {
  return a * 2;
}

// {n : 3}
export var n = 3;

//最终导出： { default: fn, double, fn, n:3 }
