class Solution {
public:
    bool validPalindrome(string s) {
        return validPalindrome(s, 0, s.length() - 1, true);
    }

    bool validPalindrome(const string& s, int l, int r, bool canDelete) {
        while (l < r) {
            if (s[l] == s[r]) l++, r--;
            else {
                if (canDelete) {
                    return validPalindrome(s, l + 1, r, false)
                        || validPalindrome(s, l, r - 1, false);
                } else {
                    return false;
                }
            }
        }
        return true;
    }
};