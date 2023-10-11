class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        int initial = 1022; // 1111111110
        for (int i = 0; i < 9; i++) {
            row[i] = initial;
            col[i] = initial;
            box[i] = initial;
        }
        // 预处理数字的可用情况
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                if (board[i][j] != '.') {
                    int digit = board[i][j] - '0';
                    row[i] = row[i] ^ (1 << digit);
                    col[j] = col[j] ^ (1 << digit);
                    box[i/3*3+j/3] ^= 1 << digit;
                }
        dfs(board);
    }

    bool dfs(vector<vector<char>>& board) {
        pair<int, int> location = getLeastPossibleLocation(board);
        int x = location.first;
        int y = location.second;
        if (x == -1) return true; // 填满了，有解
        int boxId = x/3*3+y/3;
        int availability = row[x] & col[y] & box[boxId];
        for (int digit = 1; digit <= 9; digit++) {
            if ((availability >> digit & 1) == 1) {
                row[x] ^= 1 << digit;
                col[y] ^= 1 << digit;
                box[boxId] ^= 1 << digit;
                char ch = '0' + digit;
                board[x][y] = ch;
                if (dfs(board)) return true;
                board[x][y] = '.';
                row[x] ^= 1 << digit;
                col[y] ^= 1 << digit;
                box[boxId] ^= 1 << digit;
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
                    int boxId = i/3*3+j/3;
                    int cnt = hammingWeight(row[i] & col[j] & box[boxId]);
                    if (cnt < ansCnt) {
                        ansCnt = cnt;
                        ans = make_pair(i, j);
                    }
                }
        return ans;
    }

    int hammingWeight(uint32_t n) {
        int count = 0;
        while (n > 0) {
            count++;
            n -= n & -n;
        }
        return count;
    }
/*
    bool row[9][10]; // [行号][1-9是否可用]
    bool col[9][10]; // [列号][1-9是否可用]
    bool box[9][10];
*/
    int row[9]; // 每行一个10位二进制数（浪费掉0位） 1100100110
    int col[9];
    int box[9];
};