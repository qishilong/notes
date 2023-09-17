let jsonp = (url, data = {}, callback = 'callback') => {
    //准备好带有padding的请求url
    let dataStr = url.indexOf('?') === -1 ? '?' : '&';
    // console.log(dataStr);
    for (let key in data) {
        dataStr += `${key}=${data[key]}&`;
    }
    dataStr += 'callback=' + callback;

    // 构造 script
    let oScript = document.createElement('script');
    oScript.src = url + dataStr;
    // appendChild () 方法可向节点的子节点列表的末尾添加新的子节点
    document.body.appendChild(oScript);

    // window[callback]=(data)=>{
    //     console.log(data);
    // }
    // console.log(dataStr)
    return new Promise((resolve, reject) => {
        window[callback] = (data) => {
            try {
                resolve(data);
            } catch (e) {
                reject(e);
            } finally {
                oScript.parentNode.removeChild(oScript);// 注意这句代码，OScript移除,细节
            }
        };
    });
};

jsonp('https://photo.sina.cn/aj/index?a=1', {
    page: 1,
    cate: 'recommend'
}).then(response => {
    console.log(response, '-------then');
})

// jsonp('https://photo.sina.cn/aj/index?a=1', {
//     page: 1,
//     cate: 'recommend'
// })