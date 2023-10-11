class Solution {
public:
    int jump(vector<int>& nums) {
        int now = 0;
        int ans = 0;
        while (now < nums.size() - 1) {
            if (nums[now] == 0) return -1;
            int right = now + nums[now];
            if (right >= nums.size() - 1) return ans + 1;
            // 从now出发可以到[now+1, right]
            int next = now + 1;
            for (int i = now + 2; i <= right; i++) {
                int next_right = i + nums[i];
                if (next_right > next + nums[next]) next = i;
            }
            now = next;
            ans++;
        }
        return ans;
    }
};