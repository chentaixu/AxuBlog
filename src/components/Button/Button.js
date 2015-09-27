import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import ButtonStyle from './styles/Button.css';
import Loader from '../Loader';

let name = 'Button';
let styles = {ButtonStyle};

@withStyles(name,styles)
class Button extends Component {

  handleMouseOver = (event) => {
    this.setState({uiStates:this.state.uiStates.set('attention','focus')});
  };

  handleMouseOut = (event) => {
    this.setState();
  };

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
      <button className={this.props.getUiClassName(this.props.uiType,this.state.uiStates)}  onMouseOver={this.handleMouseOver}>
        <Loader uiType={'audio'} uiInitialStates={new Map([['container','button']])} />
      </button>
    );
  }
}

export default Button;
