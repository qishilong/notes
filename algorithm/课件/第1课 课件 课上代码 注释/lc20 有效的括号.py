class Solution:
    def isValid(self, s: str) -> bool:
        stack = list([])
        for ch in s:
            if ch == '(' or ch == '[' or ch == '{':
                stack.append(ch)
            else:
                if len(stack) == 0:
                    return False
                if ch == ')':
                    if stack[len(stack) - 1] != '(':
                        return False
                elif ch == ']':
                    if stack[len(stack) - 1] != '[':
                        return False
                else:
                    if stack[len(stack) - 1] != '{':
                        return False
                stack.pop()
        return len(stack) == 0