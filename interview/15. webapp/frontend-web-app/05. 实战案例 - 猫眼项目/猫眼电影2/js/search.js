// 阻止默认事件
document.addEventListener("touchstart", e => {
    e.preventDefault();
}, {
    passive: false
})

var backBtn = document.querySelector(".backBtn");
backBtn.addEventListener("touchstart", e => {
    window.location = e.target.href;
})