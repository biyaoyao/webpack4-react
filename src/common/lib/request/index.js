/**
 * Created by BIYY on 2017-11-17.
 */
import {Toast} from 'antd-mobile';
import reqwest from 'reqwest';

const requestType = {
  get: 'get',
  post: 'post',
  jsonp: 'jsonp'
};
let loading = null;
let request = {};
/**
 * 公共ajax请求service
 * @param opt{Object}
 * {
       *   api:'请求配置信息',
       *   data: 'post请求参数',
       *   headers: '请求头'
       *
       * }
 * @returns {Promise}
 */
request.request = (opt) => {
  let opts = Object.assign({}, opt);
  const api = Object.assign({}, opt.api); // 对象用作

  let setTime = {};
  let time = new Date() * 1;
  delete opts.api; // 去除请求中的api的内容
  // 合并配置的url  type
  opts.url = api.url;
  opts.type = opts.type ? opts.type : api.type;

  if (!opts.url) {
    request.ajaxError('请填写接口地址', setTime[time]);
    return false;
  }
  // 初始化请求类型
  if (requestType.jsonp === opts.type.toLowerCase()) {
    opts.jsonpCallback = opts.jsonpCallback || 'jsonpcallback';
  } else {
    opts.method = opts.type || requestType.get; // 请求类型
  }

  setTime[time] = setTimeout(() => { // 超过一秒后出现加载条
    if (!opts.noLoadingBar) {
      Toast.loading('loading...');
    }
  }, 500);

  return new Promise((resolve, reject) => {
    opts.complete = (XMLHttpRequest, status) => { // ajax结束处理
      if (status === 'timeout') { // 超时,status还有success,error等值的情况
        // console.log('timeout')
        request.ajaxError('请求超时', setTime[time]);
      }
    };

    opts.success = (res) => { // ajax成功处理
      if (typeof res === 'string') {
        res = JSON.parse(res);
      }
      let response;
      if (requestType.jsonp === opts.type.toLowerCase()) {
        response = res;
      } else {
        response = JSON.parse(res.response);
      }
      if (res.status === 200 && api.meta) { // 拦截错误信息
        if (response[api.meta.successKey] == api.meta.successValue) {
          clearTimeout(setTime[time]);
          resolve(response);
        } else {
          request.ajaxError(response[api.meta.errorKey], setTime[time]);
          reject(response);
        }
      } else { // 不拦截错误信息
        clearTimeout(setTime[time]);
        resolve(response);
      }
      Toast.hide();
    };
    opts.error = (res) => { // ajax错误处理
      let msg;
      Toast.hide();
      if (res.status === 404) {
        request.ajaxError('请求连接有误', setTime[time]);
      } else if (res.status === 500) {
        request.ajaxError('服务器出错', setTime[time]);
      } else {
        msg = '请求跨域';
        if (new Date() - time >= (opts.time || 5000)) {
          msg = '请求超时';
        }
        request.ajaxError(msg, setTime[time]);
      }
      resolve({
        code: res.status,
        msg: msg
      });
    };
    /**
     * reqwest({
          url: 'path/to/json'
        , type: 'json'      // type a string enum. html, xml, json, or jsonp. Default is inferred by resource
        , method: 'post'   // default  get
        , headers: {}     // default {}
        , contentType: 'application/json'
        , crossOrigin: true  // for cross-origin requests for browsers that support this feature
        , data: {}        //entity body for PATCH, POST and PUT requests. Must be a query String or JSON object
        , withCredentials: true
        , error: function (err) { }
        , success: function (resp) {
            qwery('#content').html(resp.content)
          }
      })
     */
    reqwest(opts);
  });
};
/**
 * ajax请求失败
 * @param msg
 */
request.ajaxError = (msg, timeOut) => {
  if (msg) {
    setTimeout(() => {
      Toast.offline(msg, 2);
    }, 20);
  }
  clearTimeout(timeOut);
};

export default request;
