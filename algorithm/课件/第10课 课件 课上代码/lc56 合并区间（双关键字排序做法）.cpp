class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // 双关键字排序
        sort(intervals.begin(), intervals.end(),
             [](vector<int>& a, vector<int>& b) { // 两个长度为2的数组比较
                return a[0] < b[0] || (a[0] == b[0] && a[1] < b[1]);
             });

        // 合并
        // 维护当前覆盖的最远端
        // 判断一个区间是延续？还是新成立一段？
        // 看它的起点是在最远端之后还是之前
        /*[1, 5]  [2, 6] [3, 4] [6, 10]  [11 12]
        [1  5] 当前覆盖的最远端：5
        [2  6] 当前覆盖的最远端：6
        [3  4] 当前覆盖的最远端：6
        [6 10] 当前覆盖的最远端：10

        [11 12]*/
        vector<vector<int>> ans;
        int left = -1;
        int far = -1;
        for (vector<int>& interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            if (start <= far) { // 延续
                far = max(far, end);
            } else { // 另起一段
                // 旧的段放进答案
                if (far >= 0) ans.push_back({left, far});
                // 新开一段（只有[strat,end]）
                left = start;
                far = end;
            }
        }
        if (far >= 0) {
            ans.push_back({left, far});
        }
        return ans;
    }
};