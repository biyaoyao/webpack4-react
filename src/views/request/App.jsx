import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import {Icon, Button} from 'antd-mobile';
import {Header, Footer, Container} from '../../components/index';
import request from '../../common/lib/request/index';
import config from '../../config/index';
import less from './index.less';
class Test extends Component {
  theme = 'a';

  constructor (propd) {
    super(propd);
  }

  async get () {
    const res = await request.request({
      api: config.api.getTest
    });
    console.log(res);
  }

  async post () {
    const result = await request.request({
      api: config.api.postTest
    });
    console.log(result);
  }

  async jsonp () {
    const result = await request.request({
      api: config.api.jsonpTest
    });
    console.log(result);
  }

  render () {
    return (
      <div className='App'>
        <Header
          router={this.props.router}
          title="测试">
          <div slot="right">
            <Icon key="1" type="search"/>
          </div>
        </Header>
        <Container children={
          <div>
            <Button styleName="test" onClick={this.get.bind(this)}>get</Button>
            <Button styleName="test" onClick={this.post.bind(this)}>post</Button>
            <Button styleName="test" onClick={this.jsonp.bind(this)}>jsonp</Button>
          </div>
        }/>
        <Footer>

          qwq
        </Footer>
      </div>
    )
      ;
  }
}
export default CSSModules(Test, less);
