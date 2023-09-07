function pipe() {
    const args = Array.from(arguments);
    return function (value: any) {
        args.reduce(function (prev, curr) {
            return curr(prev);
        }, value);
    };
}