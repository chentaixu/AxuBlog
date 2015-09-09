import React, { PropTypes } from 'react';
import ContainerStyle from './styles/Container.css';
import withStyles from '../../decorators/withStyles';

let name = 'Container';
let styles = {ContainerStyle};

@withStyles(name,styles)
class Container {

  static propTypes = {
      uiString: PropTypes.string.isRequired
  };


  render(){
    return (
      <div className={this.props.uiString}>
        {this.props.children}
      </div>
    );
  }

}

export default Container;
