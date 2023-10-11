class Solution {
    public int reversePairs(int[] nums) {
        ans = 0;
        mergeSort(nums, 0, nums.length - 1);
        return ans;
    }

    void mergeSort(int[] arr, int l, int r) {  // sort arr[l..r]
        if (l >= r) return;
        int mid = (l + r) >> 1; // (l + r) / 2
        mergeSort(arr, l, mid);
        mergeSort(arr, mid + 1, r);
        calculate(arr, l, mid, r);
        merge(arr, l, mid, r);
    }

    void calculate(int[] arr, int left, int mid, int right) { // 统计翻转对
        for (int i = left, j = mid; i <= mid; i++) {
            while (j < right && arr[i] > 2L * arr[j + 1]) j++;
            ans += j - mid;
        }
    }

    void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];  // 临时数组
        int i = left, j = mid + 1;

        for (int k = 0; k < temp.length; k++) {  // 合并两个有序数组
            if (j > right || (i <= mid && arr[i] <= arr[j]))
                temp[k] = arr[i++];
            else
                temp[k] = arr[j++];
        }

        for (int k = 0; k < temp.length; k++) {  // 拷回原数组
            arr[left + k] = temp[k];
        }
    }

    int ans;
}