const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // 使用 entry 配置手动地分离代码
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].chunk.js',
    clean: true
  },
  optimization: {
    splitChunks: {
      /*
        all: 多个入口引用 或 一个入口里多次引用 同一个模块，都会合并生成一个js文件出来
        async: 同步import进来的文件，每个入口都包含，每个文件都大
      */
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ]
};

/*
编译情况：
asset vendors-node_modules_lodash_lodash_js.bundle.js 550 KiB [emitted] (id hint: vendors)
asset index.bundle.js 10 KiB [emitted] (name: index)
asset another.bundle.js 8.77 KiB [emitted] (name: another)
asset index.html 300 bytes [emitted]
Entrypoint index 560 KiB = vendors-node_modules_lodash_lodash_js.bundle.js 550 KiB index.bundle.js 10 KiB
Entrypoint another 559 KiB = vendors-node_modules_lodash_lodash_js.bundle.js 550 KiB another.bundle.js 8.77 KiB
runtime modules 7.28 KiB 16 modules
cacheable modules 532 KiB
  ./src/index.js 494 bytes [built] [code generated]
  ./src/another-module.js 157 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  ./src/module.js 54 bytes [built] [code generated]
webpack 5.78.0 compiled successfully in 930 ms

页面引入：
<script defer src="vendors-node_modules_lodash_lodash_js.bundle.js"></script> 【同步导入，提取出来，页面引入】
<script defer src="index.bundle.js"></script>
<script defer src="another.bundle.js"></script>
*/
