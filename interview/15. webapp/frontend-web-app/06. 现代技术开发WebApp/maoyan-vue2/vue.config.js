const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false,
  // 下面的配置演示了在 vue 中如何配置多页应用
  pages : {
    // 配置不同的页面对应的入口 JS 文件
    index : {
      entry : "src/views/IndexPage/main.js",
      template : "public/index.html",
    },
    video : {
      entry : "src/views/VideoPage/main.js",
      template : "public/video.html",
    },
    shortvideo : {
      entry : "src/views/ShortVideoPage/main.js",
      template : "public/shortvideo.html",
    },
    performance : {
      entry : "src/views/PerformancePage/main.js",
      template : "public/performance.html",
    },
    mine : {
      entry : "src/views/MinePage/main.js",
      template : "public/mine.html",
    }
  }
})
