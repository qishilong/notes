class Solution {
public:
    int slidingPuzzle(vector<vector<int>>& board) {
        // 2*3 => 1*6
        vector<int> list;
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 3; j++)
                list.push_back(board[i][j]);
        int start = zip(list);
        int target = 123450;
        q.push(make_pair(-evaluate(list), start));
        dist[start] = 0;
        while (!q.empty()) {
            int now = q.top().second;
            q.pop();
            if (now == target) return dist[target];
            auto a = unzip(now);
            int pos = getZeroIndex(a);
            if (pos != 0 && pos != 3 /*非最左侧*/) insert(pos, pos - 1, a, now);
            if (pos != 2 && pos != 5 /*非最右侧*/) insert(pos, pos + 1, a, now);
            if (pos >= 3) insert(pos, pos - 3, a, now);
            if (pos < 3) insert(pos, pos + 3, a, now);
        }
        return -1;
    }

    void insert(int pos, int newPos, vector<int>& a, int now) {
        swap(a[pos], a[newPos]);
        int next = zip(a);
        if (dist.find(next) == dist.end() || dist[next] > dist[now] + 1) {
            dist[next] = dist[now] + 1;
            q.push(make_pair(-dist[next] - evaluate(a) ,next));
        }
        swap(a[pos], a[newPos]);
    }

    int evaluate(vector<int>& a) {
        static int targetx[6] = {-1, 0, 0, 0, 1, 1};
        static int targety[6] = {-1, 0, 1, 2, 0, 1};
        int res = 0;
        for (int i = 0; i < 6; i++) {
            if (a[i] == 0) continue;
            int x = i/3, y = i%3;
            int tx = targetx[a[i]], ty = targety[a[i]];
            res += abs(x - tx) + abs(y - ty);
        }
        return res;
    }

    int getZeroIndex(vector<int>& a) {
        for (int i = 0; i < 6; i++)
            if (a[i] == 0) return i;
        return -1;
    }

    // [1*6]数组 => 6位整数 Hash
    int zip(vector<int>& a) {
        int res = 0;
        for (int i = 0; i < 6; i++)
            res = res * 10 + a[i];
        return res;
    }

    // 复原：6位整数 => [1*6]数组
    vector<int> unzip(int state) {
        vector<int> a(6, 0);
        for (int i = 5; i >= 0; i--) {
            a[i] = state % 10;
            state /= 10; 
        }
        return a;
    }

    // <dist+eval, state>
    priority_queue<pair<int, int>> q;
    unordered_map<int, int> dist;
};