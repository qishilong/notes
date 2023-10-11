class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_map<string, int> distBegin, distEnd;
        for (string& s : wordList) distBegin[s] = distEnd[s] = 1e9;
        if (distBegin.find(endWord) == distBegin.end()) return 0; // endWord不在字典中
        distBegin[beginWord] = 1;
        distEnd[endWord] = 1;
        queue<string> qBegin, qEnd;
        qBegin.push(beginWord);
        qEnd.push(endWord);
        while (!qBegin.empty() || !qEnd.empty()) {
            int res = expand(qBegin, distBegin, distEnd);
            if (res != -1) return res;
            res = expand(qEnd, distEnd, distBegin);
            if (res != -1) return res;
        }
        return 0;
    }

    // 扩展一层
    int expand(queue<string>& q, unordered_map<string, int>& dist,
                unordered_map<string, int>& distOther) {
        if (!q.empty()) {
            string s = q.front();
            q.pop();
            int depth = dist[s];
            for (int i = 0; i < s.length(); i++)
                for (char ch = 'a'; ch <= 'z'; ch++) {
                    char backup = s[i];
                    s[i] = ch;
                    // dist.contains(s)
                    if (dist.find(s) != dist.end()) {
                        if (dist[s] > depth + 1) {
                            dist[s] = depth + 1;
                            q.push(s);
                            // 到了对面搜过的一个状态——相遇了
                            if (distOther[s] != 1e9) {
                                return depth + distOther[s];
                            }
                        }
                    }
                    s[i] = backup;
                }
        }
        return -1;
    }
};