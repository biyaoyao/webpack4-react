/**
 * Created by BIYY on 2018-6-20.
 */
import React, {Component} from 'react';
import {Router, Route, browserHistory, hashHistory} from 'react-router';
import  env from 'env';
import routers from './routers';
import {$theme}  from './store/index';
import config  from './config/index';
import url  from './common/lib/url/index';
export default class App extends Component {
  theme = null;
  themeList = ['theme-a', 'theme-b'];

  onEnter (nextState, replace, next) {
    next();
  }

  componentDidMount () {
    document.querySelector('#indexLoading').style.display = 'none';
    let theme = localStorage.getItem('theme') || config.theme;
    this.themeList.forEach((item) => {
      if (url.getParam('theme') === item) {
        theme = item;
      }
    });


    $theme.subscribe(() => {
      theme = $theme.getState().theme;
      if (theme && (!this.theme || this.theme !== theme)) {
        this.theme = `${theme}`;
        this.initTheme(this.theme);
      }
    });
    $theme.dispatch({
      type: 'theme',
      payload: theme,
      callback: () => {

      }
    });
  }

  constructor (props) {
    super(props);

  }


  initTheme (theme) {
    document.querySelector('html').className = `${theme}`;
    localStorage.setItem('theme', theme);
    require(`./assets/css/theme/${theme}.less`);
  }

  render () {
    let routerList = () => {
      let list = [];
      routers.forEach((item, index) => {
        list.push(
          <Route
            onEnter={this.onEnter}
            exact={item.exact}
            key={index} path={item.path}
            getComponent={item.getComponent}
            children={item.children}/>);
      });
      return list;
    };

    return (
      <Router history={env === 'development' ? browserHistory : hashHistory}>
          {routerList()}
      </Router>
    );
  }
}
