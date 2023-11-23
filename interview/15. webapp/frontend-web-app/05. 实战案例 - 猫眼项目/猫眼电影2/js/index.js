// 导入单页模块
import { hotMovieContent } from './modules/hotMovie.js';
import { theaterContent } from './modules/theater.js';
import { willComingContent } from './modules/willComing.js';
import { classicMovieContent } from './modules/classicMovie.js';


// 阻止默认事件
document.addEventListener("touchstart", e => {
    e.preventDefault();
}, {
    passive: false
})

// 下方导航栏，因为阻止了默认事件，所以需要手动触发
var footer = document.querySelector('footer');
footer.addEventListener('touchstart', e => {
    if (e.target.href) {
        window.location = e.target.href;
    } else {
        window.location = e.target.parentNode.href;
    }
})

var topNav = document.querySelector('#topNav');
var topNavLink = document.querySelectorAll('#topNav>li>a');
var tabContainer = document.querySelector('#tabContainer');
// 一开始 tabContainer 里面就需要填充热映部分内容
tabContainer.innerHTML = hotMovieContent;

function changeNavStyle(id) {
    for (var i = 0; i < topNavLink.length; i++) {
        topNavLink[i].className = "";
        if (topNavLink[i].id == id) {
            topNavLink[i].className = "active";
        }
    }
}

var optionArea = document.querySelector('.optionArea');

topNav.addEventListener("touchstart", e => {
    var id = e.target.id;
    switch (id) {
        case "hotmovie": {
            tabContainer.innerHTML = hotMovieContent;
            changeNavStyle(id);
            initSlide();
            optionArea.className = "optionArea hidden";
            break;
        }
        case "theater": {
            tabContainer.innerHTML = theaterContent;
            changeNavStyle(id);
            initSlide();
            optionArea.className = "optionArea";
            break;
        }
        case "willComing": {
            tabContainer.innerHTML = willComingContent;
            changeNavStyle(id);
            initSlide();
            optionArea.className = "optionArea hidden";
            break;
        }
        case "classicMovie": {
            tabContainer.innerHTML = classicMovieContent;
            changeNavStyle(id);
            initSlide();
            optionArea.className = "optionArea hidden";
            break;
        }
    }
})

// 初始化滑动
function initSlide() {
    new Swiper('.mySwiper', {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        momentumRatio: 2,
        momentumVelocityRatio: 5
    })

    new Swiper('.mySwiper2', {
        slidesPerView: "auto",
        freeMode: true,
        momentumRatio: 2,
        momentumVelocityRatio: 5
    })
}
initSlide();

// 选项卡区域
var blacker = document.querySelector(".blacker"); // 遮罩层
var closeTab = document.querySelector(".closeTab"); // 选项卡下方的隐藏区域
var option = document.querySelector(".option"); // 选项卡上方容器部分
var optionTab = document.querySelectorAll(".optionTab"); // 选项卡上方项目部分
var optionTabContent = document.querySelectorAll(".optionTabContent"); // 选项卡下方内容部分

option.addEventListener("touchstart",e=>{
    for(var i=0;i<optionTab.length;i++){
        optionTab[i].classList.remove("chosenTitle");
    }
    e.target.classList.add("chosenTitle");
    for(var i=0;i<optionTabContent.length;i++){
        optionTabContent[i].classList.add("hidden");
    }
    var index = e.target.dataset.id;
    optionTabContent[index].classList.remove("hidden");

    // 打开下方隐藏面板的开关
    closeTab.classList.remove("hidden");

    // 打开遮罩层层
    blacker.classList.remove("hidden");
})


// 点击遮罩层，关闭选项卡
blacker.addEventListener("touchstart",e=>{
    closeTab.classList.add("hidden");
    blacker.classList.add("hidden");
    for(var i=0;i<optionTab.length;i++){
        optionTab[i].classList.remove("chosenTitle");
    }
})

// 搜索按钮
var search = document.querySelector(".search");
search.addEventListener("touchstart",e=>{
    window.location = e.target.href;
})