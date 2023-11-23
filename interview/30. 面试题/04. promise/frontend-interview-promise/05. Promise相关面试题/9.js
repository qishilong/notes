async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}

console.log('script start');

const b = requestAnimationFrame(function () {
  console.log('requestAnimationFrame')
})

setTimeout(function () {
  console.log('setTimeout');
}, 0);

(async function () {
  console.log('immediately')
  for await (const item of [1, 2, 3]) {
    // Promise.resolve().then(() => console.log(item))
    console.log(item)
  }
}())

window.onload = function () {
  console.log('load')
}



addEventListener('DOMContentLoaded', (e) => {
  console.log(e)
})

console.log(document.readyState);


// const a = requestIdleCallback(function () {
//   console.log('requestIdleCallback');
// }, {
//   timeout: 0,
// })

const a = requestIdleCallback(function () {
  console.log('requestIdleCallback');
})

switch (document.readyState) {
  case "loading":
    console.log(`document.readyState = ${document.readyState}`)
    // 表示文档还在加载中，即处于“正在加载”状态。
    break;
  case "interactive":
    // 文档已经结束了“正在加载”状态，DOM 元素可以被访问。
    // 但是像图像，样式表和框架等资源依然还在加载。
    console.log(`document.readyState = ${document.readyState}`)
    var span = document.createElement("span");
    span.textContent = "A <span> element.";
    document.body.appendChild(span);
    break;
  case "complete":
    // 页面所有内容都已被完全加载。
    let CSS_rule = document.styleSheets[0].cssRules[0].cssText;
    console.log(`document.readyState = ${document.readyState}`);
    console.log(`The first CSS rule is: ${CSS_rule}`);
    break;
}




// console.log(a)

// setTimeout(() => {
//   console.log('setTimeout3');
//   setTimeout(() => {
//     console.log('setTimeout2');
//     setTimeout(() => {
//       setTimeout(() => {
//         setTimeout(() => {
//           setTimeout(() => {
//             console.log('setTimeout');
//           }, 0)
//         }, 0)
//       },)
//     }, 0)
//   }, 0)
// }, 0)

// setTimeout(function () {
//   console.log('setTimeout1');
// }, 0);
Promise.resolve().then(() => console.log(1))

async1();

Promise.resolve().then(() => console.log(2))

// console.log(b)

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
