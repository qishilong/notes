// app.js
App({
  onLaunch() {
  },
  // 全局的数据，所有页面都可以使用这个数据
  globalData: {
    // 所有语言的语言列表
    lanList : [
      {'chs': '英文','lang': 'en',"index": 0},
      {'chs': '中文','lang': 'zh',"index": 1},
      {'chs': '日语','lang': 'jp',"index": 2},
      {'chs': '韩语','lang': 'kor',"index": 3},
      {'chs': '法语','lang': 'fra',"index": 4},
      {'chs': '德语','lang': 'de',"index": 5},
      {'chs': '俄语','lang': 'ru',"index": 6},
      {'chs': '泰语','lang': 'th',"index": 7},
      {'chs': '西班牙语','lang': 'spa',"index": 8},
      {'chs': '阿拉伯语','lang': 'ara',"index": 9},
      {'chs': '意大利语','lang': 'it',"index": 10},
      {'chs': '葡萄牙语','lang': 'pt',"index": 11},
      {'chs': '荷兰语','lang': 'nl', 'index':12}
    ],
    // 当前默认是什么语言，默认设置为英语
    curLan : {'chs': '英文','lang': 'en',"index": 0}
  }
})
