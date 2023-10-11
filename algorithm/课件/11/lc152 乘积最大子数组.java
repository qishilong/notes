class Solution {
    public int maxProduct(int[] nums) {
        int[] fmax = new int[nums.length];
        int[] fmin = new int[nums.length];
        fmax[0] = nums[0];
        fmin[0] = nums[0];
        int ans = fmax[0];
        for (int i = 1; i < nums.length; i++) {
            fmax[i] = Math.max(
                Math.max(fmax[i - 1] * nums[i], fmin[i - 1] * nums[i]),
                nums[i]);
            fmin[i] = Math.min(
                Math.min(fmax[i - 1] * nums[i], fmin[i - 1] * nums[i]),
                nums[i]);
            ans = Math.max(ans, fmax[i]);
        }
        return ans;
    }
}