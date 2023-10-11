class Solution {
public:
    struct Event {
        int type; // 1表示产生（+），0表示询问，-1表示消失（-）
        int pos;
        int length; // 对于询问，表示index，对于其他，表示区间长度
    };

    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        // 事件：
        // 1 +4 在1这里发生事件：产生长度为4的区间
        // 2 +3 
        // 2 询问事件 答案：3
        // 3 +4
        // 3 询问事件 答案：3
        // 4 +1
        // 4 询问事件 答案：1
        // 4 -4
        // 4 -3
        // 4 -1
        // 5 询问事件 答案：4
        // 6 -4
        vector<Event> events;
        for (auto& interval : intervals) {
            int left = interval[0];
            int right = interval[1];
            int len = right - left + 1;
            events.push_back({1, left, len});
            events.push_back({-1, right, len});
        }
        for (int i = 0; i < queries.size(); i++) {
            events.push_back({0, queries[i], i});
        }
        // 按照发生位置pos从小到大排序，pos一样时按照type从大到小排序
        sort(events.begin(), events.end(), [&](const Event& a, const Event& b) {
            return a.pos < b.pos || (a.pos == b.pos && a.type > b.type);
        });
        vector<int> ans(queries.size());
        map<int, int> values; // map<长度，次数>
        for (auto& event : events) {
            if (event.type == 1) {
                values[event.length]++;
            } else if (event.type == -1) {
                values[event.length]--;
                if (values[event.length] == 0) values.erase(event.length);
            } else {
                int index = event.length;
                if (values.empty()) ans[index] = -1;
                else ans[index] = values.begin()->first; // 查询values有序集合最小值
            }
        }
        return ans;
    }
};