// 获取一下 DOM 元素
var btn = document.querySelector("#header button"); // 汉堡按钮
var ul = document.querySelector("#header ul");

var display = true;

// 点击汉堡按钮的时候，出现菜单
btn.onclick = function() {
    ul.style.overflow = display ? "visible" : "hidden";
    display = !display;
}

// 轮播图
var swiper = document.querySelector("#pic ul");
var i = 0;
setInterval(function() {
    var length = i * -100;
    swiper.style.transform = `translateX(${length}vw)`;
    i++;
    if(i > 2){
        i = 0;
    }
}, 2000)