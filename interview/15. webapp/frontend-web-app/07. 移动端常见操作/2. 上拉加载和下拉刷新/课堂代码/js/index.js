// 这两个单纯就是上拉加载和下拉刷新的计数器
var oi = 0,
  oj = 0;

// 竖屏的滑屏
var mySwiper = new Swiper(".swiper-container", {
  direction: "vertical",
  scrollbar: ".swiper-scrollbar",
  slidesPerView: "auto",
  mousewheelControl: true,
  freeMode: true,
  // 滑屏的时候会触发此事件
  onTouchMove: function () {
    if (mySwiper.translate < 50 && mySwiper.translate > 0) {
      $(".init-loading").html("下拉刷新...").show();
    } else if (mySwiper.translate > 50) {
      $(".init-loading").html("释放刷新...").show();
    }
  },
  // 滑屏结束的时候会触发此事件
  onTouchEnd: function () {
    var _viewHeight =
      document.getElementsByClassName("swiper-wrapper")[0].offsetHeight;
    var _contentHeight =
      document.getElementsByClassName("swiper-slide")[0].offsetHeight;
    console.log(_viewHeight, _contentHeight);

    // 下拉刷新
    if (mySwiper.translate >= 50) {
      // 刷新新的数据
      $(".init-loading").html("正在刷新...").show();
      // 模拟异步加载数据
      setTimeout(function () {
        $(".init-loading").html("刷新成功！");
        // 加入新的数据
        if (oi <= 5) {
          for (var i = 0; i < 5; i++) {
            oi++;
            $(".list-group")
              .eq(mySwiper2.activeIndex)
              .prepend(
                '<li class="list-group-item">我是新增数据' + oi + "</li>"
              );
          }
        }
        setTimeout(function () {
          $(".init-loading").hide();
        }, 1000);
        mySwiper.update(); // 重新计算高度
      }, 1000);
    } else if (mySwiper.translate >= 0 && mySwiper.translate < 50) {
      // 说明用户往下拉了，但是没有拉多少，所以不刷新
      $(".init-loading").html("").hide();
    }

    // 上拉加载
    if (
      mySwiper.translate <= _viewHeight - _contentHeight - 100 &&
      mySwiper.translate < 0
    ) {
      if (oj <= 10) {
        // 加载新的数据
        $(".loadtip").html("正在加载...");
        setTimeout(function () {
          for (var i = 0; i < 5; i++) {
            oj++;
            $(".list-group")
              .eq(mySwiper2.activeIndex)
              .append(
                '<li class="list-group-item">我是加载数据' + oj + "</li>"
              );
          }
          $(".loadtip").html("上拉加载更多...");
          mySwiper.update(); // 重新计算高度
        }, 1000);
      } else {
        $(".loadtip").html("没有更多数据了！");
      }
    }
    return false;
  },
});



// 水平切换
function switchTab() {
    $(".w").css("transform", "translate3d(0px, 0px, 0px)");
    $(".swiper-container2 .swiper-slide-active")
      .css("height", "auto")
      .siblings(".swiper-slide")
      .css("height", "0px");
  
    $(".tab a")
      .eq(mySwiper2.activeIndex)
      .addClass("active")
      .siblings("a")
      .removeClass("active");
    mySwiper.update();
  }
  
  // 水平切换轮播图
  var mySwiper2 = new Swiper(".swiper-container2", {
    onTransitionEnd: switchTab,
  });
  
  // 点击上面的 tab 栏的时候
  $(".tab a").click(function () {
    $(this).addClass("active").siblings("a").removeClass("active");
    mySwiper2.slideTo($(this).index(), 500, false);
    switchTab();
  });