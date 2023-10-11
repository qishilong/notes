class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.length() == 0) return {};
        edges['2'] = "abc";
        edges['3'] = "def";
        edges['4'] = "ghi";
        edges['5'] = "jkl";
        edges['6'] = "mno";
        edges['7'] = "pqrs";
        edges['8'] = "tuv";
        edges['9'] = "wxyz";
        dfs(digits, 0);
        return ans;
    }

private:
    void dfs(string& digits, int index) {
        // 终止条件
        if (index == digits.length()) {
            ans.push_back(s);
            return;
        }
        // 考虑所有出边，例如 for ch in "abc"
        for (char ch : edges[digits[index]]) {
            s.push_back(ch);
            dfs(digits, index + 1);
            s.pop_back();
        }
    }

    unordered_map<char, string> edges;
    string s;
    vector<string> ans;
};