class Solution {
    public boolean isMatch(String s, String p) {
        int n = s.length();
        int m = p.length();
        s = " " + s;
        p = " " + p;
        boolean[][] f = new boolean[n + 1][m + 1];
        f[0][0] = true;
        for (int j = 2; j <= m && p.charAt(j) == '*'; j += 2) f[0][j] = true;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++) {
                if (p.charAt(j) == '.') {
                    f[i][j] = f[i - 1][j - 1];
                } else if (p.charAt(j) == '*') {
                    f[i][j] = f[i][j - 2];
                    char ch = p.charAt(j - 1);
                    if (ch == '.' || s.charAt(i) == ch)
                        f[i][j] |= f[i - 1][j];
                } else {
                    f[i][j] = f[i - 1][j - 1] && (s.charAt(i) == p.charAt(j));
                }
            }
        return f[n][m];
    }
}