const path = require('path');

module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
};
