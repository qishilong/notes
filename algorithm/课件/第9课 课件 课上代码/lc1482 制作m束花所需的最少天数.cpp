class Solution {
public:
    int minDays(vector<int>& bloomDay, int m, int k) {
        int MAX = 1000000001;
        int left = 0, right = MAX;
        while (left < right) {
            int mid = (left + right) / 2;
            if (bouquetsOnDay(mid, bloomDay, k) >= m) right = mid;
            else left = mid + 1;
        }
        if (right == MAX) right = -1;
        return right;
    }

private:
    int bouquetsOnDay(int day, vector<int>& bloomDay, int k) {
        int bouquets = 0;
        int consecutive = 0;
        for (int bloom : bloomDay) {
            if (bloom <= day) {
                consecutive++;
                if (consecutive == k) {
                    bouquets++;
                    consecutive = 0;
                }
            } else {
                consecutive = 0;
            }
        }
        return bouquets;
    }
};