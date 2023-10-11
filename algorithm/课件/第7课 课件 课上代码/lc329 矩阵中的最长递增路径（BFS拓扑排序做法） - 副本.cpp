class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        m = matrix.size();
        n = matrix[0].size();
        edges = vector<vector<int>>(m * n, vector<int>());
        deg = vector<int>(m * n, 0);
        dist = vector<int>(m * n, 0);
        const int dx[4] = {-1, 0, 0, 1};
        const int dy[4] = {0, -1, 1, 0};
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                bool flag = true;
                for (int k = 0; k < 4; k++) {
                    int ni = i + dx[k];
                    int nj = j + dy[k];
                    if (valid(ni, nj) && matrix[i][j] < matrix[ni][nj]) {
                        addEdge(num(i, j), num(ni, nj));
                    }
                }
            }
        topsort();
        int ans = 0;
        for (int i = 0; i < m * n; i++)
            ans = max(ans, dist[i]);
        return ans;
    }

private:
    void topsort() {
        queue<int> q;
        for (int i = 0; i < m * n; i++)
            if (deg[i] == 0) q.push(i), dist[i] = 1;
        while (!q.empty()) {
            int x = q.front(); q.pop();
            for (int y : edges[x]) {
                deg[y]--;
                dist[y] = max(dist[y], dist[x] + 1);
                if (deg[y] == 0) {
                    q.push(y);
                }
            }
        }
    }

    void addEdge(int u, int v) {
        edges[u].push_back(v);
        deg[v]++;
    }
    int valid(int i, int j) {
        return i >= 0 && i < m && j >= 0 && j < n;
    }
    int num(int i, int j) {
        return i * n + j;
    }
    int m;
    int n;
    vector<vector<int>> edges;
    vector<int> deg;
    vector<int> dist;
};