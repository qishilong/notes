// 继承（圣杯模式）
const inherit = (function () {
    const Temp = function () { };
    return function (son, father) {
        Temp.prototype = father.prototype;
        son.prototype = new Temp();
        son.prototype.constructor = son;
        son.prototype.uber = father.prototype;
    };
}());

// 借用构造函数实现继承
function Parent1() {
    this.name = 'parent1';
}
function Child1() {
    Parent1.call(this);
    this.type = 'child1';
}
// 缺点：*Child1* 无法继承 *Parent1* 的原型对象，并没有真正的实现继承 (部分继承)。

// 借用原型链实现继承
function Parent2() {
    this.name = 'parent2';
}

function Child2() {
    this.type = 'child2';
}

Child2.prototype = new Parent2();

// 缺点：原型对象的属性是共享的。

// 组合式继承
function Parent3() {
    this.name = 'parent3';
}

function Child3() {
    Parent3.call(this);
    this.type = 'child3';
}
Child3.prototype = Object.create(Parent3.prototype);
Child3.prototype.constructor = Child3;

