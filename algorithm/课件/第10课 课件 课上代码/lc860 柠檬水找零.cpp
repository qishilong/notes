class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
        count[5] = count[10] = count[20] = 0;
        for (int bill : bills) {
            count[bill]++;
            if (!exchange(bill - 5)) return false;
        }
        return true;
    }

private:
    bool exchange(int amount) {
        while (amount >= 10 && count[10] > 0) {
            amount -= 10;
            count[10]--;
        }
        while (amount >= 5 && count[5] > 0) {
            amount -= 5;
            count[5]--;
        }
        return amount == 0;
    }

private:
    unordered_map<int,int> count;
};