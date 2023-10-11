class Solution {
    public String longestPalindrome(String s) {
        if (s.isEmpty()) return "";
        n = s.length();
        s = " " + s;

        // 模板：预处理hash
        preH = new long[n + 1]; // 前缀Hash
        preH[0] = 0;
        p131 = new long[n + 1]; // 131次幂
        p131[0] = 1;
        for (int i = 1; i <= n; i++) {
            preH[i] = (preH[i - 1] * 131 + (s.charAt(i) - 'a' + 1)) % p;
            p131[i] = p131[i - 1] * 131 % p;
        }

        sufH = new long[n + 2]; // 后缀Hash
        sufH[n + 1] = 0;
        for (int i = n; i >= 1; i--) {
            sufH[i] = (sufH[i + 1] * 131 + (s.charAt(i) - 'a' + 1)) % p;
        }

        int anslen = 0;
        int ansstart = 0;
        // 中心是一个字符，比如aba
        for (int center = 1; center <= n; center++) {
            int lenL = 0, lenR = n; // 二分两侧可以扩展的长度
            while (lenL < lenR) {
                int len = (lenL + lenR + 1) / 2;
                int l = center - len;
                int r = center + len;
                if (isPalindrome(l, r)) lenL = len;
                else lenR = len - 1;
            }
            // 两侧最多扩展lenL，再加一个中心
            if (lenL * 2 + 1 > anslen) {
                anslen = lenL * 2 + 1;
                ansstart = center - lenL;
            }
        }
        // 中心是两个字符（一个空档），比如abba
        for (int center = 1; center < n; center++) {
            int lenL = 0, lenR = n; // 二分两侧可以扩展的长度
            while (lenL < lenR) {
                int len = (lenL + lenR + 1) / 2;
                int l = center - len + 1;  // l~center
                int r = center + len;  // center+1~r
                if (isPalindrome(l, r)) lenL = len;
                else lenR = len - 1;
            }
            // 两侧都扩展lenL，分别是l~center和center+1~r
            if (2 * lenL > anslen) {
                anslen = 2 * lenL;
                ansstart = center - lenL + 1;
            }
        }
        return s.substring(ansstart, ansstart + anslen);
    }

    boolean isPalindrome(int l, int r) {
        if (l < 1 || r > n) return false;
        if (l > r) return true;
        return calcPre(l, r) == calcSuf(l, r);
    }

    // 模板：O(1)得到子串[l..r]的Hash值
    long calcPre(int l, int r) {
        return ((preH[r] - preH[l - 1] * p131[r - l + 1]) % p + p) % p;
    }
    // O(1)得到子串[l..r]反着读的Hash值
    long calcSuf(int l, int r) {
        return ((sufH[l] - sufH[r + 1] * p131[r - l + 1]) % p + p) % p;
    }

    long[] preH;
    long[] sufH;
    long[] p131;
    static int p = (int)1e9 + 7;
    int n;
}