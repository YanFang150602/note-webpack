const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    // Tree Shaking 通过 usedExports 摇掉的是模块自己的代码中不被需要的部分
    usedExports: true,
    // 打包时不生成导出它们的代码，从而通过 minimize 移除它们，压缩
    // minimize: true,
    // 开启功能，移除无副作用的代码
    // sideEffects: true
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    // 在使用 Tree Shaking 时必须有 ModuleConcatenationPlugin 的支持，您可以通过设置配置项 mode: "production" 以启用它。
    // 如果您没有如此做，请记得手动引入 ModuleConcatenationPlugin。
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
