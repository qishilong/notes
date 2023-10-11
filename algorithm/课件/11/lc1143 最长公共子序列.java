class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int n = text1.length();
        int m = text2.length();
        text1 = " " + text1;
        text2 = " " + text2;
        int[][] f = new int[n + 1][m + 1];
        for (int i = 0; i <= n; i++) f[i][0] = 0;
        for (int j = 0; j <= m; j++) f[0][m] = 0;
        for (int i = 1; i <= n; i++)
            for (int j =1; j <= m; j++)
                if (text1.charAt(i) == text2.charAt(j))
                    f[i][j] = f[i - 1][j - 1] + 1;
                else
                    f[i][j] = Math.max(f[i - 1][j], f[i][j - 1]);
        return f[n][m];
    }
}