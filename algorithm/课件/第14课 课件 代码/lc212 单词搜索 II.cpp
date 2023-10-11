class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        root = new Node();
        for (string& word : words) insert(word);
        for (int i = 0; i < board.size(); i++)
            for (int j = 0; j < board[0].size(); j++) {
                used = vector<vector<bool>>(board.size(), vector<bool>(board[0].size(), false));
                used[i][j] = true;
                dfs(board, i, j, root);
            }
        return ans;
    }

private:
    struct Node {
        string* word;
        unordered_map<char, Node*> child;
    };
    Node* root;
    vector<vector<bool>> used;
    vector<string> ans;
    const int dx[4] = {-1, 0, 0, 1};
    const int dy[4] = {0, -1, 1, 0};

    void dfs(vector<vector<char>>& board, int x, int y, Node* curr) {
        char ch = board[x][y];
        if (curr->child.find(ch) == curr->child.end()) return;
        Node* fa = curr;
        curr = fa->child[ch];
        if (curr->word != nullptr) {
            ans.push_back(*curr->word);
            curr->word = nullptr;
        }
        if (curr->child.empty()) {
            fa->child.erase(ch);
        }
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            if (nx < 0 || ny < 0 || nx >= board.size() || ny >= board[0].size()) continue;
            if (used[nx][ny]) continue;
            used[nx][ny] = true;
            dfs(board, nx, ny, curr);
            used[nx][ny] = false;
        }
    }

    void insert(string& word) {
        Node* curr = root;
        for (char c : word) {
            if (curr->child[c] == nullptr) {
                curr->child[c] = new Node();
            }
            curr = curr->child[c];
        }
        curr->word = &word;
    }
};