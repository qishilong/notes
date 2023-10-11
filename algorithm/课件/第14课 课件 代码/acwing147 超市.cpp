#include<iostream>
#include<cstdio>
#include<algorithm>
using namespace std;
// profit, day
pair<int,int> a[10000];
int fa[10001];
int n;

int find(int x) {
    if (x == fa[x]) return x;
    return fa[x] = find(fa[x]);
}

int main() {
    while (cin >> n) {
        for (int i = 0; i < n; i++)
            cin >> a[i].first >> a[i].second;
        sort(a, a + n);
        for (int i = 0; i <= 10000; i++) fa[i] = i;
        
        int ans = 0;
        for (int i = n - 1; i >= 0; i--) {
            int profit = a[i].first;
            int day = a[i].second;
            int lastAvailableDay = find(day);
            if (lastAvailableDay > 0) {
                ans += profit;
                fa[lastAvailableDay] = lastAvailableDay - 1;
            }
        }
        cout << ans << endl;
    }
}