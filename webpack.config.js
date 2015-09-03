var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'app.js');

console.log('Building...');
if (process.env.NODE_ENV === 'production'){
    console.log('Production build');
}

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [nodeModulesPath]
    },{
      test: /\.css$/,
      loader: 'style!css'
  },
  {
    test: /\.less$/,
    loader: 'style!css!less'
  },{test:/\.json$/,loader:'raw'}]

  }
};

module.exports = config;