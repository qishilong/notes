import java.util.Arrays;

class Solution {
public int maxProfit(int c, int[] pricesInput) {
    int n = pricesInput.length;

    // Move prices from [0..n-1] to [1..n]
    int[] prices = new int[n + 1];
    prices[0] = 0;
    for (int i = 1; i <= n; i++) prices[i] = pricesInput[i - 1];

    // Initialize DP array
    int[][][] f = new int[n + 1][2][c + 1];
    Arrays.fill(f[0][0], -1000000000);
    Arrays.fill(f[0][1], -1000000000);
    f[0][0][0] = 0;

    // DP
    for (int i = 1; i <= n; i++)
        for (int j = 0; j <= 1; j++)
            for (int k = 0; k <= c; k++) {
                f[i][j][k] = f[i - 1][j][k];
                if (j == 0)
                    f[i][0][k] = Math.max(f[i][0][k], f[i - 1][1][k] + prices[i]);
                if (j == 1 && k > 0)
                    f[i][1][k] = Math.max(f[i][1][k], f[i - 1][0][k - 1] - prices[i]);
            }
    
    // Calculate the target
    int ans = 0;
    for (int k = 0; k <= c; k++) ans = Math.max(ans, f[n][0][k]);
    return ans;
}
}