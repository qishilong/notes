class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        /*[1, 5]  [2, 6] [3, 4] [6, 10]  [11 12]
           1 2 3 4 5 6 7 8 9 10 11 12
           1 1 1 1 1
             1 1 1 1 1
               1 1
                     1 1 1 1  1
                                  1 1
           
           +1      -1
             +1      -1
               +1-1
                     +1        -1
                               +1 -1
         count: 0
        把从1覆盖到5这个区间，看作2个事件：
        (a) 在1处，有一个事件：开始覆盖（次数+1）
        (b) 在5处，有一个事件：结束覆盖（次数-1）
        */
        // 产生2n个事件
        // 时间位置，时间情况(+1/-1)
        vector<pair<int,int>> events;
        for (vector<int>& interval : intervals) {
            // 差分
            events.push_back(make_pair(interval[0], 1));
            events.push_back(make_pair(interval[1], -1));
        }
        sort(events.begin(), events.end(),
             [](pair<int,int>& a, pair<int,int>& b) {
                 // 1 在 -1 之前（如果差分是闭区间[1,5]而不是前闭后开[1,6)的话
                 return a.first < b.first || (a.first == b.first && a.second > b.second);
             });
        int count = 0;
        int left;
        vector<vector<int>> ans;
        for (pair<int,int>& event : events) {
            if (count == 0) // 加之前是0，加之后是非0
                left = event.first;  // 一个段的产生
            count += event.second;
            if (count == 0) // 非零变零，一个段的结束
                ans.push_back({left, event.first});
        }
        return ans;
    }
};