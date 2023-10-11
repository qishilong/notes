class Solution {
public:
    int maxProfit(vector<int>& prices) {
        return maxProfit(prices, 0);
    }

    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        // Move prices from [0..n-1] to [1..n]
        prices.insert(prices.begin(), 0);

        // Initialize DP array
        vector<vector<vector<int>>> f(n + 1, vector<vector<int>>(2, vector<int>(2, -1000000000)));
        f[0][0][0] = 0;

        // DP
        for (int i = 0; i < n; i++)
            for (int j = 0; j <= 1; j++)
                // 本题没有次数限制 for (int k = 0; k <= c; k++)
                for (int l = 0; l <= 1; l++) {
                    // 列表法，按表格转移，考虑出边
                    if (j == 0 && l == 0)
                        f[i + 1][1][0] = max(f[i + 1][1][0], f[i][j][l] - prices[i + 1] - fee);
                    if (j == 1 && l == 0)
                        f[i + 1][0][1] = max(f[i + 1][0][1], f[i][j][l] + prices[i + 1]);
                    f[i + 1][j][0] = max(f[i + 1][j][0], f[i][j][l]);
                }
        
        // Calculate the target
        int ans = 0;
        for (int l = 0; l <= 1; l++)
            ans = max(ans, f[n][0][l]);
        return ans;    
    }
};