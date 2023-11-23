<template>
  <div class="theaterContainer">
    <h3>
      {{ info.theaterName }}<span>{{ info.startPrice }}</span
      ><span>元起</span>
    </h3>
    <p>{{ info.theaterAddr }}</p>
    <div class="label-block">
      <div v-if="info.allowRefund" class="allowRefund">退</div>
      <div v-if="info.endorse" class="endorse">改签</div>
      <div v-if="info.snack" class="snack">小吃</div>
      <div v-if="info.vipTag" class="vipTag">折扣卡</div>
    </div>
    <p class="discount">开卡特惠，17.9元起开卡</p>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {},
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.theaterContainer {
  width: 9.74rem;
  margin: 0 auto;
  border-bottom: 0.02rem solid #eaeaea;
  padding: 0.55rem 0 0.5rem 0;
}

.theaterContainer > h3 {
  font-size: 0.45rem;
  color: #000;
  font-weight: 400;
}

.theaterContainer > h3 > span {
  color: #f23e3c;
}

.theaterContainer > h3 > span:nth-child(2) {
  font-size: 0.3rem;
  margin-left: 0.1rem;
}

.theaterContainer > p:nth-child(2) {
  font-size: 0.36rem;
  margin-top: 0.3rem;
}

.theaterContainer > .label-block {
  display: flex;
  font-size: 0.24rem;
  margin-top: 0.2rem;
}

.theaterContainer > .label-block > div {
  padding: 0 0.06rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 0.04rem;
  font-size: 0.24rem;
  margin-right: 0.13rem;
}

.theaterContainer > .label-block > div.allowRefund,
.theaterContainer > .label-block > div.endorse {
  color: #589daf;
  border: 0.02rem solid #589daf;
}

.theaterContainer > .label-block > div.snack,
.theaterContainer > .label-block > div.vipTag {
  color: #f90;
  border: 0.02rem solid #f90;
}

.theaterContainer .discount {
  font-size: 0.3rem;
  margin-top: 0.3rem;
  height: 0.4rem;
  line-height: 0.4rem;
  display: flex;
  align-items: center;
}

.theaterContainer .discount::before {
  content: "";
  display: inline-block;
  width: 0.42rem;
  height: 0.4rem;
  background: url("@/assets/img/card.png") center/cover no-repeat;
  margin-right: 0.05rem;
}
</style>