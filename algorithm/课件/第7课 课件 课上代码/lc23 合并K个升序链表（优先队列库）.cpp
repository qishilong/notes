/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
#include<queue>

// 堆结点（key用于比较的关键码，listNode可以是任意的附带信息）
struct Node {
    int key;
    ListNode* listNode;
    Node(int key, ListNode* listNode)  : key(key), listNode(listNode) {}
};

// priority_queue通过小于号比较的
bool operator <(const Node& a, const Node& b) {
    // return a.key < b.key; // 大根堆
    return a.key > b.key; // 小根堆（欺骗总是取出max的priority_queue）
}

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<Node> q;
        for (ListNode* listNode : lists) {
            if (listNode != nullptr)
                q.push(Node(listNode->val, listNode));
        }
        ListNode head;
        ListNode* tail = &head;
        while (!q.empty()) {
            // 取出k个指针指向的最小元素
            Node node = q.top();
            q.pop();
            // 在答案链表的末尾插入
            tail->next = node.listNode;
            tail = tail->next;
            // 当最小被取出后，指针向后移动一位，可能需要插入新的元素
            ListNode* p = node.listNode->next;
            if (p != nullptr) {
                q.push(Node(p->val, p));
            }
        }
        return head.next;
    }
};