class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // nums: 0~n-1
        // sum: 0,1~n
        int n = nums.size();
        vector<long long> sum(n + 1, 0);
        for (int i = 1; i <= n; i++) sum[i] = sum[i - 1] + nums[i - 1];
        vector<long long> pre(n + 1, 0);
        // 前缀最小值（前i个数的最小值）
        pre[0] = sum[0];
        for (int i = 1; i <= n; i++) pre[i] = min(pre[i - 1], sum[i]);

        long long ans = -1e10;
        // long long prefix_min = sum[0];
        // int_max = 2147483647 = 2^31-1 = 2e9
        for (int i = 1; i <= n; i++) {
            // i之前的j --> j<=i-1
            ans = max(ans, sum[i] - pre[i-1]);
            // prefix_min = min(prefix_min, sum[i]);
        }
        return ans;
    }
};