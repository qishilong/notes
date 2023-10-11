class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.length();
        int m = text2.length();
        text1 = " " + text1;
        text2 = " " + text2;
        vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
        vector<vector<int>> dir(n + 1, vector<int>(m + 1, 0));
        // int[][] f = new int[n + 1][m + 1];
        for (int i = 0; i <= n; i++) f[i][0] = 0;
        for (int j = 0; j <= m; j++) f[0][j] = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++)
                if (text1[i] == text2[j]) {
                    f[i][j] = f[i - 1][j - 1] + 1;
                    dir[i][j] = 0;
                }
                else {
                    if (f[i - 1][j] > f[i][j - 1]) {
                        f[i][j] = f[i - 1][j];
                        dir[i][j] = 1;
                    } else {
                        f[i][j] = f[i][j - 1];
                        dir[i][j] = 2;
                    }
                }
        print(text1, dir, n, m); // 打方案（本题不用）
        cout << ans << endl;
        return f[n][m];
    }

private:
    void print(string& text1, vector<vector<int>>& dir, int i, int j) {
        if (i == 0 || j == 0) return;
        if (dir[i][j] == 0) {
            print(text1, dir, i-1, j-1);
            ans.push_back(text1[i]);
        } else if (dir[i][j] == 1) {
            print(text1, dir, i-1, j);
        } else {
            print(text1, dir, i, j-1);
        }
    }

    string ans;
};