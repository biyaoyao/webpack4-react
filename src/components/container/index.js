/**
 * Created by BIYY on 2018-6-22.
 */
/**
 * Created by BIYY on 2018-6-22.
 */
/**
 * Created by BIYY on 2018-6-22.
 */
import React, {Component} from 'react';
class Container extends Component {
  constructor (props) {
    super(props);
    this.children = this.props.children || '';
    this.state = {};
  }
  render () {
    return (
      <div className='container'>
        {this.props.children}
      </div>);
  }
}
export default Container;