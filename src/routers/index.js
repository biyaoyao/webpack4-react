const IndexView = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../views/index/App').default);
  }, 'indexApp');
}; // 首页

const RequestView = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../views/request/App').default);
  }, 'RequestView');
}; // ajax页面
const ReduxView = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../views/redux/App').default);
  }, 'ReduxView');
}; // redux

const ThemeView = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../views/theme/App').default);
  }, 'ThemeView');
}; // ThemeView

const NotFoundView = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../views/error/App').default);
  }, 'NotFoundView');
}; // NotFoundView

export default [
  {
    path: '/',
    exact: true,
    getComponent: IndexView,
    childRoutes: []
  },
  {
    path: 'request',
    exact: true,
    getComponent: RequestView,
    childRoutes: []
  },
  {
    path: '/redux',
    exact: true,
    getComponent: ReduxView,
    childRoutes: []
  },
  {
    path: '/theme',
    exact: true,
    getComponent: ThemeView,
    childRoutes: []
  },
  {
    path: '*',
    exact: true,
    getComponent: NotFoundView,
    childRoutes: []
  }
];
