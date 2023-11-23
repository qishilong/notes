const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const target = TARGET_NODE ? 'server' : 'client';

module.exports = {
  configureWebpack: () => ({
    entry: {
      app: `./src/entry/${target}.entry.js`
    },
    target: TARGET_NODE ? 'node' : 'web',
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin]
  }),
  chainWebpack: config => {
    config.optimization.splitChunks(undefined)
  }
}
