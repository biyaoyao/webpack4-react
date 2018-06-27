/**
 * Created by BIYY on 2018-6-25.
 */
import env from 'env';
let api = {};

let baseUrl = {
  // 开发环境
  development: 'https://nx1.newpearl.com/mas-api/restful/hrUrl',
  // 生产环境
  production: 'https://m.infore.com/mas-api/proxy?alias='
};
let masUrl = {
  // 开发环境
  development: 'https://dctest.mideadc.com/mas-api/restful/',
  // 生产环境
  production: 'https://dctest.mideadc.com/mas-api/restful/'
};
let requestType = {
  get: 'get',
  post: 'post',
  jsonp: 'jsonp'
};
let apiMeta = { // 接口api配置
  base: {   // 基础配置一般是针对mas接口进行的配置
    successKey: 'code', // 成功标识字段
    successValue: 200,  // 成功标识值
    errorKey: 'msg', // 错误提示信息字段
  },
  custom: { // 自定义配置----其他特殊处理的可以类似新增
    successKey: 'flag', // 成功标识字段
    successValue: 1,  // 成功标识值
    errorKey: 'errMsg',  // 错误提示信息字段
  }
};
// 接口配置范例
api.getTest = {  // 接口名称
  url: `${baseUrl[env]}/getRewardInfo/002SCB/2018`, // 接口地址（必填）
  type: 'get', // 接口请求类型默认未get
  meta: apiMeta.custom // 接口配置项（可选）
};
api.postTest = {  // 接口名称
  url: `${masUrl[env]}/muc/api/segiuser/registerUser`, // 接口地址（必填）
  type: 'post', // 接口请求类型默认未get
  meta: apiMeta.base // 接口配置项（可选）
};
api.jsonpTest = {
  url: `${masUrl[env]}talkbar/talkbar/talkingSupport/countMineBase`,
  type: 'jsonp',
  meta: apiMeta.custom
};


export  default api;