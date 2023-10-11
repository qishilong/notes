class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        // j < i
        // for i = 0 ~ n - 1:
        //      search if (target - numbers[i]) exists in numbers[0..i-1]

        unordered_map<int, int> value_to_index; // 值到下标的映射

        for (int i = 0; i < numbers.size(); i++) {
            // 不等于尾部，就是找到了，存在
            // Java: value_to_index.containsKey(target-numbers[i])
            // Pythong: target-numbers[i] in value_to_index
            if (value_to_index.find(target - numbers[i]) != value_to_index.end()) {
                return {value_to_index[target - numbers[i]], i};
            }
            // 边循环i，边插入，维护的是对于numbers[0..i-1]的映射
            // 本质上是在i之前查找，防止查找i本身
            value_to_index[numbers[i]] = i;
        }
        return {};
    }
};