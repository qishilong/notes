class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        // pair<value, index>
        vector<pair<int,int>> nums;
        for (int i = 0; i < numbers.size(); i++) {
            nums.push_back(make_pair(numbers[i], i));
        }
        sort(nums.begin(),nums.end());
        int j = nums.size() - 1;
        for (int i = 0; i < nums.size(); i++) {
            while (i < j && nums[i].first + nums[j].first > target) j--;
            if (i < j && nums[i].first + nums[j].first == target) {
                return {nums[i].second, nums[j].second};
            }
        }
        return {};
    }
};