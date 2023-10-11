class Solution {
public:
    int trap(vector<int>& height) {
        int ans = 0;
        stack<Rect> s;
        s.push({0, 0});
        for (int h : height) {
            int w = 0;
            while (s.size() > 1 && s.top().height <= h) {
                w += s.top().width;
                int bottom = s.top().height;
                s.pop();
                ans += w * max(0, min(s.top().height, h) - bottom);
            }
            s.push({h, w + 1});
        }
        return ans;
    }

private:
    struct Rect {
        int height;
        int width;
    };
};