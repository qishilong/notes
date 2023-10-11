class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        m = matrix.length;
        n = matrix[0].length;
        answer = new int[m][n];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                 answer[i][j] = -1;
        //    U   L  R  D
        dx = new int[]{-1, 0, 0, 1};
        dy = new int[]{0, -1, 1, 0};
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = Math.max(ans, howFar(matrix, i, j));
        return ans;
    }

    // 子问题：从(x,y)出发能走多远
    // x：行号，y：列号
    int howFar(int[][] matrix, int x, int y) {
        // 算过了，直接返回（只算一次）
        if (answer[x][y] != -1) return answer[x][y];
        // 走不动了，至少是1
        answer[x][y] = 1;
        // 四个方向
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
            if (matrix[nx][ny] > matrix[x][y]) {
                answer[x][y] = Math.max(answer[x][y], howFar(matrix, nx, ny) + 1);
            }
        }
        return answer[x][y];
    }

    int m;
    int n;
    int[] dx;
    int[] dy;
    int[][] answer;
}