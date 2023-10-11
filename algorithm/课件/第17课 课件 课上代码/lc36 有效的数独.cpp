class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        unordered_set<char> row[9];
        unordered_set<char> col[9];
        unordered_set<char> box[9];
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                if (board[i][j] != '.') {
                    char digit = board[i][j];
                    int boxId = i/3 * 3 + j/3;
                    // row[i].contains(digit)
                    if (row[i].find(digit) != row[i].end()) return false;
                    row[i].insert(digit);
                    if (col[j].find(digit) != col[j].end()) return false;
                    col[j].insert(digit);
                    if (box[boxId].find(digit) != box[boxId].end()) return false;
                    box[boxId].insert(digit);
                }
        return true;
    }
};