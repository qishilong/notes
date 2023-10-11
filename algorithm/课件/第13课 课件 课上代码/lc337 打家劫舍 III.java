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
    public int rob(TreeNode root) {
        dp = new HashMap<TreeNode, int[]>();
        return dfs(root);
    }

    int dfs(TreeNode x) {
        if (x == null) return 0;
        int[] vals = new int[2];
        dp.put(x, vals);
        if (x.left != null) {
            vals[0] += dfs(x.left);
            vals[1] += dp.get(x.left)[0];
        }
        if (x.right != null) {
            vals[0] += dfs(x.right);
            vals[1] += dp.get(x.right)[0];
        }
        vals[1] += x.val;
        return Math.max(vals[0], vals[1]);
    }

    HashMap<TreeNode, int[]> dp;
}