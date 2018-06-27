/**
 * Created by BIYY on 2017-10-12.
 */
import env from 'env';
import  api from './api/index';
let config = {};
config.env = env; // product,local,test
config.userTest = {
  // 模拟获取的用户uid
  uid: 'guanzq',
  // 模拟token，在这里写入
  ssoToken: 'T2429426253693952',
};
config.themeList = [
  {
    label: '主题a',
    value: 'theme-a',
  },
  {
    label: '主题b',
    value: 'theme-b',
  },
  {
    label: '主题c',
    value: 'theme-c',
  }
];
config.theme = 'theme-a';
config.statusBarColor = [0, 162, 223, 1]; // 状态栏颜色
config.language = 'CN'; // 状态栏颜色 'CN,EN'

config.api = api;

export default config;
