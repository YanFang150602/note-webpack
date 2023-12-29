sideEffects 副作用

webpack4新增的功能。

允许通过配置的方式去标识代码是否有副作用，从而为 Tree Shaking 提供更多的压缩空间。

sideEffects 一般用于开发npm模块时，标记是否有副作用。

官方文档中将它和 Tree Shaking 放在一起讲，所以容易误解为它们是因果关系，实际上二者没什么关系。

副作用：模块执行时除了导出成员之外所作的事情。

例如一个模块中定义了其他内容：

export default () => {
  console.log('本模块不只导出一个默认成员，还做了一些其他事情')
}
// 以下是副作用代码
console.log('模块被使用')
window.foo = '往全局添加一个变量'

==================================================================================================================================================================

Tree Shaking

Tree Shaking 通过 usedExports 摇掉的是模块自己的代码中不被需要的部分！

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
    usedExports: true
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

开发模式下，编译后最小

==================================================================================================================================================================

package.json和webpack配置文件中的sideEffects虽然同名，但表示的意义不同。

package.json的sideEffects：标识当前package.json所影响的项目，当中所有的代码是否有副作用
  默认true，表示当前项目中的代码有副作用
webpack配置文件中的 sideEffects ：开启功能，是否移除无副作用的代码
  默认false，表示不移除无副作用的模块
在production模式下自动开启。

webpack不会识别代码是否有副作用，只会读取package.json的sideEffects字段。

==================================================================================================================================================================



==================================================================================================================================================================

