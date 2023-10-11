class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        // f[0..n][0..n]
        vector<vector<int>> f(n + 2, vector<int>(n + 2, 0));
        // 1 [1 .. n] 1
        // 区间DP 先枚举区间长度
        for (int len = 1; len <= n; len++)
            for (int l = 1; l <= n - len + 1; l++) {
                int r = l + len - 1; // 闭区间 len = r-l+1
                for (int p = l; p <= r; p++)
                    f[l][r] = max(f[l][r], f[l][p - 1] + f[p + 1][r] + nums[l - 1] * nums[p] * nums[r + 1]);
            }
        return f[1][n];
    }
};