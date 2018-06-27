const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
let webpackConfig = require('../config/webpack.config.production');
const spinner = ora('building for production...');
spinner.start();

rm(path.join(path.resolve(__dirname, '../../dist'), '/'), err => {
  if (err) throw err;
  const start = new Date() * 1;
  webpackConfig.resolve.alias.env = path.resolve(__dirname, '../../src/config/env/' + webpackConfig.mode + '.js');
  console.log(webpackConfig.resolve.alias.env);
  webpackConfig.output.publicPath = './';
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');
    const end = new Date() * 1;
    console.log(chalk.cyan(`打包结束,用时:${end - start}ms`));
  });
});
