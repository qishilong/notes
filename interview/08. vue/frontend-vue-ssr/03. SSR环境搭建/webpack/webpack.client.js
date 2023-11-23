const HtmlWebpackPlugin = require("html-webpack-plugin");
const { default: merge } = require("webpack-merge");
const base = require('./webpack.base.js');
const { resolve } = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(base, {
  entry: {
    'client': './src/entry/client.entry.js'
  },
  plugins: [
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('./public/index.html')
    })
  ]
});