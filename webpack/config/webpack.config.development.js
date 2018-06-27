const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
module.exports = merge(baseWebpackConfig, {
  entry: {
    index: [
      //热加载
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true',
      'react-hot-loader/patch', //设置这里
    ]
  },
  mode: 'development',
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
