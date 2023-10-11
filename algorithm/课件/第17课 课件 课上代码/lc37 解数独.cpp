class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        memset(row, true, sizeof(row)); // 数组全部赋值为true
        memset(col, true, sizeof(col));
        memset(box, true, sizeof(box));
        // 预处理数字的可用情况
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                if (board[i][j] != '.') {
                    int digit = board[i][j] - '0';
                    row[i][digit] = false;
                    col[j][digit] = false;
                    box[i/3*3+j/3][digit] = false;
                }
        dfs(board);
    }

    bool dfs(vector<vector<char>>& board) {
        pair<int, int> location = getLeastPossibleLocation(board);
        int x = location.first;
        int y = location.second;
        if (x == -1) return true; // 填满了，有解
        for (int digit = 1; digit <= 9; digit++) {
            int boxId = x/3*3+y/3;
            if (row[x][digit] && col[y][digit] && box[boxId][digit]) {
                row[x][digit] = col[y][digit] = box[boxId][digit] = false;
                char ch = '0' + digit;
                board[x][y] = ch;
                if (dfs(board)) return true;
                board[x][y] = '.';
                row[x][digit] = col[y][digit] = box[boxId][digit] = true;
            }
        }
        return false;
    }

    pair<int, int> getLeastPossibleLocation(vector<vector<char>>& board) {
        int ansCnt = 10;
        pair<int, int> ans = make_pair(-1, -1);
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                if (board[i][j] == '.') {
                    int cnt = 0;
                    for (int digit = 1; digit <= 9; digit++)
                        if (row[i][digit] && col[j][digit] && box[i/3*3+j/3][digit])
                            cnt++;
                    if (cnt < ansCnt) {
                        ansCnt = cnt;
                        ans = make_pair(i, j);
                    }
                }
        return ans;
    }

    bool row[9][10]; // [行号][1-9是否可用]
    bool col[9][10]; // [列号][1-9是否可用]
    bool box[9][10];
};