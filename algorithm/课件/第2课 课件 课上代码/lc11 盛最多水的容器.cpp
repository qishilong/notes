class Solution {
public:
    int maxArea(vector<int>& height) { 
/*
i<j
for i = 0 ~ n - 1
    for j = i + 1 ~ n - 1
        ans = max(ans, i,j盛水)
*/
        int i = 0, j = height.size() - 1;
        int ans = 0;
        while (i < j) {
            ans = max(ans, min(height[i], height[j]) * (j - i));
            if (height[i] == height[j]) i++, j--;
            else if (height[i] < height[j]) i++; else j--; 
        }
        return ans;
    }
};