/**
 * 两种方法：
 * 1. 最简单的办法：直接 while(true){}，阻塞js的执行
 * 2. 使用requestAnimationFrame + 递归实现，但是 requestAnimationFrame 只在浏览器端可以使用
 * 3. 使用 setInterval
 * @param {*} fn
 * @param {*} delay
 * @param  {...any} args
 */
const mySetTimeout = (fn, delay, ...args) => {
	const start = new Date();

	// 最简单的方法，while(true){}
	// while (true) {
	// 	const now = new Date();
	// 	if (now - start >= delay) {
	// 		fn.apply(this, args);
	// 		return;
	// 	}
	// }

	// 使用 requestAnimationFrame + 递归
	// let timer, now;
	// const loop = () => {
	// 	timer = requestAnimationFrame(loop);
	// 	now = new Date();
	// 	if (now - start >= delay) {
	// 		fn.apply(this, args);
	// 		cancelAnimationFrame(timer);
	// 	}
	// };
	// requestAnimationFrame(loop);
	// 使用 setInterval
	const timer = setInterval(() => {
		fn.apply(this, args);
		clearInterval(timer);
	}, delay);
};

const fn = (...args) => console.log('时间到了', args);
mySetTimeout(fn, 1000, 1, 2, 3, 4);
