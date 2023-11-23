<template>
    <div class="logo between">
        <div class="logo_left"></div>
        <div class="logo_right between">
            <a href="#">发现最新最热电影</a>
            <span class="split"></span>
            <a href="#">
                打开App
                <img src="@/assets/img/rightarrow.png" alt="">
            </a>
        </div>
    </div>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<style scoped>
/* logo 部分 */
.logo {
    height: 1.6rem;
    border-bottom: .01rem solid #e5e5e5;
}

.logo_left {
    width: 2.5rem;
    height: 1.05rem;
    margin-left: .3rem;
    background: url('@/assets/img/logo.png') center/cover no-repeat;
}

.logo_right {
    width: 5.46rem;
    height: 0.5rem;
    margin-right: .35rem;
}

.logo_right a:nth-child(1) {
    font-size: .38rem;
    font-weight: 620;
    color: #666;
    font-family: PingFangSC-Regular, Arial, Helvetica, sans-seri;
}

.logo_right .split {
    width: .01rem;
    height: .34rem;
    background-color: #e6e6e6;
    transform: scale(1.2);
}

.logo_right a:nth-child(3) {
    display: block;
    width: 1.94rem;
    height: 100%;
    position: relative;
    text-align: left;
    font-size: .42rem;
    line-height: .5rem;
    color: #b37e7e;
    font-weight: 700;
}

.logo_right a:nth-child(3) img {
    width: 0.26rem;
    height: 0.26rem;
    position: absolute;
    right: 0;
    top: calc(50% - 0.13rem);
    transform: scale(1.2);
}
</style>
