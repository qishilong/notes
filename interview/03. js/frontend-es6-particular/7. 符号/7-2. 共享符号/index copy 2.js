const symbol = Symbol('1')

const obj = {
    a: 1,
    b: 2,
    [Symbol.for("c")]: 3,
    [symbol]: '1'
}

// console.log(symbol.toString())

console.log(obj[Symbol.for("c")], obj[symbol]);