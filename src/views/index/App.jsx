import React, {Component} from 'react';
import {List, Icon} from 'antd-mobile';
import {Header, Footer, Container} from '../../components/index';
const Item = List.Item;
class IndexApp extends Component {

  constructor (props) {
    super(props);
    console.log(this.props);
    this.state = {};
  }

  render () {
    return (
      <div className='App'>
        <Header
          router={this.props.router}
          hideLeft={true}
          title="首页">
          <div slot="right">
            <Icon key="1" type="ellipsis"/>
          </div>
        </Header>
        <Container children={
          <List renderHeader={() => '常见demo'}>
            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              arrow="horizontal"
              onClick={this.goTo.bind(this, 'request')}
            >ajax请求</Item>

            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              arrow="horizontal"
              onClick={this.goTo.bind(this, 'redux')}
            >redux</Item>
            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              arrow="horizontal"
              onClick={this.goTo.bind(this, 'theme')}
            >主题切换</Item>
          </List>
        }/>
        <Footer>
          qwq
        </Footer>
      </div>);
  }

  goTo (path) {
    console.log('goTo', path);
    this.props.router.push(`/${path}`);
    //alert('外部slotLeftClick');
  }
}
export  default  IndexApp;