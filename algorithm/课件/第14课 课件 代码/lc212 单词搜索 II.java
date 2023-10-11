import java.util.HashMap;

class Solution {
    public class Node {
        String word; // 实际单词的引用
        HashMap<Character, Node> child; // 出边（字符映射）
        Node() {
            word = null;
            child = new HashMap<Character, Node>();
        }
    }
    Node root;

    boolean[][] visited;
    int n;
    int m;
    List<String> ans;

    int[] dx = new int[]{-1, 0, 0, 1};
    int[] dy = new int[]{0, -1, 1, 0};

    public List<String> findWords(char[][] board, String[] words) {
        // 建立字典树，存单词
        root = new Node();
        for (String word : words) {
            insert(word);
        }

        m = board.length;
        n = board[0].length;
        ans = new ArrayList<String>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                visited = new boolean[m][n];
                visited[i][j] = true;
                dfs(board, i, j, root);
            }
        return ans;
    }

    private void dfs(char[][] board, int x, int y, Node curr) {
        char ch = board[x][y];
        if (!curr.child.containsKey(ch)) return;
        Node fa = curr;
        curr = fa.child.get(ch);
        if (curr.word != null) {
            ans.add(curr.word);
            curr.word = null;
        }
        if (curr.child.isEmpty()) {
            fa.child.remove(ch);
        }
        for (int k = 0; k < 4; k++) {
            int nx = x + dx[k];
            int ny = y + dy[k];
            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
            if (visited[nx][ny]) continue;
            visited[nx][ny] = true;
            dfs(board, nx, ny, curr);
            visited[nx][ny] = false;
        }
    }

    private void insert(String word) {
        Node curr = root;
        for (char ch : word.toCharArray()) {
            if (!curr.child.containsKey(ch)) {
                curr.child.put(ch, new Node());
            }
            curr = curr.child.get(ch);
        }
        curr.word = word;
    }
}