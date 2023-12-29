const path = require('path');

module.exports = env => {
  console.log('Goal: ', env.goal);
  console.log('Production: ', env.production);

  return {
    mode: env.production ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
