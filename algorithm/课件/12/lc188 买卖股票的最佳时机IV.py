class Solution:
def maxProfit(self, k: int, prices: List[int]) -> int:
    n, c = len(prices), k
    # Move prices from [0..n-1] to [1..n]
    prices = [0] + prices

    # Initialize DP array
    # Don't use f = (n + 1) * [2 * [(c + 1) * [-1000000000]]]
    f = [[[-1000000000] * (c + 1) for i in range(2)] for i in range(n + 1)]
    f[0][0][0] = 0

    # DP
    for i in range(1, n + 1):
        for j in range(2):
            for k in range(c + 1):
                f[i][j][k] = f[i - 1][j][k]
                if j == 0:
                    f[i][0][k] = max(f[i][0][k], f[i - 1][1][k] + prices[i])
                if j == 1 and k > 0:
                    f[i][1][k] = max(f[i][1][k], f[i - 1][0][k - 1] - prices[i])
    
    # Calculate the target
    ans = 0
    for k in range(c + 1):
        ans = max(ans, f[n][0][k])
    return ans