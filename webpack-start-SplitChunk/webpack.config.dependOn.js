const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // 防止重复
    // 入口依赖
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: ['lodash'],
  },
  optimization: {
    // 要在一个 HTML 页面上使用多个入口时，还需设置 optimization.runtimeChunk: 'single'
    runtimeChunk: 'single',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ]
};

/*
编译情况：
asset shared.bundle.js 550 KiB [emitted] (name: shared)
asset runtime.bundle.js 7.61 KiB [emitted] (name: runtime)
asset index.bundle.js 3.03 KiB [emitted] (name: index)
asset another.bundle.js 1.75 KiB [emitted] (name: another)
asset index.html 316 bytes [emitted]
Entrypoint index 3.03 KiB = index.bundle.js
Entrypoint another 1.75 KiB = another.bundle.js
Entrypoint shared 558 KiB = runtime.bundle.js 7.61 KiB shared.bundle.js 550 KiB
runtime modules 3.65 KiB 8 modules
cacheable modules 532 KiB
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  ./src/another-module.js 157 bytes [built] [code generated]
  ./src/index.js 494 bytes [built] [code generated]
  ./src/module.js 54 bytes [built] [code generated]
webpack 5.78.0 compiled successfully in 569 ms

结合html-webpack-plugin插件，页面引入：
<script defer src="index.bundle.js"></script>
<script defer src="another.bundle.js"></script>
<script defer src="runtime.bundle.js"></script>
<script defer src="shared.bundle.js"></script>
*/
