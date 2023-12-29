const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
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

/**
PS F:\workspace\demo\Webpack\webpack-start-Lazy> npm run build

> CodeSplit@1.0.0 build
> webpack --config webpack.config.js

asset index.bundle.js 71.7 KiB [emitted] [minimized] (name: index) 1 related asset
asset print.bundle.js 283 bytes [emitted] [minimized] (name: print)
asset index.html 157 bytes [emitted]
runtime modules 7.07 KiB 11 modules
cacheable modules 532 KiB
  ./src/index.js 531 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  ./src/print.js 168 bytes [built] [code generated]
webpack 5.78.0 compiled successfully in 3472 ms
PS F:\workspace\demo\Webpack\webpack-start-Lazy>
 */
