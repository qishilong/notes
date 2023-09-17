class MyPromise {
    // 记录 Promise 的三种状态
    #PENDING = 'pending';
    #FULFILLED = 'fulfilled';
    #REJECTED = 'rejected';

    /**
     * 创建一个 Promise
     * @param {Function} executor 任务执行器，立即执行
     * @memberof MyPromise
     */
    constructor(executor) {
        this._state = this.#PENDING; // 状态
        this._value = undefined; // 数据
        this._handlers = []; // 处理函数形成的队列
        try {
            // 需要绑定 this 执行
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err)
            console.error(err)
        }
    }

    /**
     * 创建一个运行在微队列中的环境
     * 把传递的函数放入到微队列中
     * Promise 中的 then 函数是放在微队列中的
     * @param {Function} callback
     * @memberof MyPromise
     */
    runMicroTask(callback) {
        // 判断当前是不是 node 环境
        // 为了避免「变量未定义」的错误，这里最好加上前缀globalThis
        // globalThis是一个关键字，指代全局对象，浏览器环境为window，node环境为global
        if (globalThis.process && globalThis.process.nextTick) {
            process.nextTick(callback);
        } else if (globalThis.MutationObserver) {
            const p = document.createElement('p');
            const observer = new MutationObserver(callback);
            observer.observe(p, {
                childList: true, // 观察该元素的内部变化
            })
            p.innerHTML = '1';
        } else {
            setTimeout(callback, 0)
        }
    }

    /**
     * 判断一个数据是不是 Promise
     * @param {any} obj
     * @return {*} 
     * @memberof MyPromise
     */
    static isPromise(obj) {
        return !!(obj && typeof obj === 'object' && typeof obj.then === 'function');
    }

    /**
    * 向队列中加入一个函数
    * @param {Function} executor   添加的函数
    * @param {String} state    该函数在什么状态子执行
    * @param {Function} resolve    让 then 函数返回的 Promise 成功
    * @param {Function} reject     让 then 函数返回的 Promise 失败
    * @memberof MyPromise
    */
    _pushHandle(executor, state, resolve, reject) {
        this._handlers.push({
            executor,
            state,
            resolve,
            reject
        })
    }

    /**
     * 根据实际情况，执行队列
     * @memberof MyPromise
     */
    _runHandles() {
        // 目标任务仍在挂起状态，不执行
        if (this._state === this.#PENDING) {
            return
        }
        while (this._handlers[0]) {
            this._runOneHandle(this._handlers[0]);
            this._handlers.shift();
        }

    }

    /**
     * 处理一个 handle
     * @param {*} { executor, state, resolve, reject }
     * @memberof MyPromise
     */
    _runOneHandle({ executor, state, resolve, reject }) {
        this.runMicroTask(() => {
            if (this._state !== state) {
                // 状态不一致，不处理
                return;
            }
            if (typeof executor !== 'function') {
                // 传递后续处理并非一个函数
                this._state === this.#FULFILLED ? resolve(this._value) : reject(this._value);
                return;
            }
            try {
                const result = executor(this._value)
                if (MyPromise.isPromise(result)) {
                    result.then(resolve, reject)
                } else {
                    resolve(result)
                }
            } catch (err) {
                reject(err)
                console.error(err)
            }
        })
    }

    /**
     * Promise A+ 规范里面的 then
     * @param {Function} onFulFilled
     * @param {Function} onRejected
     * @memberof MyPromise
     */
    then(onFulFilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this._pushHandle(onFulFilled, this.#FULFILLED, resolve, reject)
            this._pushHandle(onRejected, this.#REJECTED, resolve, reject)
            this._runHandles(); // 执行队列
        })
    }

    /**
     * 仅处理失败的场景
     * @param {Function} onRejected
     * @memberof MyPromise
     */
    catch(onRejected) {
        return this.then(null, onRejected)
    }

    /**
     * 无论成功还是失败都会执行回调函数
     * @param {Function} onFinally
     * @memberof MyPromise
     */
    finally(onFinally) {
        return this.then((data) => {
            onFinally();
            return data;
        }, (reason) => {
            onFinally();
            throw reason;
        })
    }

    /**
     * 专门用来更改状态数据
     * @param {String} newState 新的状态
     * @param {any} value 相关数据
     * @return {*} 
     * @memberof MyPromise
     */
    _changeState(newState, value) {
        if (this._state !== this.#PENDING) {
            // 目标状态已经更改，后续状态不可改变
            return;
        }
        this._state = newState;
        this._value = value;
        this._runHandles(); // 状态发生改变，执行队列
    }

    /**
     * 标记当前任务完成
     * @param {any} data 任务完成后的相关数据
     * @memberof MyPromise
     */
    _resolve(data) {
        this._changeState(this.#FULFILLED, data)
    }

    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败后的相关原因
     * @memberof MyPromise
     */
    _reject(reason) {
        this._changeState(this.#REJECTED, reason)
    }

    /**
     * 返回一个已完成的 Promise
     * 特殊情况：
     * 1. 如果 data 本身是 ES6 的 Promise 对象，直接返回
     * 2. 传递的对象是 PromiseLike(Promise A+)，返回新的 Promise，状态和其保持一致即可
     * @static
     * @param {any} data
     * @memberof MyPromise
     */
    static resolve(data) {
        if (data instanceof MyPromise) {
            return data;
        }
        return new MyPromise((resolve, reject) => {
            if (this.isPromise(data)) {
                data.then(resolve, reject)
            } else {
                resolve(data)
            }
        })
    }

    /**
     * 得到一个被拒绝的 Promise
     * @static
     * @param {any} reason
     * @memberof MyPromise
     */
    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }

    /**
     * 得到一个新的 Promise
     * 该 Promise 的状态取决于 proms 的执行
     * proms 是一个迭代器，包含多个 Promise
     * 如果所有 Promise 成功则成功，返回的是所有 Promise 成功的数据，并且按照传入的 Promise 顺序排列
     * 只要有一个 Promise 失败则失败，并且返回第一个失败的 Promise 的原因
     * 如果传入的迭代器为空，则直接成功，并返回一个成功后的空数组
     * @static
     * @param {iterable} proms
     * @memberof MyPromise
     */
    static all(proms) {
        return new MyPromise((resolve, reject) => {
            try {
                const result = [];
                let count = 0;  // Promise 的总数
                let fulfilledCount = 0; // 已经完成的数量
                for (const item of proms) {
                    let i = count;
                    count++;
                    MyPromise.resolve(item).then((data) => {
                        fulfilledCount++;
                        result[i] = data;
                        if (fulfilledCount === count) {
                            // 最后一个 Promise 完成了
                            resolve(result)
                        }
                    }, reject)
                }
                if (count === 0) {
                    resolve(result);
                }
            } catch (err) {
                reject(err)
                console.error(err)
            }
        })
    }

    /**
     * 几乎和 all 相反
     * 得到一个新的 Promise，该 Promise 的状态取决于 proms 的执行
     * proms 是一个迭代器，包含多个 Promise
     * 只要有一个 Promise 成功则成功，并返回第一个成功的 Promise 的数据
     * 所有 Promise 失败则失败，返回所有 Promise 失败的数据，并且按照传入的 Promise 排序
     * 如果传入的迭代器为空，则直接失败，并返回一个空数组
     * @static
     * @param {*} proms
     * @memberof MyPromise
     */
    static any(proms) {
        return new MyPromise((resolve, reject) => {
            try {
                const result = [];
                let count = 0;
                let rejected = 0;
                let isResolve = false;
                for (const item of proms) {
                    let i = count;
                    count++;
                    MyPromise.resolve(item).then((data) => {
                        if (!isResolve) {
                            isResolve = true;
                            resolve(data);
                        }
                    }, (reason) => {
                        rejected++;
                        result[i] = reason;
                        if (count === rejected) {
                            reject(result)
                        }
                    })
                }
                if (count === 0) {
                    reject(result);
                }
            } catch (err) {
                reject(err);
                console.error(err)
            }
        })
    }

    /**
     * 等待所有 Promise 有结果后，该方法返回的 Promise 完成，并且按照顺序将所有结果汇总
     * @static
     * @param {*} proms
     * @memberof MyPromise
     */
    static allSettled(proms) {
        const result = [];
        for (const item of proms) {
            result.push(MyPromise.resolve(item).then(
                (value) => ({
                    status: 'fulfilled',
                    value
                }),
                (reason) => ({
                    status: 'rejected',
                    reason
                })
            ))
        }
        return MyPromise.all(result);
    }

    /**
     * 返回的 Promise 和第一个有结果的 Promise 一致
     * @static
     * @param {*} proms
     * @memberof MyPromise
     */
    static race(proms) {
        return new MyPromise((resolve, reject) => {
            for (const item of proms) {
                MyPromise.resolve(item).then(resolve, reject)
            }
        })
    }
}

// const myPromise = new MyPromise((resolve, reject) => {
//     resolve(1);
// }).then(() => {
//     console.log(1)
// }, () => console.log(2));

// console.log(myPromise)
// new Promise((resolve, reject) => {
//     console.log(myPromise, 11)
//     resolve()
// }).then(() => console.log(myPromise))


// const promises = [
//   Promise.reject('ERROR A'),
//   Promise.reject('ERROR B'),
//   Promise.reject('result'),
//   1,
//   null
// ]

// 如果传入的不是一个迭代器，报错，比如传入 null
// MyPromise.any(promises).then((value) => {
//   console.log('value: ', value)
// }).catch((err) => {
//   console.log('err: ', err)
// })
