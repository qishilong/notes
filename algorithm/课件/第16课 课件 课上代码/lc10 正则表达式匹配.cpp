class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.length();
        int m = p.length();
        s = " " + s;
        p = " " + p;
        vector<vector<bool>> f(n + 1, vector<bool>(m + 1, false));
        f[0][0] = true;
        for (int i = 2; i <= m && p[i] == '*'; i += 2) f[0][i] = true;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++) {
                if (p[j] == '.') {
                    f[i][j] = f[i - 1][j - 1];
                } else if (p[j] == '*') {
                    f[i][j] = f[i][j - 2]; // 不要 _* 配0个
                    if (p[j - 1] == '.' || s[i] == p[j - 1]) { // 让 _* 的 _ 去配 s[i]
                        f[i][j] = f[i][j] || f[i - 1][j];
                    }
                } else {
                    f[i][j] = f[i - 1][j - 1] && s[i] == p[j];
                }
            }
        return f[n][m];
    }
};