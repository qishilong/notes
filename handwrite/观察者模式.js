class Observer {
  constructor(name) {
    this.name = name;
  }

  update() {
    console.log(this.name, 'name');
  }

  static sayHello() {
    console.log('hello');
  }
}

class Notify {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers = this.observers.filter(item => item !== observer);
  }

  notify() {
    this.observers.forEach(item => item.update());
  }
}

const observer1 = new Observer('observer1');
const observer2 = new Observer('observer2');
const notify = new Notify();

notify.add(observer1);
notify.add(observer2);

notify.notify();
