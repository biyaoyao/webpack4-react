import React, {Component} from 'react';
import {Icon, Button} from 'antd-mobile';
import {Header, Footer, Container} from '../../components/index';
import {$user, $login}  from '../../store/index';
class Redux extends Component {

  constructor (propd) {
    super(propd);
  }

  componentDidMount () {
    console.log('componentDidMount', $user.getState());
    $user.subscribe(() => {
      console.error('监听---user', $user.getState());
    });

    $login.subscribe(() => {
      console.log('监听---login', $login.getState());
    });

  }

  componentWillUnmount () {
    $user.subscribe = ()=>{};
    $login.subscribe = ()=>{};
    console.log("call componentWillUnmount");
  }

  dispatchUser () {
    $login.dispatch({
      type: 'user',
      payload: {
        name: '闭耀尧'
      }
    });
  }

  dispatchLogin () {
    $login.dispatch({
      type: 'login',
      payload: {
        username: 'byy',
        password: '21212'
      }
    });
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
            <Button onClick={this.dispatchUser.bind(this)}>dispatchUser</Button>
            <Button onClick={this.dispatchLogin.bind(this)}>dispatchLogin</Button>
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
export default Redux;
