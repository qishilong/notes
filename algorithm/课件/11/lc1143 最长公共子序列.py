class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        n = len(text1)
        m = len(text2)
        text1 = " " + text1
        text2 = " " + text2
        f = [[0] * (m + 1) for i in range(n + 1)] # 0~n 0~m
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if text1[i] == text2[j]:
                    f[i][j] = f[i-1][j-1] + 1
                else:
                    f[i][j] = max(f[i-1][j], f[i][j-1])
        return f[n][m]