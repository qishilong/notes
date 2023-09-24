function ajax(option) {
	//type,url,obj,timeout,success,error将所有参数换成一个对象{}
	//  0.将对象转换成字符串
	var str = objToString(option.data);
	//  1.创建一个异步对象xmlhttp；
	var xmlhttp, timer;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//  2.设置请求方式和请求地址；
	// 判断请求的类型是POST还是GET
	if (option.type.toLowerCase() === 'get') {
		xmlhttp.open(option.type, option.url + '?t=' + str, true);
		//  3.发送请求；
		xmlhttp.send();
	} else {
		xmlhttp.open(option.type, option.url, true);
		// 注意：在post请求中，必须在open和send之间添加HTTP请求头：setRequestHeader(header,value);
		xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		//  3.发送请求；
		xmlhttp.send(str);
	}
	//  4.监听状态的变化；
	xmlhttp.onreadystatechange = function () {
		clearInterval(timer);
		if (xmlhttp.readyState === 4) {
			if ((xmlhttp.status >= 200 && xmlhttp.status < 300) || xmlhttp.status == 304) {
				//  5.处理返回的结果；
				option.success(xmlhttp); //成功后回调；
			} else {
				option.error(xmlhttp); //失败后回调；
			}
		}
	};
	//处理obj
	function objToString(data) {
		data.t = new Date().getTime();
		var res = [];
		for (var key in data) {
			//需要将key和value转成非中文的形式，因为url不能有中文。使用encodeURIComponent();
			res.push(encodeURIComponent(key) + ' = ' + encodeURIComponent(data[key]));
		}
		return res.join('&');
	}
	//判断外界是否传入了超时时间
	if (option.timeout) {
		timer = setInterval(function () {
			xmlhttp.abort(); //中断请求
			clearInterval(timer);
		}, timeout);
	}
}

// 简单版本
const getJSON = function (url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onreadystatechange = function () {
			if (xhr.readyState !== 4) return;
			if (xhr.status === 200 || xhr.status === 304) {
				resolve(xhr.responseText);
			} else {
				reject(new Error(xhr.responseText));
			}
		};
		xhr.send();
	});
};
