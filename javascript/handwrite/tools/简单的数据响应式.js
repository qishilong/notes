const obj = {
    a: 1,
    b: 2
}

const proxy = new Proxy(obj, {
    set(target, propertyKey, value) {
        // console.log(target, propertyKey, value);
        // target[propertyKey] = value;
        Reflect.set(target, propertyKey, value);
    },
    get(target, propertyKey) {
        if (Reflect.has(target, propertyKey)) {
            return Reflect.get(target, propertyKey);
        } else {
            return -1;
        }
    },
    has(target, propertyKey) {
        return false;
    }
});
// console.log(proxy);
// proxy.a = 10;
// console.log(proxy.a);

console.log(proxy.d);
console.log("a" in proxy);