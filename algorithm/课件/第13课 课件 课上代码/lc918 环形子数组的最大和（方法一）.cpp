class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 0); // 1 ~ n
        // 前缀和
        vector<int> sum(n + 1, 0);
        for (int i = 1; i <= n; i++) sum[i] = sum[i - 1] + nums[i];
        // 最大子段和
        int ans = -1000000000;
        int temp = sum[0];
        for (int i = 1; i <= n; i++) {
            temp = min(temp, sum[i - 1]);
            ans = max(ans, sum[i] - temp);
        }

        // 最小子段和
        int ansMin = 1000000000;
        temp = sum[0];
        for (int i = 1; i < n; i++) {
            temp = max(temp, sum[i - 1]);
            ansMin = min(ansMin, sum[i] - temp);
        }
        // 不能把1~n全扣掉（不能用sum[n]-sum[0]）
        // 最小子段和不能全取1~n，所以sum[n]只能减掉sum[1..n-1]
        temp = sum[1];
        for (int j = 2; j < n; j++) temp = max(temp, sum[j]);
        if (n > 1) ansMin = min(ansMin, sum[n] - temp);
        // 总和 - 最小子段和 = 头尾各取一段最大
        ans = max(ans, sum[n] - ansMin);
        return ans;
    }
};