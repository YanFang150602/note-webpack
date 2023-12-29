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
  },
  optimization: {
    // 要在一个 HTML 页面上使用多个入口时，还需设置 optimization.runtimeChunk: 'single'
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ]
};

/*
编译情况：
asset index.bundle.js 556 KiB [emitted] (name: index)
asset another.bundle.js 554 KiB [emitted] (name: another)
asset index.html 223 bytes [emitted]
runtime modules 2.5 KiB 12 modules
cacheable modules 532 KiB
  ./src/index.js 494 bytes [built] [code generated]
  ./src/another-module.js 157 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  ./src/module.js 54 bytes [built] [code generated]
webpack 5.78.0 compiled successfully in 599 ms

页面引入：
<script defer src="index.bundle.js"></script>
<script defer src="another.bundle.js"></script>

加了runtimeChunk: 'single'后：
编译情况：
asset index.bundle.js 552 KiB [emitted] (name: index)
asset another.bundle.js 551 KiB [emitted] (name: another)
asset runtime.bundle.js 7.6 KiB [emitted] (name: runtime)  【把index.bundle.js和another.bundle.js代码里webpack公共部分给提取出来了】
asset index.html 270 bytes [compared for emit]
Entrypoint index 560 KiB = runtime.bundle.js 7.6 KiB index.bundle.js 552 KiB
Entrypoint another 558 KiB = runtime.bundle.js 7.6 KiB another.bundle.js 551 KiB
runtime modules 3.64 KiB 8 modules
cacheable modules 532 KiB
  ./src/index.js 494 bytes [built] [code generated]
  ./src/another-module.js 157 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  ./src/module.js 54 bytes [built] [code generated]
webpack 5.78.0 compiled successfully in 592 ms

页面引入：
<script defer src="runtime.bundle.js"></script>
<script defer src="index.bundle.js"></script>
<script defer src="another.bundle.js"></script>
*/
