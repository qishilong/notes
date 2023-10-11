/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val) {
        val = _val;
    }

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
public:
    vector<vector<int>> levelOrder(Node* root) {
        if (root == nullptr) return {};
        vector<vector<int>> seq;
        // q = [[1, 0], [3, 1], [2, 1], [4, 1], [5, 2], [6, 2]]
        queue<pair<Node*, int>> q;
        q.push(make_pair(root, 0));
        while (!q.empty()) {
            // 取出队头
            Node* node = q.front().first;
            int depth = q.front().second;
            q.pop();
            // 存储答案，避免越界
            if (seq.size() <= depth) seq.push_back({});
            seq[depth].push_back(node->val);
            // 扩展一层
            for (Node* child : node->children) {
                q.push(make_pair(child, depth + 1));
            }
        }
        return seq;
    }
};