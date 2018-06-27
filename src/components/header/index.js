/**
 * Created by BIYY on 2018-6-22.
 */
import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import {Slot} from 'react-slot';
class Header extends Component {
  constructor (props) {
    super(props);
    this.children = this.props.children || '';
    this.state = {};
  }

  render () {
    return (
      <div className='header flex flex-row'>
        <div className="left flex flex-center" onClick={this.slotLeftClick.bind(this)}>
          <Slot className="flex flex-center" name='left' as='div' content={this.children}>
            <Icon type="left" size="md"/>
          </Slot>
        </div>
        <div className="title flex-1 flex flex-center">
          <Slot className="flex flex-center" name='title' as='div' content={this.children}>
            {this.props.title}
          </Slot>
        </div>

        <div className="right flex flex-center" onClick={this.slotRightClick.bind(this)}>
          <Slot className="flex flex-center" name='right' as='div' content={this.children}>
          </Slot>
        </div>
      </div>
  );
  }
  slotLeftClick(){
    if(this.props.slotLeftClick){
      this.props.slotLeftClick();
    }else {
      this.props.router.goBack();
      console.log('slotLeftClick',this.props);
    }
  }
  slotRightClick(){
    console.log('slotRightClick');
  }
}
export default Header;