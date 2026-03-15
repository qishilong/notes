/**
 * 【题目】
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 编码规则：k[encoded_string]，表示括号内的字符串重复 k 次，k 为正整数。
 * 注意：编码可以嵌套。
 *
 * 示例：
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 */

/**
 * 使用栈
 * @param {string} s
 */
function decodeStringStack(s) {
  if (!s || typeof s !== 'string') {
    return;
  }

  const countStack = []; // 存储重复的次数
  const strStack = []; // 存储需要重复的字符串
  let curStr = '';
  let curNum = 0;

  for (const char of s) {
    if (char >= '0' && char <= '9') {
      // 处理多位数字
      curNum = curNum * 10 + Number(char);
    } else if (char === '[') {
      // 遇到"["情况，将当前状态压栈，并更新状态
      countStack.push(curNum);
      strStack.push(curStr);
      curNum = 0;
      curStr = '';
    } else if (char === ']') {
      // 遇到"]"情况，弹栈并重复当前字符串
      const repeatCount = countStack.pop();
      const prevStr = strStack.pop();
      curStr = prevStr + curStr.repeat(repeatCount);
    } else {
      curStr += char;
    }
  }

  return curStr;
}

// ==================== 测试 Case ====================
// console.log(decodeStringStack('3[a]2[bc]')); // 期望: 'aaabcbc'
// console.log(decodeStringStack('3[a2[c]]')); // 期望: 'accaccacc'
// console.log(decodeStringStack('2[abc]3[cd]ef')); // 期望: 'abcabccdcdcdef'
// console.log(decodeStringStack('abc')); // 期望: 'abc'
// console.log(decodeStringStack('12[a]')); // 期望: 'aaaaaaaaaaaa'

/**
 * 用一个全局索引 i 遍历字符串，每次遇到 '[' 就递归进入下一层，
 * 遇到 ']' 就返回当前层解码结果，天然处理嵌套。
 * 使用递归
 * @param {string} s
 */
function decodeStringDFS(s) {
  if (!s || typeof s !== 'string') {
    return;
  }

  let i = 0; // 共享索引，跨递归层持续推进
  const length = s.length;

  function dfs() {
    let result = '';
    let num = 0;

    while (i < length) {
      const char = s[i];

      if (char >= '0' && char <= '9') {
        // 累积多位数字
        num = num * 10 + Number(char);
        i++;
      } else if (char === '[') {
        i++; // 跳过"["，递归进入下一层
        const inner = dfs(); // 递归返回括号内的解码结果
        result += inner.repeat(num);
        num = 0; // 重置 num 状态
      } else if (char === ']') {
        i++; // 跳过 ']'，返回上一层
        return result;
      } else {
        result += char;
        i++;
      }
    }

    return result;
  }

  return dfs();
}

// ==================== 测试 DFS Case ====================
// console.log(decodeStringDFS('3[a]2[bc]')); // 期望: 'aaabcbc'
// console.log(decodeStringDFS('3[a2[c]]')); // 期望: 'accaccacc'
// console.log(decodeStringDFS('2[abc]3[cd]ef')); // 期望: 'abcabccdcdcdef'
// console.log(decodeStringDFS('abc')); // 期望: 'abc'
// console.log(decodeStringDFS('12[a]')); // 期望: 'aaaaaaaaaaaa'

/**
 * 使用正则
 * 正则每轮匹配最内层（括号内无嵌套）的 k[letters]，
 * 将其替换为解码结果，反复迭代直到字符串中不再含有括号。
 *
 * 关键正则：/(\d+)\[([a-z]*)\]/g
 *   \d+      — 重复次数（支持多位数）
 *   \[       — 左括号
 *   ([a-z]*) — 纯字母（无嵌套），最内层保证不含 '[' 或 ']'
 *   \]       — 右括号
 *
 * 为何可行：正则会优先匹配最内层括号（因为 [a-z]* 不含括号字符），
 * 每轮替换后嵌套层数减一，最终全部展开。
 * @param {string} s
 */
function decodeStringRegex(s) {
  if (!s || typeof s !== 'string') {
    return;
  }

  while (s.includes('[')) {
    s = s.replace(/(\d+)\[([a-z]*)\]/g, (_, num, str) => str.repeat(Number(num)));
  }

  return s;
}

// ==================== 测试正则迭代替换 Case ====================
console.log(decodeStringRegex('3[a]2[bc]')); // 期望: 'aaabcbc'
console.log(decodeStringRegex('3[a2[c]]')); // 期望: 'accaccacc'
console.log(decodeStringRegex('2[abc]3[cd]ef')); // 期望: 'abcabccdcdcdef'
console.log(decodeStringRegex('abc')); // 期望: 'abc'
console.log(decodeStringRegex('12[a]')); // 期望: 'aaaaaaaaaaaa'
