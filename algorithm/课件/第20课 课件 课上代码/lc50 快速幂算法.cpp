class Solution {
public:
    /*double myPow(double x, long long n) {
        if (n < 0) return 1 / myPow(x, -n);
        if (n == 0) return 1;
        double temp = myPow(x, n / 2);
        if (n % 2 == 0)
            return temp * temp;
        else
            return temp * temp * x;
    }*/

    double myPow(double x, long long n) {
        if (n < 0) return 1 / myPow(x, -n);
        if (n == 0) return 1;
        double ans = 1;
        while (n > 0) {
            if (n & 1) ans = ans * x;
            n = n >> 1;
            x = x * x;
        }
        return ans;
    }
};