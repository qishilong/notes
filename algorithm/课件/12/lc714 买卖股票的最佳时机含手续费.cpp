class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        // Move prices from [0..n-1] to [1..n]
        prices.insert(prices.begin(), 0);

        // Initialize DP array
        vector<vector<int>> f(n + 1, vector<int>(2, -1000000000));
        f[0][0] = 0;

        // DP
        for (int i = 0; i < n; i++)
            for (int j = 0; j <= 1; j++) {
                // 列表法，按表格转移，考虑出边
                if (j == 0)
                    f[i + 1][1] = max(f[i + 1][1], f[i][j] - prices[i + 1] - fee);
                if (j == 1)
                    f[i + 1][0] = max(f[i + 1][0], f[i][j] + prices[i + 1]);
                f[i + 1][j] = max(f[i + 1][j], f[i][j]);
            }
        
        // Calculate the target
        return f[n][0];  
    }
};