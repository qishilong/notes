class Solution {
    public boolean canPartition(int[] nums) {
        int n = nums.length;
        // Move to 1~n
        int[] num = new int[n + 1];
        for (int i = 1; i <= n; i++) num[i] = nums[i - 1];
        int sum = 0;
        for (int i = 1; i <= n; i++) sum += num[i];
        if (sum % 2 == 1) return false; // 奇数不可能分两半
        sum /= 2;
        boolean[] f = new boolean[sum + 1];
        f[0] = true;
        for (int i = 1; i <= n; i++)
            for (int j = sum; j >= num[i]; j--)
                f[j] = f[j] | f[j - num[i]];
        return f[sum];
    }
}