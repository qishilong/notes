function pipe() {
    var args = Array.from(arguments);
    return function (value) {
        return args.reduce(function (prev, curr) {
            return curr(prev);
        }, value);
    };
}
