<template>
  <div class="optionArea">
    <div class="optionContainer">
      <div class="option" @touchstart.stop="optionPanelOpen">
        <router-link class="optionTab" to="/theater/city">全城</router-link>
        <router-link class="optionTab" to="/theater/brand">品牌</router-link>
        <router-link class="optionTab" to="/theater/feature">特色</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <div class="closeTab">
      <router-view></router-view>
    </div>
  </div>
  <!-- 遮罩层 -->
  <div
    :class="[
      'blacker',
      {
        hidden: isHidden,
      },
    ]"
    @touchstart.stop="closeBlacker"
  ></div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let isHidden = ref(true);
    let router = useRouter();
    function optionPanelOpen() {
      isHidden.value = false;
    }
    function closeBlacker(){
        isHidden.value = true;
        router.push({
            path : '/theater'
        })
    }
    return {
      isHidden,
      optionPanelOpen,
      closeBlacker
    };
  },
};
</script>

<style scoped>
/* 上方选项区域样式 */
.optionArea {
  width: 100%;
  height: auto;
  background-color: #fff;
  position: fixed;
  top: 4.25rem;
  z-index: 120;
}

.optionContainer {
  width: 9.74rem;
  height: 1.08rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 0.02rem solid #eaeaea;
}

.option {
  width: 100%;
  height: 0.54rem;
  display: flex;
}

.option > a {
  width: 33.33%;
  font-size: 0.36rem;
  color: #b2b2b2;
  text-align: center;
  line-height: 0.54rem;
  border-right: 0.01rem solid #b0b0b0;
  position: relative;
}

.option > a:last-child {
  border: none;
}

.option > a::after {
  content: "";
  width: 0;
  height: 0;
  border: 0.1rem solid transparent;
  border-top-color: #b0b0b0;
  margin: 0.1rem 0.1rem 0 0.1rem;
  position: absolute;
  top: 25%;
}

.option > a.router-link-active {
  color: #e74438;
}

.option > a.router-link-active::after {
  transform: rotate(180deg);
  border-top-color: #e74438;
  top: 0;
}

/* 选项区域下方样式 */
.optionContainer .closeTab {
  width: 100%;
  height: auto;
  position: relative;
}

/* 遮罩层 */
.blacker {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 110;
}
</style>