const { resolve } = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: resolve('./dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        use: 'vue-loader',
      },
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}