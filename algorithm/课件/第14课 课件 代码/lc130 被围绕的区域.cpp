class Solution {
public:
    void solve(vector<vector<char>>& board) {
        m = board.size();
        n = board[0].size();
        fa = vector<int>(n * m + 1, 0);
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                fa[num(i, j)] = num(i, j);
        fa[n * m] = n * m; // 外部大O
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'X') continue;
                for (int k = 0; k < 4; k++) {
                    int ni = i + dx[k];
                    int nj = j + dy[k];
                    if (ni < 0 || nj < 0 || ni >= m || nj >= n) {
                        fa[get(num(i, j))] = get(n * m);
                    } else if (board[ni][nj] == 'O') {
                        fa[get(num(ni, nj))] = get(num(i, j));
                    }
                }
            }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (board[i][j] == 'O' && get(num(i, j)) != get(n * m))
                    board[i][j] = 'X';
    }

private:
    vector<int> fa;
    int m, n;
    const int dx[4] = {-1, 0, 0, 1};
    const int dy[4] = {0, -1, 1, 0};
    inline int num(int i, int j) {
        return i * n + j;
    }
    inline int get(int x) {
        return x == fa[x] ? x : (fa[x] = get(fa[x]));
    }
};