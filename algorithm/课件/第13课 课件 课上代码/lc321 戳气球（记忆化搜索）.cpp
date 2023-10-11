class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        // 1 [1 .. n] 1
        f = vector<vector<int>>(n + 1, vector<int>(n + 1, -1));
        return dfs(nums, 1, n);
    }

    int dfs(vector<int>& nums, int l, int r) {
        if (l > r) return 0;
        if (f[l][r] >= 0) return f[l][r];
        f[l][r] = 0;
        for (int p = l; p <= r; p++)
            f[l][r] = max(f[l][r], dfs(nums, l, p - 1) + dfs(nums, p + 1, r) + nums[l - 1] * nums[p] * nums[r + 1]);
        return f[l][r];
    }

    vector<vector<int>> f;
};