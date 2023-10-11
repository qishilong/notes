class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";
        int n = s.length();
        s = " " + s;
        int anslen = 0;
        int ansstart = 0;
        // 中心是一个字符，比如aba
        for (int center = 1; center <= n; center++) {
            int l = center - 1;
            int r = center + 1;
            while (l > 0 && r <= n && s[l] == s[r]) {
                l--; r++;
            }
            // l+1~r-1
            if (r - l - 1 > anslen) {
                anslen = r - l - 1;
                ansstart = l + 1;
            }
        }
        // 中心是两个字符（一个空档），比如abba
        for (int center = 1; center < n; center++) {
            int l = center;
            int r = center + 1;
            while (l > 0 && r <= n && s[l] == s[r]) {
                l--; r++;
            }
            // l+1~r-1
            if (r - l - 1 > anslen) {
                anslen = r - l - 1;
                ansstart = l + 1;
            }
        }
        return s.substr(ansstart, anslen);
    }
};