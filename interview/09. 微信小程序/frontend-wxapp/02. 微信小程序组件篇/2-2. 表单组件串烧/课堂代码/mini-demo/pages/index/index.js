// index.js
// 获取应用实例
const app = getApp()

const years = []; // 存储年份
const months = []; // 存储月份
const days = []; // 存储日期

const date = new Date();

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i);
}
for (let i = 1; i <= 12; i++) {
  months.push(i);
}
for (let i = 1; i <= 31; i++) {
  days.push(i);
}

Page({
  data: {
    years,
    months,
    days,
    value: [2023, 0, 15]
  },
  sliderchange(e) {
    console.log(e.detail.value)
  },
  switchchange(e) {
    console.log(e.detail.value)
  },
  pickerchange(e){
    console.log(e.detail.value)
  }
})