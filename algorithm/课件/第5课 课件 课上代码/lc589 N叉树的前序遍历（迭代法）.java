/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
    public List<Integer> preorder(Node root) {
        List<Integer> seq = new ArrayList<Integer>();
        Stack<Node> s = new Stack<Node>();
        s.push(root);
        while (!s.isEmpty()) {
            Node node = s.pop();
            if (node == null) break;
            seq.add(node.val);
            for (int i = node.children.size() - 1; i >= 0; i--) {
                s.push(node.children.get(i));
            }
        }
        return seq;
    }
}