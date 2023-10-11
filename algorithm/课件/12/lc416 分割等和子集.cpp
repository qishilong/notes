class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 0); // 1~n
        int sum = 0;
        for (int i = 1; i <= n; i++) sum += nums[i];
        if (sum % 2 == 1) return false; // 奇数不可能分两半
        sum /= 2;
        vector<bool> f(sum + 1, false);
        f[0] = true;
        for (int i = 1; i <= n; i++)
            for (int j = sum; j >= nums[i]; j--)
                f[j] = f[j] | f[j - nums[i]];
        return f[sum];
    }
};
// 伪多项式算法
// [1,2,3,500000]