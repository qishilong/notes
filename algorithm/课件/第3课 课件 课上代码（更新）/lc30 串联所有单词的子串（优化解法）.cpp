class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> ans;
        words_map = getMap(words);

        int n = s.size();
        int m = words[0].size();
        int tot = m * words.size();
        for (int first = 0; first < m; first++) {
            if (first + tot > n) break;
            unordered_map<string, int> s_map;
            int curr = first;
            for (int i = 0; i < words.size(); i++) {
                s_map[s.substr(curr, m)]++;
                curr += m;
            }
            for (int start = first, end = curr; start + tot <= n; start += m, end += m) {
                if (isSame(s_map, words_map)) ans.push_back(start);
                s_map[s.substr(end, m)]++;
                s_map[s.substr(start, m)]--;
            }
        }

        return ans;
    }

private:
    unordered_map<string, int> getMap(vector<string>& words) {
        unordered_map<string, int> res;
        for (string& word : words) {
            res[word]++;
        }
        return res;
    }

    bool isSame(unordered_map<string, int>& a, unordered_map<string, int>& b) {
        for (auto& pr : a) {
            if (b[pr.first] != pr.second) return false;
        }
        for (auto& pr : b) {
            if (a[pr.first] != pr.second) return false;
        }
        return true;
    }

    unordered_map<string, int> words_map;
};