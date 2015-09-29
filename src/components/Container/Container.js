import React, { PropTypes, Component } from 'react';
import { Map, List } from 'immutable';
import ContainerStyle from './styles/Container.css';
import withStyles from '../../decorators/withStyles';

let name = 'Container';
let styles = {ContainerStyle};

@withStyles(name,styles)
class Container extends Component {

  static propTypes = {
    uiInitialStates: PropTypes.object.isRequired,
    getUiClassName: PropTypes.func.isRequired
  };

  state = {
    uiStates: Map(this.props.uiInitialStates)
  };


  render(){
    return (
      <div className={this.props.getUiClassName(this.state.uiStates)}>
        {this.props.children}
      </div>
    );
  }

}

export default Container;
