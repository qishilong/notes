function myInstanceof(left, right) {
  const proto = Object.getPrototypeOf(left);
  if (proto === null) {
    return false;
  }

  return proto === right.prototype || myInstanceof(proto, right);
}

function Person() {}
const p = new Person();
console.log(myInstanceof(p, Person));
