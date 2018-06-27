import React, {Component} from 'react';
import {List, Icon, Button, Picker} from 'antd-mobile';
import {Header, Footer, Container} from '../../components/index';
import {$theme}  from '../../store/index';
import config  from '../../config/index';
export default class Theme extends Component {
  constructor (propd) {
    super(propd);
    this.state = {
      theme: {
        label: '',
        value: '',
      }
    };
  }

  componentDidMount () {
    console.log('componentDidMount', $theme.getState());
    let theme = null;
    config.themeList.forEach((item) => {
      let $theme = $theme.getState().theme;
      if ($theme === item.value) {
        theme = item;
      }
    });
    this.setState({
      theme: theme
    }, () => {

    });
  }


  render () {
    return (
      <div className='App'>
        <Header
          router={this.props.router}
          title="切换主题">
          <div slot="right">
            <Icon key="1" type="search"/>
          </div>
        </Header>
        <Container children={
          <div>
            <Picker value={[this.state.theme.value]} data={config.themeList} onChange={this.onChange.bind(this)}
                    cols={1}
                    className="forss">
              <List.Item arrow="horizontal">主题切换</List.Item>
            </Picker>
          </div>}
        />

        <Footer>
          qwq
        </Footer>
      </div>
    );
  }

  onChange (val) {

    let theme = null;
    config.themeList.forEach((item) => {
      if (val[0] === item.value) {
        theme = item;
      }
    });
    $theme.dispatch({
      type: 'theme',
      payload: theme.value
    });
  }
}

