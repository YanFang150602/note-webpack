const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // 使用 entry 配置手动地分离代码
  entry: {
    indexAsync: './src/index-async.js',
    anotherAsync: './src/another-async.js',
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
        async: 针对动态导入

        -- 此处没有同步导入
        -- all、async 编译效果一样
      */
      chunks: 'async',
    },
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties'
          ]
        }
      }
    ]
  }
};

/*
针对动态导入代码分割
编译情况：
asset vendors-node_modules_lodash_lodash_js.chunk.js 550 KiB [compared for emit] (id hint: vendors)
asset indexAsync.bundle.js 14.1 KiB [compared for emit] (name: indexAsync)
asset anotherAsync.bundle.js 14.1 KiB [compared for emit] (name: anotherAsync)
asset index.html 233 bytes [compared for emit]
runtime modules 15.9 KiB 22 modules
cacheable modules 532 KiB
  ./src/index-async.js 211 bytes [built] [code generated]
  ./src/another-async.js 132 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
webpack 5.78.0 compiled successfully in 1279 ms

动态导入的，页面不会引入：
<script defer src="indexAsync.bundle.js"></script>
<script defer src="anotherAsync.bundle.js"></script>
*/
