class Solution {
public:
int maxProfit(int c, vector<int>& prices) {
    int n = prices.size();
    // Move prices from [0..n-1] to [1..n]
    prices.insert(prices.begin(), 0);

    // Initialize DP array
    vector<vector<vector<int>>> f(2, vector<vector<int>>(2, vector<int>(c + 1, -1000000000)));
    f[0&1][0][0] = 0;

    // DP
    for (int i = 1; i <= n; i++)
        for (int j = 0; j <= 1; j++)
            for (int k = 0; k <= c; k++) {
                f[i&1][j][k] = f[(i - 1)&1][j][k];
                if (j == 0)
                    f[i&1][0][k] = max(f[i&1][0][k], f[(i - 1)&1][1][k] + prices[i]);
                if (j == 1 && k > 0)
                    f[i&1][1][k] = max(f[i&1][1][k], f[(i - 1)&1][0][k - 1] - prices[i]);
            }
    
    // Calculate the target
    int ans = 0;
    for (int k = 0; k <= c; k++) ans = max(ans, f[n&1][0][k]);
    return ans;    
}
};