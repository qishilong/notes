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
    /*
    节点的左子树只包含小于当前节点的数 => 左子树的最大节点比根小
    节点的右子树只包含大于当前节点的数 => 右子树的最小节点比根大
    所有左子树和右子树自身必须也是二叉搜索树。
    */
    public boolean isValidBST(TreeNode root) {
        return check(root).isValid;
    }

    private class Info {
        public boolean isValid;
        public long minVal;
        public long maxVal;
    }

    private Info check(TreeNode root) {
        if (root == null) {
            Info info = new Info();
            info.isValid = true;
            info.minVal = Integer.MAX_VALUE + 1L;
            info.maxVal = Integer.MIN_VALUE - 1L;
            return info;
        }
        Info left = check(root.left);
        Info right = check(root.right);
        Info result = new Info();
        result.isValid = left.isValid && right.isValid
            && left.maxVal < root.val && right.minVal > root.val;
        result.minVal = Math.min(Math.min(left.minVal, right.minVal), root.val);
        result.maxVal = Math.max(Math.max(left.maxVal, right.maxVal), root.val);
        // System.out.printf("Node %d, isValid %s, min %d, max %d\n", root.val, (result.isValid ? "true" : "false"), result.minVal, result.maxVal);
        return result;
    }
}