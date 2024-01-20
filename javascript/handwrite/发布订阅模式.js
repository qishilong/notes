class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅
  on(eventName, callback) {
    const callbacks = this.events[eventName] || [];
    callbacks.push(callback);
    this.events[eventName] = callbacks;
  }

  // 发布
  emit(eventName, ...args) {
    const callbacks = this.events[eventName] || [];
    callbacks.forEach((item) => item(...args));
  }

  // 只监听一次
  once(eventName, callback) {
    const one = (...args) => {
      callback(...args);
      this.off(eventName, one);
    };
    this.on(eventName, one);
  }

  // 取消订阅
  off(eventName, callback) {
    const index = this.events[eventName].indexOf(callback);
    if (index !== -1) {
      this.events[eventName].splice(index, 1);
    }
  }
}

const event1 = new EventEmitter();
const event2 = new EventEmitter();

const handle = (params) => console.log("handle", params);

event1.on("handle", handle);
event1.on("handle", handle);
event1.emit("handle", "aaa1");
event1.off("handle", handle);
event1.emit("handle", "aaa2");
event1.once("handleOnce", handle);
event1.emit("handleOnce", "once");
event1.emit("handleOnce", "once");

event2.once("handle1", handle);
event2.emit("handle1", "bbb1");
event2.emit("handle1", "bbb2");

/* class EventEmitter {
	constructor() {
		this.events = {};
	}
	// 订阅
	on(eventName, callback) {
		const callbacks = this.events[eventName] || [];
		callbacks.push(callback);
		this.events[eventName] = callbacks;
	}
	// 发布
	emit(eventName, ...args) {
		const callbacks = this.events[eventName] || [];
		callbacks.forEach((cb) => cb(...args));
	}
	// 取消订阅
	off(eventName, callback) {
		const index = this.events[eventName].indexOf(callback);
		if (index !== -1) {
			this.events[eventName].splice(index, 1);
		}
	}
	// 只监听一次
	once(eventName, callback) {
		const one = (...args) => {
			callback(...args);
			this.off(eventName, one);
		};
		this.on(eventName, one);
	}
}

let JJ1 = new EventEmitter();
let JJ2 = new EventEmitter();

let handleOne = (params) => {
	console.log(params, 'handleOne');
};

JJ1.on('aaa', handleOne);
JJ1.emit('aaa', 'hhhh');
JJ1.off('aaa', handleOne);
// 取消订阅以后再发就没用了
JJ1.emit('aaa', 'ffff');

JJ2.once('aaa', handleOne);
JJ2.emit('aaa', 'hhhh');
// 只能发一次消息，再发就无效了
JJ2.emit('aaa', 'hhhh'); */
