const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    // 合并css
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 拷贝 static 文件夹资源文件
    new CopyWebpackPlugin([
      {
        from: resolve('../static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    // 拷贝 CubeModule.json
    new CopyWebpackPlugin([
      {
        from: resolve('../CubeModule.json'),
        to: resolve('../dist')
      }
    ]),
    // 压缩打包文件
    new WebpackZipPlugin({
      path: path.join(__dirname, '../../dist'),
      filename: (new Date() * 1 + '.zip')
    })//,
  ]
});
