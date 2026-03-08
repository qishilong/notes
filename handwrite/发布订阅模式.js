class EvenEmitter {
  constructor() {
    this.events = [];
  }

  on(eventName, callback) {
    const callbacks = this.events[eventName] || [];
    callbacks.push(callback);
    this.events[eventName] = callbacks;
  }

  emit(eventName, ...args) {
    const callbacks = this.events[eventName];
    if (!callbacks) {
      return;
    }

    callbacks.forEach(item => item(...args));
  }

  off(eventName, callback) {
    const callbacks = this.events[eventName];
    if (!callbacks) {
      return;
    }

    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      this.events[eventName] = callbacks.splice(index, 1);
    }
  }

  once(eventName, callback) {
    const once = (...args) => {
      callback(...args);
      this.off(eventName, once);
    };
    this.on(eventName, once);
  }
}
