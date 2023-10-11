/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }

    /*public int maxDepth(TreeNode root) {
        depth = 1;
        ans = 0;
        calc(root);
        return ans;
    }

    private void calc(TreeNode root) {
        if (root == null) return;
        ans = Math.max(ans, depth);
        depth++;
        calc(root.left);
        //depth--;
        //depth++;
        calc(root.right);
        depth--;
    }

    private int depth;
    private int ans;*/
}