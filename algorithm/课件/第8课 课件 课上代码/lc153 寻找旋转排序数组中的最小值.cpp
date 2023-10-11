class Solution {
public:
    int findMin(vector<int>& nums) {
        /*
        
            3 4 5 | 1 2
            左段：>nums[right]
            右段：<=nums[right]
            0 0 0   1 1

            4,5,6,7 | 0,1,2

            |1 2 3 4 5


            题目条件：找第一个<=末尾的数
        */
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int mid = (l + r) / 2;
            if (nums[mid] <= nums[r]) r = mid;
            else l = mid + 1;
        }
        return nums[l];
    }
};