class Solution {
public:
    bool isPalindrome(string s) {
        string t;
        for (char ch : s)
            if (ch >= '0' && ch <= '9' ||
                ch >= 'A' && ch <= 'Z' ||
                ch >= 'a' && ch <= 'z') {
                if (ch >= 'A' && ch <= 'Z') ch = ch - 'A' + 'a';
                t.push_back(ch);
            }
        cout << t << endl;
        int l = 0, r = t.length() - 1;
        while (l < r) {
            if (t[l] != t[r]) return false;
            l++; r--;
        }
        return true;
    }
};