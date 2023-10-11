## C/C++代码模板

```c++
// C/C++
// LeetCode 28 实现strStr
class Solution {
public:
    int strStr(string haystack, string needle) {
        if (needle.empty()) return 0;
        int n = haystack.length();
        int m = needle.length();
        vector<int> next(m, -1); // 下标从0开始，初值-1；下标从1开始，初值0。
        for (int i = 1, j = -1; i < m; i++) {
            while (j >= 0 && needle[j + 1] != needle[i]) j = next[j];
            if (needle[j + 1] == needle[i]) j++;
            next[i] = j;
        }
        for (int i = 0, j = -1; i < n; i++) {
            while (j >= 0 && needle[j + 1] != haystack[i]) j = next[j];
            if (j + 1 < m && needle[j + 1] == haystack[i]) j++;
            if (j + 1 == m) return i - m + 1;
        }
        return -1;
    }
};
```

## 
## Java代码模板

```
// Java
// LeetCode 28 实现strStr
class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;
        int n = haystack.length();
        int m = needle.length();
        int[] next = new int[m];
        for (int i = 0; i < m; i++) next[i] = -1; // 下标从0开始，初值-1；下标从1开始，初值0。
        for (int i = 1, j = -1; i < m; i++) {
            while (j >= 0 && needle.charAt(j + 1) != needle.charAt(i)) j = next[j];
            if (needle.charAt(j + 1) == needle.charAt(i)) j++;
            next[i] = j;
        }
        for (int i = 0, j = -1; i < n; i++) {
            while (j >= 0 && needle.charAt(j + 1) != haystack.charAt(i)) j = next[j];
            if (j + 1 < m && needle.charAt(j + 1) == haystack.charAt(i)) j++;
            if (j + 1 == m) return i - m + 1;
        }
        return -1;
    }
}
```


## Python代码模板

```
# Python
# LeetCode 28 实现strStr
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if len(needle) == 0:
            return 0
        n, m = len(haystack), len(needle)
        next = [-1] * m  # 下标从0开始，初值-1；下标从1开始，初值0。
        j = -1
        for i in range(1, m):
            while j >= 0 and needle[j + 1] != needle[i]:
                j = next[j]
            if needle[j + 1] == needle[i]:
                j += 1
            next[i] = j
        j = -1
        for i in range(n):
            while j >= 0 and needle[j + 1] != haystack[i]:
                j = next[j]
            if j + 1 < m and needle[j + 1] == haystack[i]:
                j += 1
            if j + 1 == m:
                return i - m + 1
        return -1
```

## JavaScript代码模板

```javascript
// JavaScript
// LeetCode 28 实现strStr
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
        if (needle.length == 0) return 0;
        const n = haystack.length;
        const m = needle.length;
        let next = [];
        for (let i = 0; i < m; i++) next[i] = -1; // 下标从0开始，初值-1；下标从1开始，初值0。
        for (let i = 1, j = -1; i < m; i++) {
            while (j >= 0 && needle[j + 1] != needle[i]) j = next[j];
            if (needle[j + 1] == needle[i]) j++;
            next[i] = j;
        }
        for (let i = 0, j = -1; i < n; i++) {
            while (j >= 0 && needle[j + 1] != haystack[i]) j = next[j];
            if (j + 1 < m && needle[j + 1] == haystack[i]) j++;
            if (j + 1 == m) return i - m + 1;
        }
        return -1;
};
```

