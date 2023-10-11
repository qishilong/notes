class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        vector<pair<int,int>> events;
        for (auto& building : buildings) {
            int left = building[0];
            int right = building[1];
            int height = building[2];
            events.push_back(make_pair(left, height));
            events.push_back(make_pair(right, -height));
        }
        sort(events.begin(), events.end());
        map<int, int> h; // 高度，出现次数
        vector<vector<int>> ans;
        for (int i = 0; i < events.size(); i++) {
            int x = events[i].first;
            int y = events[i].second;
            if (y > 0) {
                h[y]++;
            } else {
                h[-y]--;
                if (h[-y] == 0) h.erase(-y);
            }
            if (i == events.size() - 1 || x != events[i + 1].first) {
                int height = h.empty() ? 0 : h.rbegin()->first;
                if (ans.empty() || height != ans.back()[1])
                    ans.push_back({x, height});
            }
        }
        return ans;
    }
};