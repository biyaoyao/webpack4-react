const http = require('http');
const path = require('path');
const ora = require('ora');
let ejs = require('ejs');
const chalk = require('chalk');
const opn = require('opn');
const express = require('express');
require('console-stamp')(console, "HH:MM:ss.l");
const app = express();
app.set('views', path.join(__dirname, '../../'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); //替换文件扩展名ejs为html
const spinner = ora('本地服务器即将开启....');
const staticPath = path.posix.join('/', 'static');
/**/
app.use(staticPath, express.static('./static'));
spinner.start();
app.use(require('morgan')('short'));
let devMiddleware = null;
/*
 热部署
 * */
(function () {
  // 步骤1: 引入webpack配置及编译运行
  const webpack = require('webpack');
  let webpackConfig = require('../config/webpack.config.development');
  webpackConfig.resolve.alias.env = path.resolve(__dirname, '../../src/config/env/' + webpackConfig.mode + '.js');
  console.log(webpackConfig.resolve.alias.env);
  const compiler = webpack(webpackConfig);
  devMiddleware = require('webpack-dev-middleware')(compiler, {
    mode: 'development',
    logLevel: 'warn',
    publicPath: webpackConfig.output.publicPath
  });
  // 步骤 3: 将热部署中间件添加到中间件
  const hotMiddleware = require("webpack-hot-middleware")(compiler, {
    log: console.error,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  });
  app.use(hotMiddleware);
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({action: 'reload'});
    });
  });
  // 解决浏览器刷新404问题
  app.use(require('connect-history-api-fallback')());
  // 步骤 2: 将中间件添加到webpack服务器
  app.use(devMiddleware);


})();

/*
 * 用express处理你想处理的事
 *
 * */

app.get('/', function (req, response, next) {//通用控制器
  response.render('index');
});

/*
 * 开启静态服务器
 * */
if (require.main === module) {
  spinner.stop();
  const server = http.createServer(app);
  const port = 1616;
  const uri = 'http://localhost:' + port;
  server.listen(port, () => {
    devMiddleware.waitUntilValid(() => {
      console.log(chalk.cyan(uri));
      opn(uri);
    });
  });
}

