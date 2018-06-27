/**
 * Created by BIYY on 2018-6-20.
 */
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const loadersConfig = require('./loaders/index');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
function resolve (dir) {
  return path.join(__dirname, '..', dir);
}
let webpackConfig = {
  entry: {
    index: [
      //主入口
      './src/main.js'
    ]
  },
  output: {
    publicPath: '/',
    path: resolve('../dist'),
    filename: 'static/[name].js?ver=[hash]',
    chunkFilename : 'static/routes/[name].chunk.js?[chunkhash:10]', // 按需加载输出的文件名
  },
  resolve: {
    extensions: ['.web.js','.js', '.jsx', '.json', '.less', '.css'],
    alias: {
      '@': resolve('../src'),
      'src': resolve('../src'),
      'assets': resolve('../src/assets'),
      'components': resolve('../src/components')
    }
  },
  module: {
    rules: loadersConfig
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css?ver=[hash]",
      chunkFilename: "static/css/[id].css?ver=[hash]"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
};

module.exports = webpackConfig;