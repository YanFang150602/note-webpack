const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'webpack-numbers.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'webpackNumbers',
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    }
  }
};

/**
无externals：
PS F:\workspace\demo\Webpack\webpack-start-Library> npm run build

> webpack-demo@1.0.0 build
> webpack --config webpack.config.js

asset webpack-numbers.js 555 KiB [emitted] (name: main)
asset index.html 182 bytes [emitted]
runtime modules 1.25 KiB 6 modules
cacheable modules 532 KiB
  ./src/index.js 415 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  ./src/ref.json 154 bytes [built] [code generated]
webpack 5.78.0 compiled successfully in 423 ms
PS F:\workspace\demo\Webpack\webpack-start-Library>

有externals：
PS F:\workspace\demo\Webpack\webpack-start-Library> npm run build

> webpack-demo@1.0.0 build
> webpack --config webpack.config.js

asset webpack-numbers.js 5.82 KiB [emitted] (name: main)
asset index.html 182 bytes [compared for emit]
runtime modules 937 bytes 4 modules
built modules 611 bytes [built]
  ./src/index.js 415 bytes [built] [code generated]
  external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} 42 bytes [built] [code generated]
  ./src/ref.json 154 bytes [built] [code generated]
webpack 5.78.0 compiled successfully in 213 ms
PS F:\workspace\demo\Webpack\webpack-start-Library>
 */
