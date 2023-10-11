class Solution {
public:
    bool isPowerOfTwo(int n) {
        // 000001000
        //      1000
        return n > 0 && (n == (n & -n));
    }
};