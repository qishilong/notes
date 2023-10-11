class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        pre[0] = suf[n + 1] = 0;
        for (int i = 1; i <= n; i++) pre[i] = max(pre[i - 1], height[i - 1]);
        for (int i = n; i; i--) suf[i] = max(suf[i + 1], height[i - 1]);
        int ans = 0;
        for (int i = 1; i <= n; i++) {
            ans += max(0, min(pre[i - 1], suf[i + 1]) - height[i - 1]);
        }
        return ans;
    }

private:
    int pre[100005];
    int suf[100005];
};