class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        this->n = n;
        used = vector<bool>(n, false);
        // dfs，排列模板 + 合法性检查
        find(0);
        // 把排列变成.Q..的形式输出
        vector<vector<string>> result;
        for (vector<int>& per : ans) {
            vector<string> res;
            for (int row = 0; row < n; row++) {
                string s(n, '.'); // n个.
                int col = per[row];
                s[col] = 'Q';
                res.push_back(s);
            }
            result.push_back(res);
        }
        return result;
    }

    void find(int row) {
        if (row == n) {
            // for (int x : s) cout << x;
            // cout << endl;
            ans.push_back(s);
            return;
        }
        for (int col = 0; col < n; col++)
            if (!used[col] && !usedIplusJ[row + col] && !usedIminusJ[row - col]) {
                used[col] = true;
                usedIplusJ[row + col] = true;
                usedIminusJ[row - col] = true;
                s.push_back(col);
                find(row + 1);
                s.pop_back();
                usedIminusJ[row - col] = false;
                usedIplusJ[row + col] = false;
                used[col] = false;
            }
    }

private:
    int n;
    vector<vector<int>> ans;
    vector<int> s;
    vector<bool> used;
    unordered_map<int, bool> usedIplusJ;
    unordered_map<int, bool> usedIminusJ;
};

/*
i+j
i-j


i-j=0
\
(1,1)
(2,2)
(3,3)
(4,4)

i-j=-1
(1,2)
(2,3)
(3,4)

i+j=5
/
(1,4)
(2,3)
(3,2)
(4,1)
*/