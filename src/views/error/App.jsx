import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import store from '../../store/index';
class Error extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps (props) {
    this.props = props;
    console.log('componentWillReceiveProps', this.props, props);
  }


  render () {
    return (<div className='App' style={{background: '#edf6fa'}}>
      <div className='error'>
        <h2>{this.props.msg ? this.props.msg : '非常遗憾，您访问的页面有误！'}</h2>
        <p>看到这个提示，请联系管理员：14789945242!</p>
        <div className='reindex'>
          {JSON.stringify(this.state)}
        </div>
        <Button>Button</Button>
        <button onClick={this.click.bind(this)}>click</button>
      </div>
    </div>);
  }

  click () {
    this.props.click(1231);
  }
}
export default Error;
