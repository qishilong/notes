function translate(obj) {
	const result = {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const newKey = key.replace(/_([a-z])/g, function (str, $1) {
				return $1.toUpperCase();
			});
			result[newKey] = obj[key];
		}
	}
	return result;
}
const obj = {
	a_b_c: 1,
	b_c_d: 2,
};
const result = translate(obj);
console.log(result);
