import React, { PropTypes, Component } from 'react';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import ButtonStyle from './styles/Button.css';

let name = 'Button';
let styles = {ButtonStyle};

@withStyles(name,styles)
class Button extends Component {

  handleMouseOver = (event) => {
    this.setState({uiStates:this.state.uiStates.set('think','wtf')});
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
      <div className={this.props.getUiClassName(this.props.uiType,this.state.uiStates)}  onMouseOver={this.handleMouseOver}>
        {this.props.children}
      </div>
    );
  }
}

export default Button;
