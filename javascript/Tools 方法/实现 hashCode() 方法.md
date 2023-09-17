# 实现 hashCode() 方法

```typescript
const hashCodeFn = (s: string) => {
    let h: any;
    for (let i = 0; i < s.length; i++) {
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }
    return h;
};

const result = hashCodeFn('002931');

console.log(result! % 8);
```

