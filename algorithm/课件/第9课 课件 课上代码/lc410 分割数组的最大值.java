class Solution {
    public int splitArray(int[] nums, int m) {
        int left = 0; // 下界：每个分一组
        int right = 0; // 上界：全部放一起
        for (int i = 0; i < nums.length; i++) {
            left = Math.max(left, nums[i]);
            right += nums[i];
        }
        while (left < right) {
            int mid = (left + right) / 2;
            // 第一个使得判定问题isValid得到true的位置
            if (isValid(nums, m ,mid)) right = mid;
            else left = mid + 1;
        }
        return right;
    }

    // 判定 把nums分成<=m组，每组的和<=T
    private boolean isValid(int[] nums, int m, int T) {
        int groupSum = 0;
        int groupCount = 1;
        for (int i = 0; i < nums.length; i++) {
            if (groupSum + nums[i] <= T) {
                groupSum += nums[i]; // 放进当前组，不超
            } else {
                groupCount++; // 超了，新开一组
                groupSum = nums[i];
            }
        }
        return groupCount <= m;
    }
}

/*
厚
[7],[2,5,10,8]
7      25           max:25

[7,2],[5,10,8]
9       23          max:23

7+2+5  10+8
14     18           max:18

T=20

分成<=100的2组是否可行？可行。
7+2+5
10+8  1

分成<=20的2组是否可行？可行。
7+2+5
10+8


分成<=17的2组是否可行？不可行。
7+2+5
10
8
*/