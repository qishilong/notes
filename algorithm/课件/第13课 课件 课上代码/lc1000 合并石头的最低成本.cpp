class Solution {
public:
    int mergeStones(vector<int>& stones, int k) {
        int n = stones.size();
        vector<int> sum(n, 0);
        sum[0] = stones[0];
        for (int i = 1; i < n; i++) sum[i] = sum[i - 1] + stones[i];

        vector<vector<vector<int>>> f(n + 1, vector<vector<int>>(n + 1, vector<int>(k + 1, 1000000000)));
        for (int i = 0; i < n; i++) f[i][i][1] = 0;

        for (int len = 2; len <= n; len++)
            for (int l = 0; l <= n - len; l++) {
                int r = l + len - 1;
                for (int i = 2; i <= k; i++)
                    for (int p = l; p < r; p++)
                        f[l][r][i] = min(f[l][r][i], f[l][p][1] + f[p + 1][r][i - 1]);
                f[l][r][1] = min(f[l][r][1], f[l][r][k] + sum[r] - (l ? sum[l - 1] : 0));
            }

        if (f[0][n - 1][1] >= 1000000000) return -1;
        return f[0][n - 1][1];
    }
};