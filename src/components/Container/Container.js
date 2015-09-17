import React, { PropTypes, Component } from 'react';
import ContainerStyle from './styles/Container.css';
import withStyles from '../../decorators/withStyles';

let name = 'Container';
let styles = {ContainerStyle};

@withStyles(name,styles)
class Container extends Component {

  static propTypes = {
    uiType: PropTypes.string,
    uiInitialStates: PropTypes.instanceOf(Map),
    getUiClassName: PropTypes.func.isRequired
  };

  state = {
    uiStates: this.props.uiInitialStates?this.props.uiInitialStates:new Map()
  };


  render(){
    return (
      <div className={this.props.getUiClassName(this.props.uiType,this.state.uiStates)}>
        {this.props.children}
      </div>
    );
  }

}

export default Container;
