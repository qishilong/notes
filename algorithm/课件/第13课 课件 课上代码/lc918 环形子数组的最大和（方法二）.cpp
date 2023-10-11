class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.end(), nums.begin(), nums.end());
        nums.insert(nums.begin(), 0);
        vector<int> sum(2 * n + 1, 0);
        for (int i = 1; i <= 2 * n; i++)
            sum[i] = sum[i - 1] + nums[i];
        deque<int> q;
        q.push_back(0);
        int ans = -1000000000;
        for (int i = 1; i <= 2 * n; i++) {
            while (!q.empty() && q.front() < i - n) q.pop_front();
            ans = max(ans, sum[i] - sum[q.front()]);
            while (!q.empty() && sum[q.back()] >= sum[i]) q.pop_back();
            q.push_back(i);
        }
        return ans;
    }
};