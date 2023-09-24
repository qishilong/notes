/**
 * 并发请求
 * @param {*} urls 待请求的 url 数组
 * @param {*} maxNum 最大并发数
 */
function concurrencyControl(urls, maxNum) {
	return new Promise((resolve, reject) => {
		if (urls.length === 0) {
			resolve([]);
			return;
		}
		// 下一次请求的下标
		let index = 0;
		// 返回的结果
		const result = [];
		// 请求的数量
		let count = 0;
		async function request() {
			if (index === urls.length) {
				return;
			}
			const i = index;
			const url = urls[index];
			index++;
			console.log(url);
			try {
				const res = await fetch(url);
				result[i] = res;
			} catch (err) {
				result[i] = err;
			} finally {
				count++;
				if (count === urls.length) {
					resolve(result);
				}
				request();
			}
		}
		const min = Math.min(urls.length, maxNum);
		for (let i = 0; i < min; i++) {
			request();
		}
	});
}

const urls = [];
for (let i = 0; i < 100; i++) {
	urls.push(`https://www.aaa.com/${i}`);
}
concurrencyControl(urls, 10).then((res) => console.log(res));
